<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
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
        "message" => "Invalid request method."
    ]);
    exit();
}

// =========================
// DB CONFIG (Hostinger MySQL details)
// =========================
$dbHost = "localhost";
$dbName = "u603114659_patelfound";
$dbUser = "u603114659_pateldbuser";
$dbPass = "H8&vc*pl";

// =========================
// LOAD JSON DATA
// =========================
$data = json_decode(file_get_contents("php://input"), true);

$fullName = trim($data['fullName'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$amount = trim($data['amount'] ?? '');
$purpose = trim($data['purpose'] ?? '');
$message = trim($data['message'] ?? '');
$donationType = trim($data['donationType'] ?? 'one-time');

// =========================
// VALIDATION
// =========================
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

// =========================
// GENERATE DONATION REF
// =========================
$donationRef = 'DON-' . time() . '-' . rand(100, 999);

// =========================
// DATABASE CONNECTION
// =========================
try {
    $pdo = new PDO(
        "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4",
        $dbUser,
        $dbPass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $e->getMessage()
    ]);
    exit();
}

// =========================
// SAVE TO DATABASE (PENDING FOR NOW)
// =========================
try {
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

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database insert failed: " . $e->getMessage()
    ]);
    exit();
}

// =========================
// PHPMailer include
// =========================
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// =========================
// SMTP CONFIG (TEMP GMAIL)
// IMPORTANT: Change App Password later
// =========================
$smtpHost = 'smtp.gmail.com';
$smtpUsername = 'gatistwamgroup@gmail.com';
$smtpPassword = 'YOUR_NEW_APP_PASSWORD'; // <-- NEW app password use karna
$smtpPort = 587;

$fromEmail = 'gatistwamgroup@gmail.com';
$fromName = 'Patel Foundation India';
$adminEmail = 'gatistwamgroup@gmail.com'; // <-- replace with real admin email if needed

try {
    // =========================
    // 1. ADMIN EMAIL
    // =========================
    $adminMail = new PHPMailer(true);
    $adminMail->isSMTP();
    $adminMail->Host = $smtpHost;
    $adminMail->SMTPAuth = true;
    $adminMail->Username = $smtpUsername;
    $adminMail->Password = $smtpPassword;
    $adminMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $adminMail->Port = $smtpPort;

    $adminMail->setFrom($fromEmail, $fromName);
    $adminMail->addAddress($adminEmail);
    $adminMail->addReplyTo($email, $fullName);

    $adminMail->isHTML(true);
    $adminMail->Subject = "New Donation Submission - {$fullName} ({$donationRef})";

    $adminMailBody = "
        <h2>New Donation Form Submission</h2>
        <p><strong>Donation Ref:</strong> {$donationRef}</p>
        <p><strong>Full Name:</strong> " . htmlspecialchars($fullName) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>
        <p><strong>Donation Type:</strong> " . htmlspecialchars($donationType) . "</p>
        <p><strong>Donation Amount:</strong> $" . htmlspecialchars($amount) . " USD</p>
        <p><strong>Support Area:</strong> " . htmlspecialchars($purpose) . "</p>
        <p><strong>Payment Status:</strong> Pending (Awaiting PayPal Completion)</p>
        <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
    ";

    $adminMail->Body = $adminMailBody;
    $adminMail->send();

    // =========================
    // 2. DONOR EMAIL
    // =========================
    $donorMail = new PHPMailer(true);
    $donorMail->isSMTP();
    $donorMail->Host = $smtpHost;
    $donorMail->SMTPAuth = true;
    $donorMail->Username = $smtpUsername;
    $donorMail->Password = $smtpPassword;
    $donorMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $donorMail->Port = $smtpPort;

    $donorMail->setFrom($fromEmail, $fromName);
    $donorMail->addAddress($email, $fullName);

    $donorMail->isHTML(true);
    $donorMail->Subject = "Thank You for Your Support - {$donationRef}";

    $donorMailBody = "
        <h2>Thank You, " . htmlspecialchars($fullName) . "!</h2>
        <p>We sincerely appreciate your willingness to support our mission.</p>
        <p>Your donation request details:</p>
        <ul>
            <li><strong>Donation Ref:</strong> {$donationRef}</li>
            <li><strong>Donation Type:</strong> " . htmlspecialchars($donationType) . "</li>
            <li><strong>Amount:</strong> $" . htmlspecialchars($amount) . " USD</li>
            <li><strong>Support Area:</strong> " . htmlspecialchars($purpose) . "</li>
        </ul>
        <p>You will now be redirected to PayPal to complete your donation securely.</p>
        <p>Thank you for helping us create a stronger tomorrow.</p>
        <br>
        <p>Warm regards,<br>{$fromName}</p>
    ";

    $donorMail->Body = $donorMailBody;
    $donorMail->send();

    echo json_encode([
        "success" => true,
        "message" => "Donation saved and emails sent successfully.",
        "donation_ref" => $donationRef
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Mailer Error: " . $e->getMessage()
    ]);
}
?>