export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const DEFAULT_LOCALE = 'en';

export const locales = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
];

export const localeCodes = locales.map((locale) => locale.code);

export const isSupportedLocale = (locale) => localeCodes.includes(locale);

// Parses an Accept-Language header ("es-VE,es;q=0.9,en;q=0.8") and returns the
// best supported match, comparing only the primary subtag (es-VE -> es).
const matchAcceptLanguage = (acceptLanguage) => {
  if (!acceptLanguage) return null;

  const preferences = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const quality = params
        .map((param) => param.trim())
        .find((param) => param.startsWith('q='));

      return {
        tag: tag.trim().toLowerCase(),
        quality: quality ? parseFloat(quality.slice(2)) : 1,
      };
    })
    .filter((preference) => preference.tag && !Number.isNaN(preference.quality))
    .sort((a, b) => b.quality - a.quality);

  for (const preference of preferences) {
    const primary = preference.tag.split('-')[0];
    if (isSupportedLocale(primary)) return primary;
  }

  return null;
};

// Cookie (explicit user choice) wins over the browser preference.
export const resolveLocale = (cookieLocale, acceptLanguage) => {
  if (isSupportedLocale(cookieLocale)) return cookieLocale;
  return matchAcceptLanguage(acceptLanguage) || DEFAULT_LOCALE;
};
