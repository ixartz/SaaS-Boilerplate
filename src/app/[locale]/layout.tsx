import '@/styles/global.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import { DemoBadge } from '@/components/DemoBadge';
import { QueryProvider } from '@/providers/query-client-provider';
import { AllLocales } from '@/utils/AppConfig';

export const metadata: Metadata = {
  title: 'SiteFlow - Construction Project Management',
  description: 'Professional construction project management platform',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#000000',
        },
      }}
    >
      <html lang={props.params.locale} suppressHydrationWarning>
        <head>
          <script
            src="https://widget.cloudinary.com/v2.0/global/all.js"
            type="text/javascript"
            async
          />
        </head>
        <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
          {/* PRO: Dark mode support for Shadcn UI */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider
              locale={props.params.locale}
              messages={messages}
            >
              <QueryProvider>
                {props.children}

                <DemoBadge />
              </QueryProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
