import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createJiti from 'jiti';
import withNextIntl from 'next-intl/plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/libs/Env');

const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Filter out reserved Next.js environment variables for the env config
/** @returns {Record<string, string>} */
const getFilteredEnv = () => {
  const reservedPrefixes = ['NEXT_PUBLIC_', 'NEXT_', 'VERCEL', '__NEXT'];
  const reservedKeys = ['NODE_ENV'];
  /** @type {Record<string, string>} */
  const filteredEnv = {};

  for (const [key, value] of Object.entries(process.env)) {
    if (typeof value !== 'string') {
      continue;
    }
    if (reservedKeys.includes(key)) {
      continue;
    }
    if (reservedPrefixes.some(prefix => key === prefix || key.startsWith(prefix))) {
      continue;
    }
    filteredEnv[key] = value;
  }

  return filteredEnv;
};

// Get IMAGE_DOMAINS for image configuration
const imageDomains = process.env.IMAGE_DOMAINS ? process.env.IMAGE_DOMAINS.split(',') : [];
const imageRemotePatterns = imageDomains.map(domain => ({
  protocol: 'https',
  hostname: domain.trim(),
  pathname: '/**',
}));

/** @type {import('next').NextConfig} */
export default withSentryConfig(
  bundleAnalyzer(
    withNextIntlConfig({
      basePath: process.env.BASE_PATH || '',
      assetPrefix: process.env.BASE_PATH || '',
      output: 'standalone',
      poweredByHeader: false,
      reactStrictMode: true,
      serverExternalPackages: ['@electric-sql/pglite'],
      sassOptions: {
        implementation: 'sass-embedded',
        loadPaths: [__dirname],
        additionalData: `@use "_mantine" as *;`,
      },

      images: {
        // @ts-expect-error - Next.js type inference issue with remotePatterns
        remotePatterns: imageRemotePatterns,
      },

      // Pass filtered environment variables from parent process (Fastify server)
      env: getFilteredEnv(),
    }),
  ),
  {
    org: 'nextjs-boilerplate-org',
    project: 'nextjs-boilerplate',
    silent: !process.env.CI,
    widenClientFileUpload: true,
    tunnelRoute: '/monitoring',
    sourcemaps: {
      disable: true,
    },
    disableLogger: true,
    automaticVercelMonitors: true,
    telemetry: false,
  },
);
