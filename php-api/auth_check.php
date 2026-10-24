<?php
declare(strict_types=1);

function get_admin_password(): string {
    $envPass = getenv('ADMIN_PASSWORD');
    if ($envPass !== false && trim($envPass) !== '') {
        return trim($envPass);
    }
    return 'asfi2026-!2@';
}

function get_expected_admin_token(): string {
    $secret = get_admin_password();
    return hash('sha256', 'asfi_secure_admin_' . $secret);
}

function is_admin_authenticated(): bool {
    $expected = get_expected_admin_token();

    // Check cookie
    if (!empty($_COOKIE['asfi_admin_auth']) && hash_equals($expected, $_COOKIE['asfi_admin_auth'])) {
        return true;
    }

    // Check Authorization header
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(\S+)/i', $authHeader, $matches)) {
        if (hash_equals($expected, $matches[1])) {
            return true;
        }
    }

    return false;
}
