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

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$status = trim($_GET['status'] ?? '');

$allowedStatuses = ['pending', 'paid'];

if ($id <= 0 || !in_array(strtolower($status), $allowedStatuses)) {
    header("Location: dashboard.php?msg=invalid_request");
    exit();
}

try {
    $pdo = new PDO(
        "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4",
        $dbUser,
        $dbPass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("UPDATE donations SET payment_status = :status WHERE id = :id");
    $stmt->execute([
        ':status' => ucfirst(strtolower($status)),
        ':id' => $id
    ]);

    header("Location: dashboard.php?msg=status_updated");
    exit();
} catch (PDOException $e) {
    header("Location: dashboard.php?msg=status_error");
    exit();
}
?>