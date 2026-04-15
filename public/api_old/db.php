<?php
header("Content-Type: application/json");

// IMPORTANT: Replace these with your Hostinger DB details
$host = "localhost";
$dbname = "YOUR_DB_NAME";
$username = "YOUR_DB_USER";
$password = "YOUR_DB_PASSWORD";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $e->getMessage()
    ]));
}
?>