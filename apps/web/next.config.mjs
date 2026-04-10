import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createJiti from 'jiti';
import withNextIntl from 'next-intl/plugin';

// const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/libs/Env'); // Initialize environment variables

const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

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
      // output: 'standalone',
      // cacheHandler: require.resolve('@trieb.work/nextjs-turbo-redis-cache'),
      basePath: process.env.BASE_PATH,
      assetPrefix: process.env.BASE_PATH && process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}${process.env.BASE_PATH || ''}` : undefined,
      // Note: 'standalone' output is NOT used because we have a custom Fastify server
      // that integrates Next.js via getRequestHandler(). The standalone output
      // creates a separate server.js that cannot be integrated into a custom server.
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
      // env: getFilteredEnv(),
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
