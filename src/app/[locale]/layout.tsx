import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@/styles/global.css';

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import { GlobalClickTracker } from '@/components/atoms/GlobalClickTracker';
import { theme } from '@/styles/theme';
import { AllLocales } from '@/utils/AppConfig';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Load metadata through the i18n system — works with both local JSON (dev)
  // and Directus CMS (production) as configured in src/libs/i18n.ts
  const [tIndex, tFavicon] = await Promise.all([
    getTranslations({ locale, namespace: 'Index' }),
    getTranslations({ locale, namespace: 'favicon' }),
  ]);

  const faviconUrl = String(tFavicon('url'));
  const faviconSizes = String(tFavicon('sizes'));
  const faviconType = String(tFavicon('type'));

  const resolvedFaviconUrl = faviconUrl.startsWith('http')
    ? faviconUrl
    : `${process.env.BASE_PATH ?? ''}${faviconUrl}`;

  return {
    title: {
      default: tIndex('meta_title'),
      template: `%s | Kaius Mak`,
    },
    description: tIndex('meta_description'),
    icons: [
      {
        rel: 'icon',
        url: resolvedFaviconUrl,
        sizes: faviconSizes,
        type: faviconType,
      },
    ],
    openGraph: {
      title: tIndex('meta_title'),
      description: tIndex('meta_description'),
      type: 'website',
      locale,
    },
  };
}

export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = React.use(props.params);
  setRequestLocale(locale);

  // Using internationalization in Client Components
  const messages = useMessages();

  // The `suppressHydrationWarning` in <html> is used to prevent hydration errors caused by `next-themes`.
  // Solution provided by the package itself: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.
  return (
    <html lang={locale} {...mantineHtmlProps}>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      )}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      )}
      <head>
        <ColorSchemeScript data-mantine-script="true" defaultColorScheme="auto" />
      </head>
      <body suppressHydrationWarning>
        {/* PRO: Dark mode support for Shadcn UI */}
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <MantineProvider defaultColorScheme="auto" theme={theme}>
            {props.children}
          </MantineProvider>
        </NextIntlClientProvider>
        <GlobalClickTracker />
      </body>
    </html>
  );
}
