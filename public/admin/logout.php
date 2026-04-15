<?php
session_start();

// Remove remember me cookie if exists
if (isset($_COOKIE['admin_remember'])) {
    setcookie("admin_remember", "", time() - 3600, "/");
}

// Destroy session
session_unset();
session_destroy();

// Redirect to login
header("Location: /admin/login.php");
exit();
?>