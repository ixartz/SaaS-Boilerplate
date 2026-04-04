import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@/styles/global.css';

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { GlobalClickTracker } from '@/components/atoms/GlobalClickTracker';
import { theme } from '@/styles/theme';
import { AllLocales } from '@/utils/AppConfig';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = await import(`@/locales/${params.locale}.json`).then(
    module => module.default,
  );

  const faviconConfig = messages.favicon || {
    url: '/favicon.ico',
    sizes: 'any',
    type: 'image/x-icon',
  };

  // Support both remote URLs (http/https) and local paths
  const faviconUrl = faviconConfig.url.startsWith('http')
    ? faviconConfig.url
    : `${process.env.BASE_PATH ? process.env.BASE_PATH : ''}${faviconConfig.url}`;

  return {
    icons: [
      {
        rel: 'icon',
        url: faviconUrl,
        sizes: faviconConfig.sizes,
        type: faviconConfig.type,
      },
    ],
  };
}

export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  // Using internationalization in Client Components
  const messages = useMessages();

  // The `suppressHydrationWarning` in <html> is used to prevent hydration errors caused by `next-themes`.
  // Solution provided by the package itself: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.
  return (
    <html lang={props.params.locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body suppressHydrationWarning>
        {/* PRO: Dark mode support for Shadcn UI */}
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          <MantineProvider defaultColorScheme="auto" theme={theme}>
            {props.children}
          </MantineProvider>
        </NextIntlClientProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <GlobalClickTracker />
      </body>
    </html>
  );
}
