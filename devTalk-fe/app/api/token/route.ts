import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { isSecureCookie } from '@/utils/cookie';
import env from '@/utils/env';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || null;
  const refreshToken = cookieStore.get('refreshToken')?.value || null;

  const isTokenExpired = (token: string) => {
    try {
      const [, payload] = token.split('.');
      if (!payload) return true;
      const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  try {
    if (!accessToken || isTokenExpired(accessToken)) {
      if (!refreshToken) {
        return NextResponse.json({
          success: false,
          message: 'No tokens found',
        });
      }
      const response = await fetch(`${env.apiBaseUrl}/api/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          '❌ Failed to refresh token:',
          errorData.message || 'Unknown error',
        );

        return NextResponse.json({
          success: false,
          message: errorData.message || 'Failed to refresh token',
        });
      }

      const data = await response.json();

      cookieStore.set('accessToken', data.tokens.accessToken, {
        httpOnly: true,
        secure: isSecureCookie,
        maxAge: 60 * 60,
      });

      cookieStore.set('refreshToken', data.tokens.refreshToken, {
        httpOnly: true,
        secure: isSecureCookie,
        maxAge: 60 * 60 * 24 * 30,
      });

      return NextResponse.json({
        success: true,
        token: data.tokens.accessToken,
        message: 'Token refreshed successfully',
      });
    } else {
      return NextResponse.json({
        success: true,
        token: accessToken,
        message: 'Access token is valid',
      });
    }
  } catch (error) {
    console.error('❌ Error in token route:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    });
  }
}
