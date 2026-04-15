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

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$subject = trim($data['subject'] ?? '');
$interest = trim($data['interest'] ?? '');
$message = trim($data['message'] ?? '');

// =========================
// VALIDATION
// =========================
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

    // Where you want to receive contact inquiries
    $adminEmail = 'gatistwamgroup@gmail.com';
    $adminName = 'Patel Foundation India';

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
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Inquiry</title>
    </head>
    <body style="margin:0;padding:0;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F8FAFC;padding:30px 0;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:700px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #E2E8F0;">
              
              <tr>
                <td style="background:linear-gradient(135deg,#1D4ED8 0%,#2563EB 100%);padding:28px 32px;">
                  <h1 style="margin:0;font-size:28px;color:#ffffff;font-weight:800;">New Contact Inquiry</h1>
                  <p style="margin:10px 0 0 0;font-size:14px;color:rgba(255,255,255,0.92);">
                    A new inquiry has been submitted through the website contact form.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:28px 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;background:#F8FAFC;">
                    <tr>
                      <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#64748B;">Full Name</td>
                      <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;color:#0F172A;font-weight:600;text-align:right;">' . $safeName . '</td>
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
                      <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;font-weight:700;color:#64748B;">Subject</td>
                      <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;color:#0F172A;font-weight:600;text-align:right;">' . $safeSubject . '</td>
                    </tr>
                    <tr>
                      <td style="padding:14px 16px;font-weight:700;color:#64748B;">Inquiry Type</td>
                      <td style="padding:14px 16px;color:#0F172A;font-weight:600;text-align:right;">' . $safeInterest . '</td>
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

    $mail->AltBody = "New Contact Inquiry\n\nName: {$name}\nEmail: {$email}\nPhone: {$phone}\nSubject: {$subject}\nInquiry Type: {$interest}\n\nMessage:\n{$message}";

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
        $userMail->addAddress($email, $name);

        $userMail->isHTML(true);
        $userMail->CharSet = 'UTF-8';
        $userMail->Subject = 'We Received Your Inquiry • Patel Foundation India';

        $userMail->Body = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Inquiry Received</title>
        </head>
        <body style="margin:0;padding:0;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F8FAFC;padding:30px 0;">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #E2E8F0;">
                  
                  <tr>
                    <td style="background:linear-gradient(135deg,#1D4ED8 0%,#2563EB 100%);padding:28px 32px;">
                      <h1 style="margin:0;font-size:28px;color:#ffffff;font-weight:800;">Thank You for Reaching Out</h1>
                      <p style="margin:10px 0 0 0;font-size:14px;color:rgba(255,255,255,0.92);">
                        We’ve received your message and our team will get back to you shortly.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:28px 32px;">
                      <p style="margin:0;font-size:15px;line-height:1.8;color:#334155;">
                        Dear <strong>' . $safeName . '</strong>,
                      </p>
                      <p style="margin:14px 0 0 0;font-size:15px;line-height:1.8;color:#334155;">
                        Thank you for contacting <strong>Patel Foundation India</strong>. Your inquiry has been received successfully.
                      </p>
                      <p style="margin:14px 0 0 0;font-size:15px;line-height:1.8;color:#334155;">
                        Our team will review your message and respond as soon as possible.
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

        $userMail->AltBody = "Thank you for contacting Patel Foundation India. We have received your inquiry and will get back to you soon.";
        $userMail->send();
    } catch (Exception $e) {
        // Ignore auto-reply failure; main admin email already sent
    }

    echo json_encode([
        "success" => true,
        "message" => "Your message has been sent successfully. We'll get back to you soon."
    ]);
    exit();

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Mailer Error: " . $e->getMessage()
    ]);
    exit();
}