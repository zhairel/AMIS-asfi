import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'asfi2026';

    if (!password || password !== adminPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid administrative password.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Admin authenticated successfully.',
    });

    // Set simple admin session cookie (lasts 7 days)
    response.cookies.set({
      name: 'asfi_admin_auth',
      value: 'authenticated_session_token',
      httpOnly: false, // accessible to client for fast route check
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Authentication error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out.' });
  response.cookies.delete('asfi_admin_auth');
  return response;
}
