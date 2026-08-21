"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, isSupportedLocale, LOCALE_COOKIE } from "@/utils/i18n/config";
import { getDictionary } from "@/utils/i18n/dictionaries";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

const LanguageContext = createContext(null);

function LanguageProvider({ initialLocale = DEFAULT_LOCALE, children }) {
  const [locale, setLocaleState] = useState(
    isSupportedLocale(initialLocale) ? initialLocale : DEFAULT_LOCALE
  );

  // Keep <html lang> in sync so screen readers and crawlers see the real locale.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((nextLocale) => {
    if (!isSupportedLocale(nextLocale)) return;

    setLocaleState(nextLocale);
    // Persisted so the server can render the right locale on the next visit.
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, t: getDictionary(locale) }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }

  return context;
};

export default LanguageProvider;
