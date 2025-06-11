'use client';

import { enUS, frFR } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { useParams } from 'next/navigation';

import { AppConfig } from '@/utils/AppConfig';

export default function AuthLayout(props: {
  children: React.ReactNode;
}) {
  const params = useParams<{ locale: string }>();

  let clerkLocale = enUS;
  let signInUrl = '/sign-in';
  let signUpUrl = '/sign-up';
  let dashboardUrl = '/dashboard';
  let afterSignOutUrl = '/';

  if (params.locale === 'fr') {
    clerkLocale = frFR;
  }

  if (params.locale !== AppConfig.defaultLocale) {
    signInUrl = `/${params.locale}${signInUrl}`;
    signUpUrl = `/${params.locale}${signUpUrl}`;
    dashboardUrl = `/${params.locale}${dashboardUrl}`;
    afterSignOutUrl = `/${params.locale}${afterSignOutUrl}`;
  }

  return (
    <ClerkProvider
      // PRO: Dark mode support for Clerk
      localization={clerkLocale}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      signInFallbackRedirectUrl={dashboardUrl}
      signUpFallbackRedirectUrl={dashboardUrl}
      afterSignOutUrl={afterSignOutUrl}
    >
      {props.children}
    </ClerkProvider>
  );
}
