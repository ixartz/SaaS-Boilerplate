import { fileURLToPath } from 'node:url';

import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createJiti from 'jiti';
import withNextIntl from 'next-intl/plugin';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/libs/Env');

const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['@electric-sql/pglite'],
  },
  // Performance optimizations for development
  swcMinify: true,
  compress: true,
  // Disable source maps in development for faster builds
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = false;
      // Optimize webpack cache for large strings
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        maxAge: 86400000, // 24 hours
        compression: 'gzip',
        // Optimize for large strings serialization
        serialization: {
          'webpack/lib/cache/PackFileCacheStrategy': {
            buffer: true,
          },
        },
      };
    }
    return config;
  },
};

export default process.env.NODE_ENV === 'production' 
  ? withSentryConfig(bundleAnalyzer(withNextIntlConfig(nextConfig)), {
      org: 'nextjs-boilerplate-org',
      project: 'nextjs-boilerplate',
      silent: !process.env.CI,
      widenClientFileUpload: true,
      tunnelRoute: '/monitoring',
      hideSourceMaps: true,
      disableLogger: true,
      automaticVercelMonitors: true,
      telemetry: false,
    })
  : withNextIntlConfig(nextConfig);
