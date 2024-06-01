import { type NextFetchEvent, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AllLocales, DEFAULT_LOCALE, localePrefix } from './i18n';

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix,
  defaultLocale: DEFAULT_LOCALE,
});

export default function middleware(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
