import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { AllLocales, localePrefix } from '@/i18n';

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AllLocales,
  localePrefix,
});
