import type {
  NextRequest,
} from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AllLocales, AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default function middleware(
  request: NextRequest,
) {
  // Skip intl middleware for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return;
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all routes except static files, _next, and monitoring
  matcher: ['/((?!.+\\.[\\w]+$|_next|monitoring).*)', '/', '/(api|trpc)(.*)'],
};
