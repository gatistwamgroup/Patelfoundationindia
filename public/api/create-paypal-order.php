<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit();
}

require_once "db.php";
require_once "paypal-config.php";

$data = json_decode(file_get_contents("php://input"), true);

$fullName = trim($data['fullName'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$amount = trim($data['amount'] ?? '');
$purpose = trim($data['purpose'] ?? '');
$message = trim($data['message'] ?? '');

if (!$fullName || !$email || !$phone || !$amount || !$purpose) {
    echo json_encode(["success" => false, "message" => "Please fill all required fields."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email address."]);
    exit();
}

if (!is_numeric($amount) || floatval($amount) <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid donation amount."]);
    exit();
}

$amount = number_format((float)$amount, 2, '.', '');
$donationRef = 'DON-' . time() . '-' . rand(100, 999);

function getPayPalAccessToken() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, PAYPAL_BASE_URL . "/v1/oauth2/token");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, PAYPAL_CLIENT_ID . ":" . PAYPAL_SECRET);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Accept: application/json",
        "Accept-Language: en_US"
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        return false;
    }

    curl_close($ch);

    $result = json_decode($response, true);
    return $result['access_token'] ?? false;
}

try {
    // 1. Save donation as Pending
    $stmt = $pdo->prepare("
        INSERT INTO donations 
        (donation_ref, full_name, email, phone, amount, currency, support_area, message, payment_method, payment_status)
        VALUES 
        (:donation_ref, :full_name, :email, :phone, :amount, 'USD', :support_area, :message, 'PayPal', 'Pending')
    ");

    $stmt->execute([
        ':donation_ref' => $donationRef,
        ':full_name' => $fullName,
        ':email' => $email,
        ':phone' => $phone,
        ':amount' => $amount,
        ':support_area' => $purpose,
        ':message' => $message
    ]);

    // 2. Get PayPal access token
    $accessToken = getPayPalAccessToken();
    if (!$accessToken) {
        echo json_encode(["success" => false, "message" => "Unable to get PayPal access token."]);
        exit();
    }

    // 3. Create PayPal order
    $orderData = [
        "intent" => "CAPTURE",
        "purchase_units" => [[
            "reference_id" => $donationRef,
            "description" => "Donation to Patel Foundation India",
            "amount" => [
                "currency_code" => "USD",
                "value" => $amount
            ]
        ]],
        "application_context" => [
            "brand_name" => "Patel Foundation India",
            "landing_page" => "LOGIN",
            "user_action" => "PAY_NOW",
            "return_url" => SUCCESS_URL . "?donation_ref=" . urlencode($donationRef),
            "cancel_url" => CANCEL_URL . "?donation_ref=" . urlencode($donationRef)
        ]
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, PAYPAL_BASE_URL . "/v2/checkout/orders");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($orderData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Authorization: Bearer " . $accessToken
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode(["success" => false, "message" => "PayPal order create failed."]);
        exit();
    }

    curl_close($ch);

    $result = json_decode($response, true);

    if (!isset($result['id'])) {
        echo json_encode([
            "success" => false,
            "message" => "PayPal order creation failed.",
            "paypal_response" => $result
        ]);
        exit();
    }

    $paypalOrderId = $result['id'];
    $approveLink = '';

    foreach ($result['links'] as $link) {
        if ($link['rel'] === 'approve') {
            $approveLink = $link['href'];
            break;
        }
    }

    // 4. Update DB with PayPal order ID
    $updateStmt = $pdo->prepare("
        UPDATE donations 
        SET paypal_order_id = :paypal_order_id
        WHERE donation_ref = :donation_ref
    ");
    $updateStmt->execute([
        ':paypal_order_id' => $paypalOrderId,
        ':donation_ref' => $donationRef
    ]);

    echo json_encode([
        "success" => true,
        "donation_ref" => $donationRef,
        "paypal_order_id" => $paypalOrderId,
        "approve_url" => $approveLink
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database Error: " . $e->getMessage()
    ]);
}