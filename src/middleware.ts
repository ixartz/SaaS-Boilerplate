import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AllLocales, AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/:locale/dashboard(.*)',
  '/onboarding(.*)',
  '/:locale/onboarding(.*)',
  '/api/projects(.*)',
  '/api/categories(.*)',
  '/api/tasks(.*)',
  '/api/daily-logs(.*)',
  '/api/transactions(.*)',
  '/api/share-links(.*)',
  '/api/media-assets(.*)',
  '/:locale/api/projects(.*)',
  '/:locale/api/categories(.*)',
  '/:locale/api/tasks(.*)',
  '/:locale/api/daily-logs(.*)',
  '/:locale/api/transactions(.*)',
  '/:locale/api/share-links(.*)',
  '/:locale/api/media-assets(.*)',
]);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // Skip auth for public API endpoints
  if (
    request.nextUrl.pathname === '/api/health'
    || request.nextUrl.pathname === '/api/test'
    || request.nextUrl.pathname === '/api/v1/_rbac-check'
    || request.nextUrl.pathname === '/api/v1/mock-rbac'
    || request.nextUrl.pathname === '/api/v1/test-rbac'
  ) {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname.includes('/sign-in')
    || request.nextUrl.pathname.includes('/sign-up')
    || isProtectedRoute(request)
  ) {
    return clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        const locale
          = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';

        const signInUrl = new URL(`${locale}/sign-in`, req.url);

        await auth.protect({
          // `unauthenticatedUrl` is needed to avoid error: "Unable to find `next-intl` locale because the middleware didn't run on this request"
          unauthenticatedUrl: signInUrl.toString(),
        });
      }

      const authObj = await auth();

      if (
        authObj.userId
        && !authObj.orgId
        && req.nextUrl.pathname.includes('/dashboard')
        && !req.nextUrl.pathname.endsWith('/organization-selection')
      ) {
        const orgSelection = new URL(
          '/onboarding/organization-selection',
          req.url,
        );

        return NextResponse.redirect(orgSelection);
      }

      return intlMiddleware(req);
    })(request, event);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|monitoring).*)', '/'], // Include API routes but exclude specific ones in isProtectedRoute
};
