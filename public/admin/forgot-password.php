<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// =========================
// DB CONFIG
// =========================
$dbHost = "localhost";
$dbName = "u603114659_patelfound";
$dbUser = "u603114659_pateldbuser";
$dbPass = "H8&vc*pl";

// =========================
// PHPMailer LOAD
// =========================
$phpMailerBase = __DIR__ . '/../PHPMailer/src/';

if (
    !file_exists($phpMailerBase . 'Exception.php') ||
    !file_exists($phpMailerBase . 'PHPMailer.php') ||
    !file_exists($phpMailerBase . 'SMTP.php')
) {
    die("PHPMailer files missing. Please check /PHPMailer/src/ folder.");
}

require_once $phpMailerBase . 'Exception.php';
require_once $phpMailerBase . 'PHPMailer.php';
require_once $phpMailerBase . 'SMTP.php';

$message = "";
$error = "";

// =========================
// HANDLE FORM SUBMIT
// =========================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Please enter a valid admin email address.";
    } else {
        try {
            $pdo = new PDO(
                "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4",
                $dbUser,
                $dbPass,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );

            $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE email = :email LIMIT 1");
            $stmt->execute([':email' => $email]);
            $admin = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($admin) {
                // Generate secure token
                $token = bin2hex(random_bytes(32));
                $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

                // Save token in DB
                $update = $pdo->prepare("
                    UPDATE admin_users
                    SET reset_token = :token, reset_token_expires = :expires
                    WHERE id = :id
                ");
                $update->execute([
                    ':token' => $token,
                    ':expires' => $expires,
                    ':id' => $admin['id']
                ]);

                // Build reset link
                $resetLink = 'https://' . $_SERVER['HTTP_HOST'] . '/admin/reset-password.php?token=' . urlencode($token);

                // Send email
                $mail = new PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'gatistwamgroup@gmail.com';
                $mail->Password = 'dstyxgwdprjdhuie';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                $mail->setFrom('gatistwamgroup@gmail.com', 'Patel Foundation India');
                $mail->addAddress($email, $admin['username']);
                $mail->isHTML(true);
                $mail->CharSet = 'UTF-8';
                $mail->Subject = 'Admin Password Reset • Patel Foundation India';

                $safeUsername = htmlspecialchars($admin['username']);
                $safeResetLink = htmlspecialchars($resetLink);

                $mail->Body = '
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Password Reset</title>
                </head>
                <body style="margin:0;padding:0;background:#EEF4FF;font-family:Arial,Helvetica,sans-serif;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EEF4FF;padding:30px 0;">
                    <tr>
                      <td align="center">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.08);">
                          
                          <tr>
                            <td style="background:linear-gradient(135deg,#1D4ED8,#2563EB);padding:32px;">
                              <div style="display:inline-block;background:rgba(255,255,255,0.14);color:#ffffff;font-size:12px;font-weight:700;padding:8px 14px;border-radius:999px;margin-bottom:14px;">
                                SECURE RESET REQUEST
                              </div>
                              <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.2;">Reset Your Admin Password</h1>
                              <p style="margin:12px 0 0;color:rgba(255,255,255,0.92);font-size:14px;line-height:1.7;">
                                A password reset request was received for your Patel Foundation India admin account.
                              </p>
                            </td>
                          </tr>

                          <tr>
                            <td style="padding:30px;">
                              <p style="margin:0 0 14px;font-size:15px;color:#334155;line-height:1.8;">
                                Hello <strong>' . $safeUsername . '</strong>,
                              </p>

                              <p style="margin:0 0 18px;font-size:15px;color:#334155;line-height:1.8;">
                                Click the button below to securely reset your password. This link will expire in <strong>1 hour</strong>.
                              </p>

                              <div style="margin:26px 0;">
                                <a href="' . $safeResetLink . '" style="display:inline-block;background:linear-gradient(135deg,#2563EB,#1D4ED8);color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:14px;font-weight:700;">
                                  Reset Password
                                </a>
                              </div>

                              <p style="margin:0;font-size:13px;color:#64748B;line-height:1.7;">
                                If you did not request this change, you can safely ignore this email and your password will remain unchanged.
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

                $mail->AltBody = "Reset your admin password using this link: " . $resetLink;
                $mail->send();
            }

            // Generic success for security
            $message = "If the email exists in our system, a reset link has been sent.";

        } catch (Exception $e) {
            $error = "Unable to send reset email right now. Please try again later.";
        } catch (PDOException $e) {
            $error = "Database issue. Please try again later.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Forgot Password • Patel Foundation India</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background:
        radial-gradient(circle at 15% 20%, rgba(59,130,246,0.22), transparent 25%),
        radial-gradient(circle at 85% 15%, rgba(124,58,237,0.18), transparent 20%),
        linear-gradient(135deg, #0b1120 0%, #172554 45%, #1e3a8a 100%);
    }

    .card {
      width: 100%;
      max-width: 560px;
      background: rgba(255,255,255,0.96);
      border-radius: 28px;
      padding: 30px;
      box-shadow: 0 30px 80px rgba(15,23,42,0.25);
    }

    .title {
      margin: 0;
      font-size: 30px;
      color: #0f172a;
      font-weight: 800;
    }

    .subtitle {
      margin: 12px 0 24px;
      color: #64748b;
      font-size: 14px;
      line-height: 1.7;
    }

    .alert {
      padding: 14px 16px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 18px;
    }

    .error {
      background: #fef2f2;
      color: #b91c1c;
      border: 1px solid #fecaca;
    }

    .success {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #334155;
    }

    input {
      width: 100%;
      padding: 15px 16px;
      border: 1px solid #dbe2ea;
      border-radius: 16px;
      font-size: 15px;
      outline: none;
      margin-bottom: 18px;
    }

    input:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 4px rgba(37,99,235,0.08);
    }

    .btn {
      width: 100%;
      border: none;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #fff;
      padding: 15px 16px;
      border-radius: 16px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
    }

    .links {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 16px;
    }

    .link-btn {
      flex: 1;
      min-width: 150px;
      text-align: center;
      text-decoration: none;
      padding: 13px 14px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 700;
      border: 1px solid #e2e8f0;
      color: #334155;
      background: #fff;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1 class="title">Forgot Password</h1>
    <p class="subtitle">
      Enter your admin email address and we’ll send you a secure password reset link.
    </p>

    <?php if (!empty($error)): ?>
      <div class="alert error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <?php if (!empty($message)): ?>
      <div class="alert success"><?php echo htmlspecialchars($message); ?></div>
    <?php endif; ?>

    <form method="POST" action="">
      <label for="email">Admin Email</label>
      <input type="email" id="email" name="email" placeholder="Enter your admin email" required />
      <button type="submit" class="btn">Send Reset Link</button>
    </form>

    <div class="links">
      <a href="/admin/login.php" class="link-btn">Back to Login</a>
      <a href="/" class="link-btn">Back to Website</a>
    </div>
  </div>
</body>
</html>