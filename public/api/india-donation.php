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
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method"
    ]);
    exit();
}

require_once "db.php";

try {
    $fullName = trim($_POST['fullName'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $amount = trim($_POST['amount'] ?? '');
    $purpose = trim($_POST['purpose'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $donationType = trim($_POST['donationType'] ?? 'one-time');
    $transactionId = trim($_POST['transactionId'] ?? '');

    if (!$fullName || !$email || !$phone || !$amount || !$purpose || !$transactionId) {
        echo json_encode([
            "success" => false,
            "message" => "Please fill all required fields."
        ]);
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid email address."
        ]);
        exit();
    }

    if (!is_numeric($amount) || floatval($amount) <= 0) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid donation amount."
        ]);
        exit();
    }

    $donationRef = 'IND-' . time() . '-' . rand(100, 999);

    $stmt = $pdo->prepare("
        INSERT INTO donations 
        (
            donation_ref,
            full_name,
            email,
            phone,
            amount,
            currency,
            support_area,
            message,
            payment_method,
            payment_status,
            manual_transaction_id
        )
        VALUES
        (
            :donation_ref,
            :full_name,
            :email,
            :phone,
            :amount,
            'INR',
            :support_area,
            :message,
            'Bank Transfer / QR',
            'Pending Verification',
            :manual_transaction_id
        )
    ");

    $stmt->execute([
        ':donation_ref' => $donationRef,
        ':full_name' => $fullName,
        ':email' => $email,
        ':phone' => $phone,
        ':amount' => $amount,
        ':support_area' => $purpose,
        ':message' => $message,
        ':manual_transaction_id' => $transactionId
    ]);

    echo json_encode([
        "success" => true,
        "message" => "India donation submitted successfully.",
        "donation_ref" => $donationRef
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database Error: " . $e->getMessage()
    ]);
}