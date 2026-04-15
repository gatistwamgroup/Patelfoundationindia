<?php
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit();
}

require_once __DIR__ . '/../api/db.php';
require_once __DIR__ . '/send-donation-email-helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: dashboard.php?msg=invalid");
    exit();
}

$id = (int)($_POST['id'] ?? 0);
$status = trim($_POST['status'] ?? '');

$allowedStatuses = ['Paid', 'Pending', 'Pending Verification'];

if ($id <= 0 || !in_array($status, $allowedStatuses, true)) {
    header("Location: dashboard.php?msg=invalid");
    exit();
}

try {
    $stmt = $pdo->prepare("
        UPDATE donations
        SET payment_status = :status
        WHERE id = :id
    ");
    $stmt->execute([
        ':status' => $status,
        ':id' => $id
    ]);

    // Auto send receipt only when marked Paid
    if ($status === 'Paid') {
        $emailResult = sendDonationReceiptEmail($id, false);

        if (!$emailResult['success']) {
            header("Location: dashboard.php?msg=email_error");
            exit();
        }
    }

    header("Location: dashboard.php?msg=status_updated");
    exit();

} catch (PDOException $e) {
    header("Location: dashboard.php?msg=db_error");
    exit();
}