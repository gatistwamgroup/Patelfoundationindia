<?php
function generateDonationReceiptPDF($donation) {
    require_once __DIR__ . '/../fpdf/fpdf.php';

    $receiptsDir = __DIR__ . '/receipts/';
    if (!is_dir($receiptsDir)) {
        mkdir($receiptsDir, 0755, true);
    }

    $safeRef = preg_replace('/[^A-Za-z0-9\-_]/', '_', $donation['donation_ref']);
    $fileName = 'receipt_' . $safeRef . '.pdf';
    $filePath = $receiptsDir . $fileName;

    $pdf = new FPDF();
    $pdf->AddPage();

    $pdf->SetFont('Arial', 'B', 18);
    $pdf->SetTextColor(30, 58, 138);
    $pdf->Cell(0, 12, 'Patel Foundation India', 0, 1, 'C');

    $pdf->SetFont('Arial', '', 11);
    $pdf->SetTextColor(100, 116, 139);
    $pdf->Cell(0, 8, 'Donation Receipt / Acknowledgement', 0, 1, 'C');

    $pdf->Ln(8);

    $pdf->SetTextColor(15, 23, 42);
    $pdf->SetFont('Arial', 'B', 14);
    $pdf->Cell(0, 10, 'Donation Details', 0, 1);

    $pdf->SetFont('Arial', '', 12);

    $rows = [
        'Donation Ref'   => $donation['donation_ref'],
        'Donor Name'     => $donation['full_name'],
        'Email'          => $donation['email'],
        'Phone'          => $donation['phone'],
        'Amount'         => '$' . number_format((float)$donation['amount'], 2) . ' ' . ($donation['currency'] ?? 'USD'),
        'Support Area'   => $donation['support_area'],
        'Payment Method' => $donation['payment_method'],
        'Payment Status' => $donation['payment_status'],
        'Date'           => $donation['created_at'],
    ];

    foreach ($rows as $label => $value) {
        $pdf->SetFont('Arial', 'B', 11);
        $pdf->Cell(45, 10, $label . ':', 0, 0);

        $pdf->SetFont('Arial', '', 11);
        $pdf->MultiCell(0, 10, (string)$value, 0, 1);
    }

    $pdf->Ln(6);

    $pdf->SetFont('Arial', '', 11);
    $pdf->MultiCell(
        0,
        8,
        "Thank you for supporting Patel Foundation India. Your contribution helps us continue serving children and communities with care and purpose."
    );

    $pdf->Ln(8);

    $pdf->SetFont('Arial', 'I', 10);
    $pdf->SetTextColor(100, 116, 139);
    $pdf->MultiCell(
        0,
        7,
        "This receipt was generated from the admin dashboard for donor acknowledgement purposes."
    );

    $pdf->Output('F', $filePath);

    return $filePath;
}
?>