import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AllLocales, AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default authMiddleware({
  publicRoutes: (req: NextRequest) =>
    !req.nextUrl.pathname.includes('/dashboard') &&
    !req.nextUrl.pathname.includes('/onboarding'),

  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },

  // eslint-disable-next-line consistent-return
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (
      auth.userId &&
      !auth.orgId &&
      !req.nextUrl.pathname.endsWith('/onboarding/organization-selection')
    ) {
      const organizationSelection = new URL(
        '/onboarding/organization-selection',
        req.url,
      );

      return NextResponse.redirect(organizationSelection);
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
