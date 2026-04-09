import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { AllLocales } from '@/utils/AppConfig';

// NextJS Boilerplate uses Crowdin as the localization software.
// As a developer, you only need to take care of the English (or another default language) version.
// Other languages are automatically generated and handled by Crowdin.

// The localisation files are synced with Crowdin using GitHub Actions.
// By default, there are 3 ways to sync the message files:
// 1. Automatically sync on push to the `main` branch
// 2. Run manually the workflow on GitHub Actions
// 3. Every 24 hours at 5am, the workflow will run automatically

// Using internationalization in Server Components
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !AllLocales.includes(locale)) {
    notFound();
  }

  if (process.env.NODE_ENV === 'development') {
    return {
      locale,
      messages: (await import(`../locales/${locale}.json`)).default,
    };
  } else if (process.env.NODE_ENV === 'production' && process.env.DIRECTUS_HOST) {
    const directusMessages = await fetch(`${process.env.DIRECTUS_HOST}/items/portfolio`).then((res) => {
      return res.json().then(result => result.data?.[0]?.content ?? {});
    }).catch((err) => {
      console.error('Failed to fetch messages from Directus', err);
      return {};
    });

    // Load fallback messages from locale file for missing keys
    let fallbackMessages = {};
    try {
      fallbackMessages = (await import(`../locales/${locale}.json`)).default;
    } catch {
      // Fallback file not available
    }

    // Merge Directus messages with fallback, Directus takes precedence
    const messages = { ...fallbackMessages, ...directusMessages };

    return { locale, messages };
  }
  return { locale, messages: {} };
});
