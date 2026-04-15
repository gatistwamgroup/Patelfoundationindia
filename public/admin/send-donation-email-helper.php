<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../api/db.php';

// PHPMailer path check karo
require_once __DIR__ . '/../PHPMailer/src/Exception.php';
require_once __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../PHPMailer/src/SMTP.php';

function sendDonationReceiptEmail($donationId, $forceSend = false) {
    global $pdo;

    try {
        $stmt = $pdo->prepare("SELECT * FROM donations WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $donationId]);
        $donation = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$donation) {
            return [
                "success" => false,
                "message" => "Donation not found."
            ];
        }

        // Duplicate email stop
        if (!$forceSend && (int)$donation['receipt_email_sent'] === 1) {
            return [
                "success" => true,
                "message" => "Receipt email already sent.",
                "already_sent" => true
            ];
        }

        $mail = new PHPMailer(true);

        // SMTP settings - yahan apna SMTP set karo
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com'; // ya smtp.gmail.com
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@mypatelfoundation.in'; // apna sender email
        $mail->Password   = 'YOUR_EMAIL_PASSWORD'; // app password / email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('info@mypatelfoundation.in', 'Patel Foundation India');
        $mail->addAddress($donation['email'], $donation['full_name']);

        // Optional admin copy
        $mail->addBCC('info@mypatelfoundation.in');

        $mail->isHTML(true);
        $mail->Subject = 'Thank You for Your Donation - Patel Foundation India';

        $currency = strtoupper($donation['currency'] ?? 'USD');
        $amountPrefix = ($currency === 'INR') ? '₹' : '$';

        $status = trim($donation['payment_status']);

        $mail->Body = '
            <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
                <h2 style="color: #0f172a; margin-bottom: 10px;">Thank You for Your Donation 💚</h2>
                <p>Dear ' . htmlspecialchars($donation['full_name']) . ',</p>
                <p>We sincerely thank you for supporting <strong>Patel Foundation India</strong>.</p>
                <p>Your contribution helps us continue our mission to support children and families in need.</p>

                <div style="background: #f8fafc; padding: 16px; border-radius: 10px; margin: 20px 0;">
                    <p style="margin: 6px 0;"><strong>Donation Reference:</strong> ' . htmlspecialchars($donation['donation_ref']) . '</p>
                    <p style="margin: 6px 0;"><strong>Amount:</strong> ' . $amountPrefix . htmlspecialchars($donation['amount']) . ' ' . htmlspecialchars($currency) . '</p>
                    <p style="margin: 6px 0;"><strong>Payment Method:</strong> ' . htmlspecialchars($donation['payment_method']) . '</p>
                    <p style="margin: 6px 0;"><strong>Status:</strong> ' . htmlspecialchars($status) . '</p>
                    <p style="margin: 6px 0;"><strong>Support Area:</strong> ' . htmlspecialchars($donation['support_area']) . '</p>
                </div>

                <p>If you have any questions, feel free to contact us.</p>
                <p style="margin-top: 24px;">Warm regards,<br><strong>Patel Foundation India</strong></p>
            </div>
        ';

        $mail->send();

        // Mark email sent
        $updateStmt = $pdo->prepare("
            UPDATE donations
            SET receipt_email_sent = 1
            WHERE id = :id
        ");
        $updateStmt->execute([':id' => $donationId]);

        return [
            "success" => true,
            "message" => "Receipt email sent successfully."
        ];

    } catch (Exception $e) {
        return [
            "success" => false,
            "message" => "Mailer Error: " . $e->getMessage()
        ];
    } catch (PDOException $e) {
        return [
            "success" => false,
            "message" => "Database Error: " . $e->getMessage()
        ];
    }
}