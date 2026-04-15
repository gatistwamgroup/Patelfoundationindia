<?php
session_start();

// =========================
// DB CONFIG
// =========================
$dbHost = "localhost";
$dbName = "u603114659_patelfound";
$dbUser = "u603114659_pateldbuser";
$dbPass = "H8&vc*pl";

$token = trim($_GET['token'] ?? '');
$error = "";
$validToken = false;
$admin = null;

if (empty($token)) {
    $error = "Invalid reset request.";
} else {
    try {
        $pdo = new PDO(
            "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4",
            $dbUser,
            $dbPass,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );

        // Check token validity
        $stmt = $pdo->prepare("
            SELECT * FROM admin_users
            WHERE reset_token = :token
              AND reset_token_expires IS NOT NULL
              AND reset_token_expires >= NOW()
            LIMIT 1
        ");
        $stmt->execute([':token' => $token]);
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin) {
            $validToken = true;
        } else {
            $error = "This reset link is invalid or has expired.";
        }

        // Handle password reset submit
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $validToken) {
            $newPassword = trim($_POST['new_password'] ?? '');
            $confirmPassword = trim($_POST['confirm_password'] ?? '');

            if (strlen($newPassword) < 8) {
                $error = "Password must be at least 8 characters long.";
            } elseif ($newPassword !== $confirmPassword) {
                $error = "Passwords do not match.";
            } else {
                $newHash = password_hash($newPassword, PASSWORD_DEFAULT);

                $update = $pdo->prepare("
                    UPDATE admin_users
                    SET password_hash = :hash,
                        reset_token = NULL,
                        reset_token_expires = NULL
                    WHERE id = :id
                ");
                $update->execute([
                    ':hash' => $newHash,
                    ':id' => $admin['id']
                ]);

                header("Location: /admin/login.php?reset=success");
                exit();
            }
        }

    } catch (PDOException $e) {
        $error = "Database issue. Please try again later.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Password • Patel Foundation India</title>
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

    .back {
      display: inline-block;
      margin-top: 16px;
      text-decoration: none;
      color: #2563eb;
      font-size: 13px;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1 class="title">Reset Password</h1>
    <p class="subtitle">
      Create a new secure password for your admin account.
    </p>

    <?php if (!empty($error)): ?>
      <div class="alert error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <?php if ($validToken): ?>
      <form method="POST" action="">
        <label for="new_password">New Password</label>
        <input type="password" id="new_password" name="new_password" placeholder="Enter new password" required />

        <label for="confirm_password">Confirm Password</label>
        <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm new password" required />

        <button type="submit" class="btn">Update Password</button>
      </form>
    <?php endif; ?>

    <a href="/admin/login.php" class="back">← Back to Login</a>
  </div>
</body>
</html>