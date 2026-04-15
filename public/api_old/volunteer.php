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

// =========================
// READ JSON INPUT
// =========================
$data = json_decode(file_get_contents("php://input"), true);

$fullName = trim($data['fullName'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$interestType = trim($data['interestType'] ?? '');
$message = trim($data['message'] ?? '');

// =========================
// VALIDATION
// =========================
if (empty($fullName) || empty($email) || empty($interestType)) {
    echo json_encode([
        "success" => false,
        "message" => "Please fill all required fields."
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email address."
    ]);
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
    $smtpPassword = 'dstyxgwdprjdhuie'; // IMPORTANT: replace this
    $smtpPort = 587;

    $fromEmail = 'gatistwamgroup@gmail.com';
    $fromName = 'Patel Foundation India';

    // Admin email where volunteer inquiries should arrive
    $adminEmail = 'gatistwamgroup@gmail.com';
    $adminName = 'Patel Foundation India';

    $safeFullName = htmlspecialchars($fullName);
    $safeEmail = htmlspecialchars($email);
    $safePhone = htmlspecialchars($phone ?: 'Not Provided');
    $safeInterestType = htmlspecialchars($interestType);
    $safeMessage = nl2br(htmlspecialchars($message ?: 'No additional message provided.'));

    // =========================
    // SEND ADMIN EMAIL
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
    $mail->addAddress($adminEmail, $adminName);
    $mail->addReplyTo($email, $fullName);

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'New Volunteer / Support Interest • ' . $interestType;

    $mail->Body = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Volunteer Interest</title>
    </head>
    <body style="margin:0;padding:0;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F8FAFC;padding:30px 0;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:700px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #E2E8F0;">
              
              <tr>
                <td style="background:linear-gradient(135deg,#059669 0%,#10B981 100%);padding:28px 32px;">
                  <h1 style="margin:0;font-size:28px;color:#ffffff;font-weight:800;">New Volunteer / Support Interest</h1>
                  <p style="margin:10px 0 0 0;font-size:14px;color:rgba(255,255,255,0.92);">
                    A new interest form has been submitted through the website.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:28px 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;background:#F8FAFC;">
                    <tr>
                      <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#64748B;">Full Name</td>
                      <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;color:#0F172A;font-weight:600;text-align:right;">' . $safeFullName . '</td>
                    </tr>
                    <tr>
                      <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#64748B;">Email</td>
                      <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;color:#0F172A;font-weight:600;text-align:right;">' . $safeEmail . '</td>
                    </tr>
                    <tr>
                      <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#64748B;">Phone</td>
                      <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;color:#0F172A;font-weight:600;text-align:right;">' . $safePhone . '</td>
                    </tr>
                    <tr>
                      <td style="padding:14px 16px;font-weight:700;color:#64748B;">Interest Type</td>
                      <td style="padding:14px 16px;color:#0F172A;font-weight:600;text-align:right;">' . $safeInterestType . '</td>
                    </tr>
                  </table>

                  <div style="margin-top:22px;padding:18px;border:1px solid #E2E8F0;border-radius:16px;background:#ffffff;">
                    <p style="margin:0 0 10px 0;font-size:14px;font-weight:700;color:#64748B;">Message</p>
                    <div style="font-size:15px;line-height:1.8;color:#334155;">' . $safeMessage . '</div>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding:0 32px 28px 32px;">
                  <p style="margin:0;font-size:12px;color:#64748B;">
                    Reply directly to this email to respond to the sender.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    ';

    $mail->AltBody = "New Volunteer / Support Interest\n\nFull Name: {$fullName}\nEmail: {$email}\nPhone: " . ($phone ?: 'Not Provided') . "\nInterest Type: {$interestType}\n\nMessage:\n" . ($message ?: 'No additional message provided.');

    $mail->send();

    // =========================
    // OPTIONAL AUTO-REPLY TO USER
    // =========================
    try {
        $userMail = new PHPMailer(true);
        $userMail->isSMTP();
        $userMail->Host = $smtpHost;
        $userMail->SMTPAuth = true;
        $userMail->Username = $smtpUsername;
        $userMail->Password = $smtpPassword;
        $userMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $userMail->Port = $smtpPort;

        $userMail->setFrom($fromEmail, $fromName);
        $userMail->addAddress($email, $fullName);

        $userMail->isHTML(true);
        $userMail->CharSet = 'UTF-8';
        $userMail->Subject = 'Thank You for Your Interest • Patel Foundation India';

        $userMail->Body = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You</title>
        </head>
        <body style="margin:0;padding:0;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F8FAFC;padding:30px 0;">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #E2E8F0;">
                  
                  <tr>
                    <td style="background:linear-gradient(135deg,#059669 0%,#10B981 100%);padding:28px 32px;">
                      <h1 style="margin:0;font-size:28px;color:#ffffff;font-weight:800;">Thank You for Connecting</h1>
                      <p style="margin:10px 0 0 0;font-size:14px;color:rgba(255,255,255,0.92);">
                        We’ve received your interest form and appreciate your willingness to support our mission.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:28px 32px;">
                      <p style="margin:0;font-size:15px;line-height:1.8;color:#334155;">
                        Dear <strong>' . $safeFullName . '</strong>,
                      </p>
                      <p style="margin:14px 0 0 0;font-size:15px;line-height:1.8;color:#334155;">
                        Thank you for showing interest in <strong>Patel Foundation India</strong>.
                      </p>
                      <p style="margin:14px 0 0 0;font-size:15px;line-height:1.8;color:#334155;">
                        Our team will review your submission and connect with you soon regarding your selected interest: <strong>' . $safeInterestType . '</strong>.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 32px 28px 32px;">
                      <p style="margin:0;font-size:15px;line-height:1.8;color:#0F172A;">
                        Warm regards,<br>
                        <strong>Patel Foundation India</strong>
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        ';

        $userMail->AltBody = "Thank you for your interest in Patel Foundation India. Our team will get back to you soon.";
        $userMail->send();
    } catch (Exception $e) {
        // Ignore auto-reply failure; admin email already sent
    }

    echo json_encode([
        "success" => true,
        "message" => "Thank you for your interest. Our team will connect with you soon."
    ]);
    exit();

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Mailer Error: " . $e->getMessage()
    ]);
    exit();
}