import type { LocalizationResource } from '@clerk/shared/types';
import type { LocalePrefixMode } from 'next-intl/routing';
import type { AppLocale } from '@/types/I18n';
import { enUS, frFR } from '@clerk/localizations';

/** Locale prefix strategy for next-intl routing. */
const localePrefix: LocalePrefixMode = 'as-needed';
const locales = [
  {
    id: 'en',
    name: 'English',
  },
  {
    id: 'fr',
    name: 'Français',
  },
] satisfies AppLocale[];

// FIXME: Customize this configuration for your product
/** Centralized application configuration */
export const AppConfig = {
  name: 'SaaS Template',
  i18n: {
    locales,
    defaultLocale: 'en',
    localePrefix,
  },
  email: {
    support: 'contact@nextjs-boilerplate.com',
  },
} as const;

const supportedLocales: Record<string, LocalizationResource> = {
  en: enUS,
  fr: frFR,
};

export const ClerkLocalizations = {
  defaultLocale: enUS,
  supportedLocales,
};

export const AllLocales = AppConfig.i18n.locales.map(locale => locale.id);
