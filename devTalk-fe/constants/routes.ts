export const PUBLIC_ROUTES = ['/', '/questions', '/blogs', '/jobs'];
export const AUTH_ROUTES = ['/signin', '/signup', '/forgot-password'];
export const PROTECTED_ROUTES = [
  '/blogs/create',
  '/questions/create',
  '/jobs/create',
  '/profile',
  '/settings',
];
export const EXCLUDED_ROUTES = [
  '/api',
  '/_next',
  '/favicon.ico',
  '/images',
  '/fonts',
];
export const DEFAULT_LOGIN_REDIRECT = '/';
export const DEFAULT_SIGNIN_REDIRECT = '/signin';
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => {
    if (pathname === route) return true;
    if (pathname.startsWith(route + '/')) return true;
    return false;
  });
}

export function isPublicRoute(pathname: string): boolean {
  if (isProtectedRoute(pathname)) return false;

  return PUBLIC_ROUTES.some(route => {
    if (pathname === route) return true;
    if (route !== '/' && pathname.startsWith(route + '/')) return true;
    return false;
  });
}

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(route => pathname.startsWith(route));
}

export function isExcludedRoute(pathname: string): boolean {
  return EXCLUDED_ROUTES.some(route => pathname.startsWith(route));
}
