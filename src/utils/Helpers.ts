import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { DEFAULT_LOCALE } from '@/i18n';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const IS_DEV = process.env.NODE_ENV === 'development';

export const MILLISECONDS_IN_ONE_DAY = 86_400_000;

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === DEFAULT_LOCALE) {
    return url;
  }

  return `/${locale}${url}`;
};
