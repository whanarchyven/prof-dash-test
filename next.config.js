const SENTRY_PROJECT = process.env.SENTRY_PROJECT;
const SENTRY_ENABLED = Boolean(Number(process.env.ENABLE_SENTRY));

const moduleExports = {
  reactStrictMode: false,
  images: {
    unoptimized: Boolean(Number(process.env.UNOPTIMIZED_IMAGES)),
    deviceSizes: [767, 980, 1156, 1400, 1920],
    formats: ['image/webp'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
module.exports = moduleExports;

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

if (SENTRY_ENABLED) {
  module.exports = withSentryConfig(
    module.exports,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,
      org: 'oxem-studio',
      project: SENTRY_PROJECT,
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      // Enables automatic instrumentation of Vercel Cron Monitors.
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    }
  );
}
