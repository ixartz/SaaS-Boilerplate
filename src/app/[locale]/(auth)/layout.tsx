import { enUS, frFR } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';

import { AppConfig } from '@/utils/AppConfig';

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
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
