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

$data = json_decode(file_get_contents("php://input"), true);

$full_name = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$amount = trim($data['amount'] ?? '');
$support_area = trim($data['support_area'] ?? '');
$message = trim($data['message'] ?? '');

if (!$full_name || !$email || !$amount) {
    echo json_encode([
        "success" => false,
        "message" => "Full name, email and amount are required."
    ]);
    exit();
}

$donation_ref = 'DON-' . time() . '-' . rand(100, 999);

try {
    $stmt = $pdo->prepare("
        INSERT INTO donations 
        (donation_ref, full_name, email, phone, amount, support_area, message, payment_method, payment_status)
        VALUES 
        (:donation_ref, :full_name, :email, :phone, :amount, :support_area, :message, 'PayPal', 'Pending')
    ");

    $stmt->execute([
        ':donation_ref' => $donation_ref,
        ':full_name' => $full_name,
        ':email' => $email,
        ':phone' => $phone,
        ':amount' => $amount,
        ':support_area' => $support_area,
        ':message' => $message
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Donation saved successfully",
        "donation_ref" => $donation_ref
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database insert failed: " . $e->getMessage()
    ]);
}
?>