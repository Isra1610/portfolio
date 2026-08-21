import { cookies, headers } from 'next/headers';
import { LOCALE_COOKIE, resolveLocale } from './config';

// Locale for the current request: explicit choice (cookie) first,
// browser preference (Accept-Language) second, English as fallback.
export const getRequestLocale = async () => {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);

  return resolveLocale(
    cookieStore.get(LOCALE_COOKIE)?.value,
    headerStore.get('accept-language')
  );
};
