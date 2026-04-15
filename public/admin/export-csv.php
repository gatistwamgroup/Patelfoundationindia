<?php
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit();
}

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

    $status = trim($_GET['status'] ?? '');
    $fromDate = trim($_GET['from_date'] ?? '');
    $toDate = trim($_GET['to_date'] ?? '');

    $sql = "SELECT * FROM donations WHERE 1=1";
    $params = [];

    if ($status && in_array(strtolower($status), ['pending', 'paid'])) {
        $sql .= " AND LOWER(payment_status) = :status";
        $params[':status'] = strtolower($status);
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

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $donations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=donations_export_' . date('Y-m-d_H-i-s') . '.csv');

    $output = fopen('php://output', 'w');

    fputcsv($output, [
        'ID',
        'Donation Ref',
        'Full Name',
        'Email',
        'Phone',
        'Amount',
        'Currency',
        'Support Area',
        'Payment Method',
        'Payment Status',
        'Created At'
    ]);

    foreach ($donations as $row) {
        fputcsv($output, [
            $row['id'],
            $row['donation_ref'],
            $row['full_name'],
            $row['email'],
            $row['phone'],
            $row['amount'],
            $row['currency'],
            $row['support_area'],
            $row['payment_method'],
            $row['payment_status'],
            $row['created_at']
        ]);
    }

    fclose($output);
    exit();

} catch (PDOException $e) {
    die("CSV Export Error: " . htmlspecialchars($e->getMessage()));
}
?>