<?php
header("Content-Type: application/json");

// LIVE DB Credentials (replace with your NEW password)
$host = "localhost";
$dbname = "u603114659_patelfound";
$username = "u603114659_pateldbuser";
$password = "H8&vc*pl"; // ⚠️ old leaked password use mat karo

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
} catch (PDOException $e) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]));
}
?>