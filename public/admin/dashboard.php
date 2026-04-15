<?php
session_start();

// Protect page
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit();
}

// DB CONFIG
$dbHost = "localhost";
$dbName = "u603114659_patelfound";
$dbUser = "u603114659_pateldbuser";
$dbPass = "H8&vc*pl";

try {
    $pdo = new PDO(
        "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4",
        $dbUser,
        $dbPass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    die("<h2 style='color:red;'>Database connection failed: " . htmlspecialchars($e->getMessage()) . "</h2>");
}

// Filters
$statusFilter = trim($_GET['status'] ?? 'all');
$fromDate = trim($_GET['from_date'] ?? '');
$toDate = trim($_GET['to_date'] ?? '');

$sql = "SELECT * FROM donations WHERE 1=1";
$params = [];

if ($statusFilter !== 'all' && in_array(strtolower($statusFilter), ['pending', 'paid'])) {
    $sql .= " AND LOWER(payment_status) = :status";
    $params[':status'] = strtolower($statusFilter);
}

if (!empty($fromDate)) {
    $sql .= " AND DATE(created_at) >= :from_date";
    $params[':from_date'] = $fromDate;
}

if (!empty($toDate)) {
    $sql .= " AND DATE(created_at) <= :to_date";
    $params[':to_date'] = $toDate;
}

$sql .= " ORDER BY id DESC";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $donations = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("<h2 style='color:red;'>Query failed: " . htmlspecialchars($e->getMessage()) . "</h2>");
}

// Stats (overall from filtered data)
$totalDonations = 0;
$totalDonors = count($donations);
$pendingCount = 0;
$paidCount = 0;

foreach ($donations as $row) {
    $totalDonations += (float)$row['amount'];

    if (strtolower($row['payment_status']) === 'pending') {
        $pendingCount++;
    }

    if (strtolower($row['payment_status']) === 'paid') {
        $paidCount++;
    }
}

$msg = $_GET['msg'] ?? '';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Donation Dashboard Pro</title>
  <style>
    * { box-sizing: border-box; }

    :root {
      --bg: #f5f8ff;
      --card: rgba(255,255,255,0.9);
      --text: #0f172a;
      --muted: #64748b;
      --line: #e5e7eb;
      --blue: #2563eb;
      --blue-dark: #1d4ed8;
      --green: #10b981;
      --orange: #f59e0b;
      --red: #ef4444;
      --purple: #7c3aed;
      --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
      --radius: 22px;
    }

    body {
      margin: 0;
      font-family: Inter, Arial, sans-serif;
      background:
        radial-gradient(circle at top right, rgba(37, 99, 235, 0.10), transparent 28%),
        radial-gradient(circle at top left, rgba(124, 58, 237, 0.08), transparent 22%),
        linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%);
      color: var(--text);
      min-height: 100vh;
      padding: 24px;
    }

    .dashboard-wrap { max-width: 1600px; margin: 0 auto; }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
      flex-wrap: wrap;
      margin-bottom: 26px;
      padding: 22px 24px;
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.65);
      border-radius: 24px;
      box-shadow: var(--shadow);
    }

    .topbar-left h1 {
      margin: 0;
      font-size: 32px;
      line-height: 1.1;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #0b1220;
    }

    .topbar-left p {
      margin: 10px 0 0;
      font-size: 14px;
      color: var(--muted);
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .admin-chip {
      background: linear-gradient(135deg, #e0f2fe, #dbeafe);
      color: #1e3a8a;
      padding: 12px 16px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
    }

    .logout-btn {
      text-decoration: none;
      background: linear-gradient(135deg, #ef4444, #dc2626);
      color: #fff;
      padding: 12px 18px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 700;
      box-shadow: 0 10px 20px rgba(239, 68, 68, 0.18);
    }

    .message-box {
      margin-bottom: 18px;
      padding: 14px 16px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 700;
    }

    .msg-success {
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #a7f3d0;
    }

    .msg-error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
      margin-bottom: 24px;
    }

    .stat-card {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius);
      padding: 22px;
      color: #fff;
      box-shadow: var(--shadow);
    }

    .stat-card::before {
      content: "";
      position: absolute;
      top: -40px;
      right: -40px;
      width: 120px;
      height: 120px;
      background: rgba(255,255,255,0.12);
      border-radius: 50%;
    }

    .stat-card .label { position: relative; font-size: 13px; font-weight: 600; opacity: 0.9; margin-bottom: 12px; }
    .stat-card .value { position: relative; font-size: 30px; font-weight: 800; line-height: 1; }
    .stat-card .sub { position: relative; margin-top: 10px; font-size: 12px; opacity: 0.85; }

    .card-blue { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
    .card-purple { background: linear-gradient(135deg, #7c3aed, #6d28d9); }
    .card-orange { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .card-green { background: linear-gradient(135deg, #10b981, #059669); }

    .filter-card {
      background: rgba(255,255,255,0.82);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.7);
      border-radius: 22px;
      padding: 18px;
      box-shadow: var(--shadow);
      margin-bottom: 24px;
    }

    .filter-row {
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr auto auto;
      gap: 14px;
      align-items: end;
    }

    .filter-item label {
      display: block;
      margin-bottom: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #334155;
    }

    .filter-item input,
    .filter-item select {
      width: 100%;
      padding: 13px 14px;
      border: 1px solid #dbe2ea;
      border-radius: 14px;
      font-size: 14px;
      outline: none;
      background: #fff;
    }

    .filter-item input:focus,
    .filter-item select:focus {
      border-color: var(--blue);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
    }

    .filter-btn, .export-btn {
      border: none;
      padding: 13px 18px;
      border-radius: 14px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      white-space: nowrap;
    }

    .filter-btn {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #fff;
    }

    .export-btn {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff;
    }

    .table-card {
      background: rgba(255,255,255,0.88);
      backdrop-filter: blur(12px);
      border-radius: 24px;
      box-shadow: var(--shadow);
      border: 1px solid rgba(255,255,255,0.65);
      overflow: hidden;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      padding: 20px 22px;
      border-bottom: 1px solid #edf2f7;
      background: rgba(255,255,255,0.75);
    }

    .table-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
    }

    .table-header span {
      font-size: 13px;
      color: var(--muted);
      font-weight: 600;
    }

    .table-wrap { overflow-x: auto; }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 1700px;
    }

    th, td {
      padding: 15px 16px;
      text-align: left;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
      vertical-align: top;
    }

    th {
      position: sticky;
      top: 0;
      background: #f8fbff;
      color: #334155;
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      z-index: 1;
    }

    tbody tr:hover { background: rgba(37, 99, 235, 0.03); }

    .ref { font-weight: 800; color: #1d4ed8; white-space: nowrap; }
    .name-cell { font-weight: 700; color: #0f172a; }
    .email-cell { color: #334155; font-size: 13px; word-break: break-word; }
    .muted { color: var(--muted); font-size: 13px; }
    .amount { font-weight: 800; color: #0f172a; white-space: nowrap; }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 800;
      line-height: 1;
      white-space: nowrap;
    }

    .badge::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.85;
    }

    .badge-pending { background: #fff7ed; color: #c2410c; }
    .badge-paid { background: #ecfdf5; color: #047857; }

    .type-pill {
      display: inline-block;
      padding: 7px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      background: #eef2ff;
      color: #4338ca;
    }

    .purpose-pill {
      display: inline-block;
      padding: 7px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      background: #f8fafc;
      color: #334155;
      border: 1px solid #e2e8f0;
    }

    .action-stack {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 140px;
    }

    .action-form {
      margin: 0;
    }

    .action-btn {
      width: 100%;
      border: none;
      padding: 10px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
    }

    .btn-paid {
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
    }

    .btn-pending {
      background: #fff7ed;
      color: #c2410c;
      border: 1px solid #fdba74;
    }

    .btn-email {
      background: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
      text-decoration: none;
      display: block;
      text-align: center;
    }

    .empty-state {
      padding: 40px 22px;
      text-align: center;
      color: var(--muted);
      font-size: 15px;
    }

    @media (max-width: 1200px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .filter-row { grid-template-columns: 1fr 1fr; }
    }

    @media (max-width: 768px) {
      body { padding: 14px; }
      .topbar-left h1 { font-size: 24px; }
      .stats-grid { grid-template-columns: 1fr; }
      .filter-row { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="dashboard-wrap">
    <div class="topbar">
      <div class="topbar-left">
        <h1>Donation Dashboard Pro</h1>
        <p>Manage donor records, update payment statuses, export reports, and review donation activity.</p>
      </div>

      <div class="topbar-right">
        <div class="admin-chip">
          Logged in as: <?php echo htmlspecialchars($_SESSION['admin_username'] ?? 'admin'); ?>
        </div>
        <a href="logout.php" class="logout-btn">Logout</a>
      </div>
    </div>

    <?php if ($msg === 'status_updated'): ?>
  <div class="message-box msg-success">Donation status updated successfully.</div>

        <?php elseif ($msg === 'email_sent'): ?>
        <div class="message-box msg-success">Donation email sent successfully.</div>

        <?php elseif ($msg === 'invalid' || $msg === 'db_error'): ?>
        <div class="message-box msg-error">Something went wrong while updating status.</div>

        <?php elseif ($msg === 'email_invalid'): ?>
        <div class="message-box msg-error">Invalid donation record selected for email.</div>

        <?php elseif ($msg === 'mail_lib_missing'): ?>
        <div class="message-box msg-error">PHPMailer library not found. Please check PHPMailer folder path.</div>

        <?php elseif ($msg === 'pdf_error'): ?>
        <div class="message-box msg-error">PDF receipt could not be generated.</div>

        <?php elseif ($msg === 'email_error'): ?>
        <div class="message-box msg-error">Email sending failed. Please check SMTP app password or mail settings.</div>
        <?php endif; ?>

    <div class="stats-grid">
      <div class="stat-card card-blue">
        <div class="label">Total Records</div>
        <div class="value"><?php echo count($donations); ?></div>
        <div class="sub">Filtered donation records</div>
      </div>

      <div class="stat-card card-purple">
        <div class="label">Donors</div>
        <div class="value"><?php echo $totalDonors; ?></div>
        <div class="sub">Visible donor entries</div>
      </div>

      <div class="stat-card card-orange">
        <div class="label">Pending</div>
        <div class="value"><?php echo $pendingCount; ?></div>
        <div class="sub">Awaiting payment confirmation</div>
      </div>

      <div class="stat-card card-green">
        <div class="label">Amount (USD)</div>
        <div class="value">$<?php echo number_format($totalDonations, 2); ?></div>
        <div class="sub">Filtered total requested amount</div>
      </div>
    </div>

    <div class="filter-card">
      <form method="GET" action="">
        <div class="filter-row">
          <div class="filter-item">
            <label for="status">Status</label>
            <select id="status" name="status">
              <option value="all" <?php echo ($statusFilter === 'all') ? 'selected' : ''; ?>>All</option>
              <option value="pending" <?php echo ($statusFilter === 'pending') ? 'selected' : ''; ?>>Pending</option>
              <option value="paid" <?php echo ($statusFilter === 'paid') ? 'selected' : ''; ?>>Paid</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="from_date">From Date</label>
            <input type="date" id="from_date" name="from_date" value="<?php echo htmlspecialchars($fromDate); ?>">
          </div>

          <div class="filter-item">
            <label for="to_date">To Date</label>
            <input type="date" id="to_date" name="to_date" value="<?php echo htmlspecialchars($toDate); ?>">
          </div>

          <div>
            <button type="submit" class="filter-btn">Apply Filter</button>
          </div>

          <div>
            <a 
              class="export-btn"
              href="export-csv.php?status=<?php echo urlencode($statusFilter); ?>&from_date=<?php echo urlencode($fromDate); ?>&to_date=<?php echo urlencode($toDate); ?>"
            >
              Export CSV
            </a>
          </div>
        </div>
      </form>
    </div>

    <div class="table-card">
      <div class="table-header">
        <h2>Donation Records</h2>
        <span>Total Records: <?php echo count($donations); ?></span>
      </div>

      <?php if (count($donations) > 0): ?>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Donation Ref</th>
                <th>Donor Details</th>
                <th>Phone</th>
                <th>Payment Type</th>
                <th>Amount</th>
                <th>Support Area</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($donations as $row): ?>
                <tr>
                  <td><?php echo htmlspecialchars($row['id']); ?></td>

                  <td class="ref"><?php echo htmlspecialchars($row['donation_ref']); ?></td>

                  <td>
                    <div class="name-cell"><?php echo htmlspecialchars($row['full_name']); ?></div>
                    <div class="email-cell"><?php echo htmlspecialchars($row['email']); ?></div>
                  </td>

                  <td class="muted"><?php echo htmlspecialchars($row['phone']); ?></td>

                  <td><span class="type-pill"><?php echo htmlspecialchars($row['payment_method']); ?></span></td>

                  <td class="amount">$<?php echo htmlspecialchars($row['amount']); ?></td>

                  <td><span class="purpose-pill"><?php echo htmlspecialchars($row['support_area']); ?></span></td>

                  <td>
                    <?php if (strtolower($row['payment_status']) === 'paid'): ?>
                      <span class="badge badge-paid">Paid</span>
                    <?php else: ?>
                      <span class="badge badge-pending">Pending</span>
                    <?php endif; ?>
                  </td>

                  <td class="muted"><?php echo htmlspecialchars($row['created_at']); ?></td>

                  <td>
                    <div class="action-stack">
                      <?php if (strtolower($row['payment_status']) === 'pending'): ?>
                        <form class="action-form" method="POST" action="/admin/update-status.php">
                          <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                          <input type="hidden" name="status" value="Paid">
                          <button type="submit" class="action-btn btn-paid">Mark as Paid</button>
                        </form>
                      <?php else: ?>
                        <form class="action-form" method="POST" action="/admin/update-status.php">
                          <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                          <input type="hidden" name="status" value="Pending">
                          <button type="submit" class="action-btn btn-pending">Mark as Pending</button>
                        </form>
                      <?php endif; ?>

                      <a class="action-btn btn-email" href="/admin/send-donation-email.php?id=<?php echo $row['id']; ?>">
                        Send Email
                      </a>
                    </div>
                  </td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      <?php else: ?>
        <div class="empty-state">No donation records found for the selected filters.</div>
      <?php endif; ?>
    </div>
  </div>
</body>
</html>