import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types';

export const localePrefix: LocalePrefix = 'always';
export const DEFAULT_LOCALE = 'en';
export const LOCALES = [
  {
    id: 'en',
    name: 'English',
  },
  { id: 'fr', name: 'Français' },
];
export const AllLocales = LOCALES.map((locale) => locale.id);
