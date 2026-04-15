<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

ini_set('display_errors', 0);
error_reporting(E_ALL);
ob_start();

register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== NULL) {
        ob_clean();
        echo json_encode([
            "success" => false,
            "message" => "Fatal PHP Error: " . $error['message']
        ]);
    }
});

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_clean();
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    ob_end_flush();
    exit();
}

// =========================
// READ JSON INPUT
// =========================
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON payload received."
    ]);
    ob_end_flush();
    exit();
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$subject = trim($data['subject'] ?? '');
$interest = trim($data['interest'] ?? '');
$message = trim($data['message'] ?? '');

if (
    empty($name) ||
    empty($email) ||
    empty($phone) ||
    empty($subject) ||
    empty($interest) ||
    empty($message)
) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    ob_end_flush();
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);
    ob_end_flush();
    exit();
}

// =========================
// PHPMailer PATH CHECK
// =========================
$phpMailerBase = __DIR__ . '/../PHPMailer/src/';

if (
    !file_exists($phpMailerBase . 'Exception.php') ||
    !file_exists($phpMailerBase . 'PHPMailer.php') ||
    !file_exists($phpMailerBase . 'SMTP.php')
) {
    echo json_encode([
        "success" => false,
        "message" => "PHPMailer library not found. Please check PHPMailer folder path."
    ]);
    ob_end_flush();
    exit();
}

require_once $phpMailerBase . 'Exception.php';
require_once $phpMailerBase . 'PHPMailer.php';
require_once $phpMailerBase . 'SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    // =========================
    // SMTP CONFIG
    // =========================
    $smtpHost = 'smtp.gmail.com';
    $smtpUsername = 'gatistwamgroup@gmail.com';
    $smtpPassword = 'dstyxgwdprjdhuie'; // CHANGE THIS
    $smtpPort = 587;

    $fromEmail = 'gatistwamgroup@gmail.com';
    $fromName = 'Patel Foundation India';

    // =========================
    // ADMIN INQUIRY EMAIL
    // =========================
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername;
    $mail->Password = $smtpPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $smtpPort;

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($fromEmail, $fromName); // direct inquiry mail
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'New Contact Inquiry • ' . $subject;

    $safeName = htmlspecialchars($name);
    $safeEmail = htmlspecialchars($email);
    $safePhone = htmlspecialchars($phone);
    $safeSubject = htmlspecialchars($subject);
    $safeInterest = htmlspecialchars($interest);
    $safeMessage = nl2br(htmlspecialchars($message));

    $mail->Body = '
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>New Contact Inquiry</title>
    </head>
    <body style="margin:0;padding:20px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:700px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#DC2626,#EF4444);padding:28px 30px;">
          <h1 style="margin:0;font-size:26px;color:#ffffff;">New Contact Inquiry</h1>
          <p style="margin:10px 0 0 0;font-size:14px;color:rgba(255,255,255,0.9);">
            A new message has been submitted from the Patel Foundation website contact form.
          </p>
        </div>

        <div style="padding:28px 30px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;width:180px;">Full Name</td>
              <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;">' . $safeName . '</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;">' . $safeEmail . '</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">Phone</td>
              <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;">' . $safePhone . '</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">Subject</td>
              <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;">' . $safeSubject . '</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">Inquiry Type</td>
              <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;">' . $safeInterest . '</td>
            </tr>
          </table>

          <div style="margin-top:24px;">
            <h3 style="margin:0 0 12px 0;font-size:18px;color:#0f172a;">Message</h3>
            <div style="padding:18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;color:#334155;line-height:1.8;">
              ' . $safeMessage . '
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
    ';

    $mail->AltBody = "New Contact Inquiry\n\nName: {$name}\nEmail: {$email}\nPhone: {$phone}\nSubject: {$subject}\nInquiry Type: {$interest}\nMessage: {$message}";

    $mail->send();

    echo json_encode([
        "success" => true,
        "message" => "Your message has been sent successfully."
    ]);
    ob_end_flush();
    exit();

} catch (Exception $e) {
    ob_clean();
    echo json_encode([
        "success" => false,
        "message" => "Mailer Error: " . $e->getMessage()
    ]);
    exit();
}