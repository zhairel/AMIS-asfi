import { NextRequest } from 'next/server';
import crypto from 'crypto';

/**
 * Returns a cryptographically deterministic session token derived from the admin password.
 */
export function getExpectedAdminToken(): string {
  const secret = process.env.ADMIN_PASSWORD || 'asfi2026-!2@';
  return crypto.createHash('sha256').update(`asfi_secure_admin_${secret}`).digest('hex');
}

/**
 * Verifies if the incoming request has a valid admin session cookie or Authorization header.
 */
export function isAuthenticatedAdmin(req: NextRequest): boolean {
  const cookieToken = req.cookies.get('asfi_admin_auth')?.value;
  const headerToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  const expectedToken = getExpectedAdminToken();

  return cookieToken === expectedToken || headerToken === expectedToken;
}
