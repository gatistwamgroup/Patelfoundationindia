<?php
session_start();

// If already logged in, redirect to dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: /admin/dashboard.php");
    exit();
}

// =========================
// DB CONFIG
// =========================
$dbHost = "localhost";
$dbName = "u603114659_patelfound";
$dbUser = "u603114659_pateldbuser";
$dbPass = "H8&vc*pl";

$error = "";
$prefillUsername = $_COOKIE['admin_remember'] ?? '';

// =========================
// HANDLE LOGIN
// =========================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');
    $remember = isset($_POST['remember']);

    if (empty($username) || empty($password)) {
        $error = "Please enter your username and password.";
    } else {
        try {
            $pdo = new PDO(
                "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4",
                $dbUser,
                $dbPass,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );

            $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = :username LIMIT 1");
            $stmt->execute([':username' => $username]);
            $admin = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($admin && password_verify($password, $admin['password_hash'])) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_username'] = $admin['username'];
                $_SESSION['admin_email'] = $admin['email'];
                $_SESSION['admin_id'] = $admin['id'];

                // Basic remember me (username only)
                if ($remember) {
                    setcookie("admin_remember", $admin['username'], time() + (86400 * 30), "/");
                } else {
                    setcookie("admin_remember", "", time() - 3600, "/");
                }

                header("Location: /admin/dashboard.php");
                exit();
            } else {
                $error = "Invalid username or password.";
            }

        } catch (PDOException $e) {
            $error = "Database connection issue. Please try again.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Login • Patel Foundation India</title>
  <style>
    * { box-sizing: border-box; }

    :root {
      --text: #0f172a;
      --muted: #64748b;
      --line: #e2e8f0;
      --blue: #2563eb;
      --blue-dark: #1d4ed8;
      --shadow: 0 30px 80px rgba(15, 23, 42, 0.25);
    }

    body {
      margin: 0;
      font-family: Inter, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background:
        radial-gradient(circle at 15% 20%, rgba(59,130,246,0.28), transparent 25%),
        radial-gradient(circle at 85% 15%, rgba(124,58,237,0.24), transparent 20%),
        radial-gradient(circle at 80% 80%, rgba(16,185,129,0.16), transparent 18%),
        linear-gradient(135deg, #0b1120 0%, #172554 35%, #1e3a8a 65%, #4c1d95 100%);
      position: relative;
      overflow: hidden;
    }

    body::before,
    body::after {
      content: "";
      position: fixed;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0.45;
      z-index: 0;
    }

    body::before {
      width: 220px;
      height: 220px;
      background: rgba(59, 130, 246, 0.35);
      top: 6%;
      left: 4%;
    }

    body::after {
      width: 280px;
      height: 280px;
      background: rgba(124, 58, 237, 0.28);
      bottom: 8%;
      right: 5%;
    }

    .login-wrap {
      width: 100%;
      max-width: 1180px;
      display: grid;
      grid-template-columns: 1.08fr 0.92fr;
      gap: 24px;
      align-items: stretch;
      position: relative;
      z-index: 1;
    }

    .login-showcase {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.14);
      backdrop-filter: blur(16px);
      border-radius: 32px;
      padding: 42px;
      color: #ffffff;
      box-shadow: 0 25px 60px rgba(0,0,0,0.18);
      position: relative;
      overflow: hidden;
    }

    .login-showcase::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.04), transparent 40%),
        radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 25%);
      pointer-events: none;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.16);
      padding: 10px 16px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #60a5fa;
    }

    .showcase-title {
      margin: 26px 0 14px;
      font-size: 46px;
      line-height: 1.1;
      font-weight: 800;
      letter-spacing: -1px;
    }

    .showcase-desc {
      margin: 0;
      font-size: 16px;
      line-height: 1.8;
      color: rgba(255,255,255,0.85);
      max-width: 520px;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-top: 34px;
    }

    .feature-card {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 22px;
      padding: 18px;
    }

    .feature-card h4 {
      margin: 0 0 8px;
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
    }

    .feature-card p {
      margin: 0;
      font-size: 13px;
      line-height: 1.7;
      color: rgba(255,255,255,0.75);
    }

    .showcase-footer {
      margin-top: 28px;
      font-size: 13px;
      color: rgba(255,255,255,0.65);
    }

    .login-card {
      background: rgba(255,255,255,0.96);
      backdrop-filter: blur(18px);
      border: 1px solid rgba(255,255,255,0.8);
      border-radius: 32px;
      padding: 34px;
      box-shadow: var(--shadow);
      position: relative;
    }

    .brand-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
    }

    .brand-title {
      font-size: 14px;
      font-weight: 800;
      color: var(--blue);
      letter-spacing: 0.3px;
      text-transform: uppercase;
    }

    .secure-chip {
      background: #eff6ff;
      color: #1d4ed8;
      padding: 8px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
    }

    .login-title {
      margin: 0;
      font-size: 34px;
      line-height: 1.15;
      color: var(--text);
      font-weight: 800;
      letter-spacing: -0.6px;
    }

    .login-subtitle {
      margin: 12px 0 26px;
      font-size: 14px;
      line-height: 1.7;
      color: var(--muted);
    }

    .alert {
      padding: 14px 16px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 18px;
    }

    .alert-error {
      background: #fef2f2;
      color: #b91c1c;
      border: 1px solid #fecaca;
    }

    .alert-success {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    .form-group {
      margin-bottom: 18px;
    }

    .label-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }

    label {
      font-size: 13px;
      font-weight: 700;
      color: #334155;
    }

    .input-wrap {
      position: relative;
    }

    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 15px 16px;
      border: 1px solid #dbe2ea;
      border-radius: 16px;
      font-size: 15px;
      outline: none;
      background: #ffffff;
      transition: 0.25s ease;
    }

    input[type="text"]:focus,
    input[type="password"]:focus {
      border-color: var(--blue);
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
    }

    .password-toggle {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 12px;
      font-weight: 800;
      color: var(--blue);
    }

    .options-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin: 8px 0 22px;
      flex-wrap: wrap;
    }

    .remember-me {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: #475569;
      font-weight: 600;
    }

    .remember-me input[type="checkbox"] {
      width: 16px;
      height: 16px;
      margin: 0;
      accent-color: #2563eb;
    }

    .login-btn {
      width: 100%;
      border: none;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #ffffff;
      padding: 16px 18px;
      border-radius: 18px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 14px 30px rgba(37, 99, 235, 0.22);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .login-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 18px 34px rgba(37, 99, 235, 0.26);
    }

    .quick-links {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 18px;
    }

    .secondary-link {
      flex: 1;
      min-width: 150px;
      text-align: center;
      text-decoration: none;
      padding: 13px 14px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 700;
      border: 1px solid var(--line);
      color: #334155;
      background: #ffffff;
    }

    .secondary-link:hover {
      background: #f8fafc;
    }

    .footer-note {
      margin-top: 20px;
      font-size: 12px;
      line-height: 1.7;
      color: #94a3b8;
      text-align: center;
    }

    @media (max-width: 980px) {
      .login-wrap {
        grid-template-columns: 1fr;
      }

      .login-showcase {
        display: none;
      }

      .login-card {
        max-width: 560px;
        margin: 0 auto;
      }
    }

    @media (max-width: 640px) {
      body {
        padding: 14px;
      }

      .login-card {
        padding: 24px;
        border-radius: 24px;
      }

      .login-title {
        font-size: 28px;
      }

      .quick-links {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <div class="login-wrap">

    <!-- LEFT SHOWCASE -->
    <div class="login-showcase">
      <div class="badge">
        <span class="badge-dot"></span>
        Secure Admin Access
      </div>

      <h1 class="showcase-title">Manage donations with confidence and clarity.</h1>

      <p class="showcase-desc">
        Access the Patel Foundation India admin dashboard to review donation activity, update payment status, send premium donor emails, export records, and manage donation workflows securely.
      </p>

      <div class="feature-grid">
        <div class="feature-card">
          <h4>Donation Monitoring</h4>
          <p>Track donor records, payment status, donor details, and timeline activity in one place.</p>
        </div>

        <div class="feature-card">
          <h4>Premium Donor Emails</h4>
          <p>Send branded pending and paid emails with polished donor experience and PDF receipts.</p>
        </div>

        <div class="feature-card">
          <h4>Secure Access</h4>
          <p>Protected admin-only area with database-backed login and reliable session handling.</p>
        </div>

        <div class="feature-card">
          <h4>Operational Control</h4>
          <p>Export reports, verify payments, and manage donation records from one premium dashboard.</p>
        </div>
      </div>

      <div class="showcase-footer">
        Patel Foundation India • Admin Panel
      </div>
    </div>

    <!-- RIGHT LOGIN CARD -->
    <div class="login-card">
      <div class="brand-top">
        <div class="brand-title">Patel Foundation India</div>
        <div class="secure-chip">Protected Area</div>
      </div>

      <h2 class="login-title">Welcome back, Admin</h2>
      <p class="login-subtitle">
        Sign in to access the donation dashboard and manage donor activity securely.
      </p>

      <?php if (!empty($error)): ?>
        <div class="alert alert-error"><?php echo htmlspecialchars($error); ?></div>
      <?php endif; ?>

      <?php if (isset($_GET['reset']) && $_GET['reset'] === 'success'): ?>
        <div class="alert alert-success">Password updated successfully. Please login with your new password.</div>
      <?php endif; ?>

      <form method="POST" action="">
        <div class="form-group">
          <div class="label-row">
            <label for="username">Username</label>
          </div>
          <div class="input-wrap">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value="<?php echo htmlspecialchars($prefillUsername); ?>"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <div class="label-row">
            <label for="password">Password</label>
          </div>
          <div class="input-wrap">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <button type="button" class="password-toggle" onclick="togglePassword()">SHOW</button>
          </div>
        </div>

        <div class="options-row">
          <label class="remember-me">
            <input type="checkbox" name="remember" value="1" />
            Remember me for 30 days
          </label>
        </div>

        <button type="submit" class="login-btn">Login to Dashboard</button>
      </form>

      <div class="quick-links">
      <a href="/admin/forgot-password.php" class="secondary-link">Forgot Password</a>
      <a href="/" class="secondary-link">Back to Website</a>
    </div>

      <div class="footer-note">
        Authorized administrators only. All activity may be monitored for security and operational purposes.
      </div>
    </div>
  </div>

  <script>
    function togglePassword() {
      const passwordInput = document.getElementById('password');
      const toggleBtn = document.querySelector('.password-toggle');

      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'HIDE';
      } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'SHOW';
      }
    }
  </script>
</body>
</html>