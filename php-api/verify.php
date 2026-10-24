<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

$rawRef = trim((string)($_GET['ref'] ?? $_GET['referenceNumber'] ?? $_GET['id'] ?? ''));

if ($rawRef === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Reference number is required for verification.',
    ]);
    exit;
}

$ref = mb_strtoupper($rawRef, 'UTF-8');
$pdo = get_db();

$stmt = $pdo->prepare("SELECT reference_number, status, first_name, middle_name, last_name, suffix, is_underage, affiliation_name, date_applied, created_at FROM applications WHERE UPPER(reference_number) = :ref OR UPPER(id) = :ref LIMIT 1");
$stmt->execute([':ref' => $ref]);
$row = $stmt->fetch();

if (!$row) {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'message' => "No application found matching reference number \"{$ref}\". Please verify the code on your official application slip.",
    ]);
    exit;
}

$middleInitial = !empty($row['middle_name']) ? mb_substr(trim($row['middle_name']), 0, 1, 'UTF-8') . '.' : '';
$formattedName = trim(implode(' ', array_filter([
    $row['first_name'],
    $middleInitial,
    $row['last_name'],
    $row['suffix'],
])));

$isUnderage = (bool)$row['is_underage'];
$dateApplied = $row['date_applied'];
if (!$dateApplied && !empty($row['created_at'])) {
    $dateApplied = explode('T', (string)$row['created_at'])[0];
}

echo json_encode([
    'success' => true,
    'verification' => [
        'referenceNumber' => $row['reference_number'],
        'status' => $row['status'],
        'applicantName' => mb_strtoupper($formattedName, 'UTF-8'),
        'membershipType' => $isUnderage ? 'Minor Member (with Parent/Guardian)' : 'Regular Member',
        'affiliation' => $row['affiliation_name'] ?: 'Individual Member',
        'dateApplied' => $dateApplied ?: date('Y-m-d'),
        'secRegistration' => '2026070258874-03',
        'organization' => 'AMIS SADAQAH FAMILY INCORPORATED',
        'headquarters' => 'Don Julian Rodriguez Sr., Avenue, Ma-A Road, Davao City, Philippines',
        'verifiedAt' => date('c'),
    ],
]);
