<?php

header("Content-Type: application/json");

require_once "db.php";
require_once "paypal-config.php";

$payload = file_get_contents("php://input");
$data = json_decode($payload, true);

file_put_contents(__DIR__ . "/paypal-webhook-log.txt", date('Y-m-d H:i:s') . " - " . $payload . PHP_EOL, FILE_APPEND);

if (!$data || !isset($data['event_type'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid webhook payload"]);
    exit();
}

$eventType = $data['event_type'];

try {
    if ($eventType === 'PAYMENT.CAPTURE.COMPLETED') {
        $resource = $data['resource'];
        $paypalCaptureId = $resource['id'] ?? null;
        $paypalOrderId = $resource['supplementary_data']['related_ids']['order_id'] ?? null;

        if ($paypalOrderId) {
            $stmt = $pdo->prepare("
                UPDATE donations
                SET 
                    payment_status = 'Completed',
                    paypal_capture_id = :paypal_capture_id,
                    paypal_webhook_event = :paypal_webhook_event,
                    completed_at = NOW()
                WHERE paypal_order_id = :paypal_order_id
            ");

            $stmt->execute([
                ':paypal_capture_id' => $paypalCaptureId,
                ':paypal_webhook_event' => $eventType,
                ':paypal_order_id' => $paypalOrderId
            ]);
        }
    }

    if ($eventType === 'PAYMENT.CAPTURE.DENIED') {
        $resource = $data['resource'];
        $paypalOrderId = $resource['supplementary_data']['related_ids']['order_id'] ?? null;

        if ($paypalOrderId) {
            $stmt = $pdo->prepare("
                UPDATE donations
                SET 
                    payment_status = 'Failed',
                    paypal_webhook_event = :paypal_webhook_event
                WHERE paypal_order_id = :paypal_order_id
            ");

            $stmt->execute([
                ':paypal_webhook_event' => $eventType,
                ':paypal_order_id' => $paypalOrderId
            ]);
        }
    }

    if ($eventType === 'PAYMENT.CAPTURE.REFUNDED') {
        $resource = $data['resource'];
        $paypalCaptureId = $resource['sale_id'] ?? null;

        if ($paypalCaptureId) {
            $stmt = $pdo->prepare("
                UPDATE donations
                SET 
                    payment_status = 'Refunded',
                    paypal_webhook_event = :paypal_webhook_event
                WHERE paypal_capture_id = :paypal_capture_id
            ");

            $stmt->execute([
                ':paypal_webhook_event' => $eventType,
                ':paypal_capture_id' => $paypalCaptureId
            ]);
        }
    }

    http_response_code(200);
    echo json_encode(["success" => true]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}