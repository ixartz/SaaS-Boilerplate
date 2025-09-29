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
  '/api/v1/projects(.*)',
  '/api/v1/categories(.*)',
  '/api/v1/tasks(.*)',
  '/api/v1/daily-logs(.*)',
  '/api/v1/daily-log-tasks(.*)',
  '/api/v1/transactions(.*)',
  '/api/v1/share-links(.*)',
  '/api/v1/media-assets(.*)',
]);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // Skip intl middleware for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Skip auth for public API endpoints
    if (
      request.nextUrl.pathname === '/api/health'
      || request.nextUrl.pathname === '/api/v1/_rbac-check'
    ) {
      return NextResponse.next();
    }

    // Handle protected API routes
    if (isProtectedRoute(request)) {
      return clerkMiddleware(async (auth, req) => {
        // For API routes, return 401 JSON instead of redirect
        if (req.nextUrl.pathname.startsWith('/api/')) {
          const authObj = await auth();
          if (!authObj.userId) {
            return new NextResponse(
              JSON.stringify({
                type: 'about:blank',
                title: 'Unauthorized',
                status: 401,
                detail: 'Authentication required',
              }),
              {
                status: 401,
                headers: {
                  'Content-Type': 'application/problem+json',
                },
              },
            );
          }
        }
        return NextResponse.next();
      })(request, event);
    }

    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname.includes('/sign-in')
    || request.nextUrl.pathname.includes('/sign-up')
    || isProtectedRoute(request)
  ) {
    return clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        // For web routes, redirect to sign-in
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
