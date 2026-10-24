<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_check.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

if (!is_admin_authenticated()) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Unauthorized access. Please log in as administrator.',
    ]);
    exit;
}

$pdo = get_db();

$statusFilter = trim((string)($_GET['status'] ?? ''));
$query = mb_strtolower(trim((string)($_GET['q'] ?? '')), 'UTF-8');

$sql = "SELECT * FROM applications WHERE 1=1";
$params = [];

if ($statusFilter !== '' && strtolower($statusFilter) !== 'all') {
    $sql .= " AND LOWER(status) = LOWER(:status)";
    $params[':status'] = $statusFilter;
}

if ($query !== '') {
    $sql .= " AND (
        LOWER(first_name) LIKE :q OR
        LOWER(last_name) LIKE :q OR
        LOWER(reference_number) LIKE :q OR
        LOWER(email) LIKE :q OR
        LOWER(contact_number) LIKE :q OR
        LOWER(present_address) LIKE :q OR
        LOWER(beneficiary_first_name) LIKE :q OR
        LOWER(beneficiary_last_name) LIKE :q
    )";
    $params[':q'] = '%' . $query . '%';
}

$sql .= " ORDER BY created_at DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();

$applications = array_map('normalize_application_row', $rows);

// Compute accurate stats across all records
$allStatsStmt = $pdo->query("SELECT status, is_underage, created_at FROM applications");
$allForStats = $allStatsStmt->fetchAll();

$todayPrefix = date('Y-m-d');
$stats = [
    'total' => count($allForStats),
    'pending' => 0,
    'underReview' => 0,
    'approved' => 0,
    'rejected' => 0,
    'today' => 0,
    'minors' => 0,
];

foreach ($allForStats as $r) {
    $st = strtolower(trim((string)$r['status']));
    if ($st === 'pending') $stats['pending']++;
    elseif ($st === 'under review') $stats['underReview']++;
    elseif ($st === 'approved') $stats['approved']++;
    elseif ($st === 'rejected') $stats['rejected']++;

    if (!empty($r['is_underage'])) {
        $stats['minors']++;
    }

    if (str_starts_with((string)$r['created_at'], $todayPrefix)) {
        $stats['today']++;
    }
}

echo json_encode([
    'success' => true,
    'applications' => $applications,
    'stats' => $stats,
]);
