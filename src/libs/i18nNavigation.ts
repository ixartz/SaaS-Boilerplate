import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { AllLocales, AppConfig } from '@/utils/AppConfig';

export const routing = defineRouting({
  locales: AllLocales,
  defaultLocale: AppConfig.defaultLocale,
  localePrefix: AppConfig.localePrefix,
});

export const { usePathname, useRouter, Link, redirect } = createNavigation(routing);
