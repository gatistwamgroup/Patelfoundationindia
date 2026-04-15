<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

ini_set('display_errors', 0);
error_reporting(E_ALL);

register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== NULL) {
        echo json_encode([
            "success" => false,
            "message" => "Fatal PHP Error: " . $error['message']
        ]);
    }
});

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit();
}

$dbHost = "localhost";
$dbName = "u603114659_patelfound";
$dbUser = "u603114659_pateldbuser";
$dbPass = "H8&vc*pl";

$data = json_decode(file_get_contents("php://input"), true);

$fullName = trim($data['fullName'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$amount = trim($data['amount'] ?? '');
$purpose = trim($data['purpose'] ?? '');
$message = trim($data['message'] ?? '');
$donationType = trim($data['donationType'] ?? 'one-time');

if (empty($fullName) || empty($email) || empty($phone) || empty($amount) || empty($purpose)) {
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

$donationRef = 'DON-' . time() . '-' . rand(100, 999);

try {
    $pdo = new PDO(
        "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4",
        $dbUser,
        $dbPass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

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
            payment_status
        )
        VALUES
        (
            :donation_ref,
            :full_name,
            :email,
            :phone,
            :amount,
            'USD',
            :support_area,
            :message,
            'PayPal',
            'Pending'
        )
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

    echo json_encode([
        "success" => true,
        "message" => "Donation saved successfully.",
        "donation_ref" => $donationRef
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database Error: " . $e->getMessage()
    ]);
}
?>