import { DEFAULT_LOCALE } from './config';
import { en } from './locales/en';
import { es } from './locales/es';

export const dictionaries = { en, es };

export const getDictionary = (locale) =>
  dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
