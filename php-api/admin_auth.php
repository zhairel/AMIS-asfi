<?php
declare(strict_types=1);

require_once __DIR__ . '/auth_check.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit;
}

if ($method === 'POST') {
    $input = file_get_contents('php://input');
    $body = json_decode($input, true) ?? [];
    $password = (string)($body['password'] ?? '');

    $adminPass = get_admin_password();

    if ($password === '' || !hash_equals($adminPass, $password)) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid administrative password.',
        ]);
        exit;
    }

    $token = get_expected_admin_token();
    $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

    setcookie('asfi_admin_auth', $token, [
        'expires' => time() + (86400 * 7),
        'path' => '/',
        'domain' => '',
        'secure' => $isSecure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Admin authenticated successfully.',
        'token' => $token,
    ]);
    exit;
}

if ($method === 'DELETE') {
    setcookie('asfi_admin_auth', '', [
        'expires' => time() - 3600,
        'path' => '/',
        'domain' => '',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Logged out.',
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
