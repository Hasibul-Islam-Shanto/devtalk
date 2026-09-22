'use server';
import { cookies } from 'next/headers';
import { isSecureCookie } from '@/utils/cookie';
import env from '@/utils/env';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${env.apiBaseUrl}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const cookieStore = await cookies();
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
      return data;
    }
    const responseData = await response.json();
    return {
      success: false,
      message: responseData.message || 'Login failed',
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error logging in. Please try again.',
    };
  }
};

export const logoutFromServer = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(`${env.apiBaseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: cookieStore.get('refreshToken')?.value,
      }),
    });

    if (response.ok) {
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      cookieStore.delete('user');
      return { success: true };
    } else {
      return { success: false, message: 'Logout failed' };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error logging out. Please try again.',
    };
  }
};

export const signup = async (
  name: string,
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await fetch(`${env.apiBaseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, user: data.user };
    } else {
      const responseData = await response.json();
      return {
        success: false,
        message: responseData.message || 'Signup failed',
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'There was an error signing up. Please try again.',
    };
  }
};
