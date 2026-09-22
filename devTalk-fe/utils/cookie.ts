export const isSecureCookie =
  process.env.COOKIE_SECURE === 'true'
    ? true
    : process.env.COOKIE_SECURE === 'false'
      ? false
      : process.env.NODE_ENV === 'production';
