<?php
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: /admin/login.php");
    exit();
}

// =========================
// DB CONFIG
// =========================
$dbHost = "localhost";
$dbName = "u603114659_patelfound";
$dbUser = "u603114659_pateldbuser";
$dbPass = "H8&vc*pl";

// =========================
// VALIDATE DONATION ID
// =========================
$id = intval($_GET['id'] ?? 0);

if ($id <= 0) {
    header("Location: /admin/dashboard.php?msg=email_invalid");
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
    header("Location: /admin/dashboard.php?msg=mail_lib_missing");
    exit();
}

require $phpMailerBase . 'Exception.php';
require $phpMailerBase . 'PHPMailer.php';
require $phpMailerBase . 'SMTP.php';
require_once __DIR__ . '/generate-receipt-pdf.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    // =========================
    // DB CONNECT
    // =========================
    $pdo = new PDO(
        "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4",
        $dbUser,
        $dbPass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // =========================
    // FETCH DONATION
    // =========================
    $stmt = $pdo->prepare("SELECT * FROM donations WHERE id = :id LIMIT 1");
    $stmt->execute([':id' => $id]);
    $donation = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$donation) {
        header("Location: /admin/dashboard.php?msg=email_invalid");
        exit();
    }

    // =========================
    // DONATION DATA
    // =========================
    $fullName = trim($donation['full_name'] ?? 'Donor');
    $email = trim($donation['email'] ?? '');
    $amount = trim($donation['amount'] ?? '0');
    $currency = trim($donation['currency'] ?? 'USD');
    $purpose = trim($donation['support_area'] ?? 'General Support');
    $status = strtolower(trim($donation['payment_status'] ?? 'pending'));
    $donationRef = trim($donation['donation_ref'] ?? 'N/A');
    $createdAt = trim($donation['created_at'] ?? date('Y-m-d H:i:s'));

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: /admin/dashboard.php?msg=email_invalid");
        exit();
    }

    // Safe formatted values
    $safeFullName = htmlspecialchars($fullName);
    $safeAmount = htmlspecialchars($amount);
    $safeCurrency = htmlspecialchars($currency);
    $safePurpose = htmlspecialchars($purpose);
    $safeDonationRef = htmlspecialchars($donationRef);
    $safeCreatedAt = htmlspecialchars($createdAt);

    // =========================
    // SMTP CONFIG
    // IMPORTANT: Replace with your current working Gmail App Password
    // =========================
    $smtpHost = 'smtp.gmail.com';
    $smtpUsername = 'gatistwamgroup@gmail.com';
    $smtpPassword = 'dstyxgwdprjdhuie';
    $smtpPort = 587;

    $fromEmail = 'gatistwamgroup@gmail.com';
    $fromName = 'Patel Foundation India';

    // =========================
    // INIT MAILER
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
    $mail->addAddress($email, $fullName);
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';

    // Optional plain text fallback
    $mail->AltBody = "Thank you for supporting Patel Foundation India. Donation Reference: {$donationRef}. Status: " . strtoupper($status);

    // =========================
    // COMMON EMAIL WRAPPER STYLES
    // =========================
    $brandBlue = '#1D4ED8';
    $brandDark = '#0F172A';
    $brandMuted = '#64748B';
    $brandBg = '#F8FAFC';
    $successGreen = '#059669';
    $pendingOrange = '#D97706';

    // =========================
    // PAID EMAIL TEMPLATE
    // =========================
    if ($status === 'paid') {

        $filePath = generateDonationReceiptPDF($donation);

        if (!file_exists($filePath)) {
            header("Location: /admin/dashboard.php?msg=pdf_error");
            exit();
        }

        $mail->Subject = "Donation Confirmed • Thank You for Supporting Patel Foundation India";

        $mail->Body = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Donation Confirmation</title>
        </head>
        <body style="margin:0;padding:0;background-color:#EEF4FF;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#EEF4FF;margin:0;padding:30px 0;">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.08);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1D4ED8 0%,#2563EB 55%,#3B82F6 100%);padding:34px 34px 28px 34px;text-align:left;">
                      <div style="display:inline-block;background:rgba(255,255,255,0.16);color:#ffffff;font-size:12px;font-weight:700;letter-spacing:0.4px;padding:8px 14px;border-radius:999px;margin-bottom:18px;">
                        DONATION CONFIRMED
                      </div>
                      <h1 style="margin:0;font-size:30px;line-height:1.2;color:#ffffff;font-weight:800;">
                        Thank You for Your Generous Support
                      </h1>
                      <p style="margin:14px 0 0 0;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.92);">
                        Your donation has been successfully marked as paid. Your support helps us continue creating meaningful impact for children and communities.
                      </p>
                    </td>
                  </tr>

                  <!-- Greeting -->
                  <tr>
                    <td style="padding:32px 34px 10px 34px;">
                      <p style="margin:0;font-size:16px;line-height:1.8;color:#0F172A;">
                        Dear <strong>' . $safeFullName . '</strong>,
                      </p>
                      <p style="margin:14px 0 0 0;font-size:15px;line-height:1.8;color:#334155;">
                        We sincerely appreciate your contribution to <strong>Patel Foundation India</strong>. 
                        We are pleased to confirm that your donation has been received and recorded successfully.
                      </p>
                    </td>
                  </tr>

                  <!-- Status Card -->
                  <tr>
                    <td style="padding:18px 34px 0 34px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:20px;">
                        <tr>
                          <td style="padding:22px 22px;">
                            <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;color:#047857;letter-spacing:0.3px;">
                              PAYMENT STATUS
                            </p>
                            <p style="margin:0;font-size:24px;font-weight:800;color:#065F46;">
                              Paid Successfully
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Donation Summary -->
                  <tr>
                    <td style="padding:22px 34px 0 34px;">
                      <h2 style="margin:0 0 14px 0;font-size:20px;color:#0F172A;font-weight:800;">
                        Donation Summary
                      </h2>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #E2E8F0;border-radius:20px;overflow:hidden;background:#F8FAFC;">
                        <tr>
                          <td style="padding:0;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#64748B;font-weight:700;">Donation Reference</td>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#1D4ED8;font-weight:800;text-align:right;">' . $safeDonationRef . '</td>
                              </tr>
                              <tr>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#64748B;font-weight:700;">Donation Amount</td>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#0F172A;font-weight:800;text-align:right;">$' . $safeAmount . ' ' . $safeCurrency . '</td>
                              </tr>
                              <tr>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#64748B;font-weight:700;">Support Area</td>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#0F172A;font-weight:700;text-align:right;">' . $safePurpose . '</td>
                              </tr>
                              <tr>
                                <td style="padding:16px 18px;font-size:14px;color:#64748B;font-weight:700;">Donation Date</td>
                                <td style="padding:16px 18px;font-size:14px;color:#0F172A;font-weight:700;text-align:right;">' . $safeCreatedAt . '</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Receipt Note -->
                  <tr>
                    <td style="padding:24px 34px 0 34px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:18px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <p style="margin:0;font-size:14px;line-height:1.8;color:#1E3A8A;">
                              Your <strong>PDF donation receipt</strong> is attached to this email for your records.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Appreciation -->
                  <tr>
                    <td style="padding:24px 34px 10px 34px;">
                      <p style="margin:0;font-size:15px;line-height:1.8;color:#334155;">
                        Every contribution strengthens our ability to support education, nutrition, outreach, and care-driven initiatives for those who need it most.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:24px 34px 34px 34px;">
                      <div style="border-top:1px solid #E2E8F0;padding-top:22px;">
                        <p style="margin:0;font-size:15px;line-height:1.8;color:#0F172A;">
                          Warm regards,<br>
                          <strong>Patel Foundation India</strong>
                        </p>
                        <p style="margin:14px 0 0 0;font-size:12px;line-height:1.7;color:#64748B;">
                          This is an automated confirmation email from the Patel Foundation India donation system.
                        </p>
                      </div>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        ';

        $mail->addAttachment($filePath);

    } else {
        // =========================
        // PENDING EMAIL TEMPLATE
        // =========================
        $mail->Subject = "Donation Request Received • Payment Pending";

        $mail->Body = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Donation Pending</title>
        </head>
        <body style="margin:0;padding:0;background-color:#FFF7ED;font-family:Arial,Helvetica,sans-serif;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FFF7ED;margin:0;padding:30px 0;">
            <tr>
              <td align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.08);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#EA580C 0%,#F97316 55%,#FB923C 100%);padding:34px 34px 28px 34px;text-align:left;">
                      <div style="display:inline-block;background:rgba(255,255,255,0.16);color:#ffffff;font-size:12px;font-weight:700;letter-spacing:0.4px;padding:8px 14px;border-radius:999px;margin-bottom:18px;">
                        DONATION RECEIVED
                      </div>
                      <h1 style="margin:0;font-size:30px;line-height:1.2;color:#ffffff;font-weight:800;">
                        Your Donation Request Is Pending
                      </h1>
                      <p style="margin:14px 0 0 0;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.92);">
                        Thank you for starting your donation process. We have received your request and it is currently awaiting payment confirmation.
                      </p>
                    </td>
                  </tr>

                  <!-- Greeting -->
                  <tr>
                    <td style="padding:32px 34px 10px 34px;">
                      <p style="margin:0;font-size:16px;line-height:1.8;color:#0F172A;">
                        Dear <strong>' . $safeFullName . '</strong>,
                      </p>
                      <p style="margin:14px 0 0 0;font-size:15px;line-height:1.8;color:#334155;">
                        Thank you for your willingness to support <strong>Patel Foundation India</strong>. 
                        We have successfully recorded your donation request, and your payment is currently marked as pending.
                      </p>
                    </td>
                  </tr>

                  <!-- Status Card -->
                  <tr>
                    <td style="padding:18px 34px 0 34px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FFF7ED;border:1px solid #FDBA74;border-radius:20px;">
                        <tr>
                          <td style="padding:22px 22px;">
                            <p style="margin:0 0 8px 0;font-size:13px;font-weight:700;color:#C2410C;letter-spacing:0.3px;">
                              PAYMENT STATUS
                            </p>
                            <p style="margin:0;font-size:24px;font-weight:800;color:#9A3412;">
                              Pending Confirmation
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Donation Summary -->
                  <tr>
                    <td style="padding:22px 34px 0 34px;">
                      <h2 style="margin:0 0 14px 0;font-size:20px;color:#0F172A;font-weight:800;">
                        Donation Summary
                      </h2>

                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #E2E8F0;border-radius:20px;overflow:hidden;background:#F8FAFC;">
                        <tr>
                          <td style="padding:0;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#64748B;font-weight:700;">Donation Reference</td>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#EA580C;font-weight:800;text-align:right;">' . $safeDonationRef . '</td>
                              </tr>
                              <tr>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E0;font-size:14px;color:#64748B;font-weight:700;">Requested Amount</td>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#0F172A;font-weight:800;text-align:right;">$' . $safeAmount . ' ' . $safeCurrency . '</td>
                              </tr>
                              <tr>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#64748B;font-weight:700;">Support Area</td>
                                <td style="padding:16px 18px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#0F172A;font-weight:700;text-align:right;">' . $safePurpose . '</td>
                              </tr>
                              <tr>
                                <td style="padding:16px 18px;font-size:14px;color:#64748B;font-weight:700;">Request Date</td>
                                <td style="padding:16px 18px;font-size:14px;color:#0F172A;font-weight:700;text-align:right;">' . $safeCreatedAt . '</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Info Note -->
                  <tr>
                    <td style="padding:24px 34px 0 34px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:18px;">
                        <tr>
                          <td style="padding:18px 20px;">
                            <p style="margin:0;font-size:14px;line-height:1.8;color:#9A3412;">
                              If you have already completed your PayPal payment, our team will update your status shortly after verification. 
                              Once confirmed, you will receive a separate email with your donation receipt.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:28px 34px 34px 34px;">
                      <div style="border-top:1px solid #E2E8F0;padding-top:22px;">
                        <p style="margin:0;font-size:15px;line-height:1.8;color:#0F172A;">
                          Warm regards,<br>
                          <strong>Patel Foundation India</strong>
                        </p>
                        <p style="margin:14px 0 0 0;font-size:12px;line-height:1.7;color:#64748B;">
                          This is an automated update from the Patel Foundation India donation system.
                        </p>
                      </div>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        ';
    }

    // =========================
    // SEND EMAIL
    // =========================
    $mail->send();

    header("Location: /admin/dashboard.php?msg=email_sent");
    exit();

} catch (Exception $e) {
    // If you want to debug later, temporarily use:
    // die("Mailer Error: " . $e->getMessage());

    header("Location: /admin/dashboard.php?msg=email_error");
    exit();
}
?>