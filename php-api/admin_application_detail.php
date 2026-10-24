<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth_check.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit;
}

if (!is_admin_authenticated()) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Unauthorized access. Please log in as administrator.',
    ]);
    exit;
}

$rawId = trim((string)($_GET['id'] ?? ''));
if ($rawId === '') {
    // Attempt extract from REQUEST_URI if rewrite didn't set $_GET['id']
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    $parts = explode('/', trim($path, '/'));
    $rawId = end($parts) ?: '';
}

if ($rawId === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Application identifier is required.']);
    exit;
}

$pdo = get_db();

if ($method === 'GET') {
    $stmt = $pdo->prepare("SELECT * FROM applications WHERE id = :id OR reference_number = :id LIMIT 1");
    $stmt->execute([':id' => $rawId]);
    $row = $stmt->fetch();

    if (!$row) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Application record not found.']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'application' => normalize_application_row($row),
    ]);
    exit;
}

if ($method === 'PATCH') {
    $input = file_get_contents('php://input');
    $body = json_decode($input, true);

    if (!is_array($body)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON payload.']);
        exit;
    }

    $status = isset($body['status']) ? trim((string)$body['status']) : null;
    $adminNotes = isset($body['adminNotes']) ? (string)$body['adminNotes'] : null;

    if ($status === null && $adminNotes === null) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Nothing to update.']);
        exit;
    }

    $setParts = [];
    $params = [':id' => $rawId];

    if ($status !== null) {
        $setParts[] = "status = :status";
        $params[':status'] = $status;
    }
    if ($adminNotes !== null) {
        $setParts[] = "admin_notes = :admin_notes";
        $params[':admin_notes'] = $adminNotes;
    }

    $setParts[] = "updated_at = :updated_at";
    $params[':updated_at'] = date('c');

    $sql = "UPDATE applications SET " . implode(', ', $setParts) . " WHERE id = :id OR reference_number = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    echo json_encode([
        'success' => true,
        'message' => 'Application updated successfully.',
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
