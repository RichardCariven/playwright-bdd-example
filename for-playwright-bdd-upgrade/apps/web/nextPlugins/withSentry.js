const { withSentryConfig } = require(`@sentry/nextjs`);
const chalk = require(`chalk`);

module.exports = (moduleExports) => {
  const enableSentry = !!(
    process.env.NEXT_PUBLIC_SENTRY_DSN &&
    process.env.SENTRY_ORG &&
    process.env.SENTRY_PROJECT &&
    process.env.SENTRY_AUTH_TOKEN
  );

  if (!enableSentry && process.env.NODE_ENV === `production`) {
    // eslint-disable-next-line no-console
    console.info(
      `${chalk.yellow(
        `info`,
      )}  - Sentry not enabled because of insufficient environment variables`,
    );
  }

  return enableSentry
    ? withSentryConfig(
        moduleExports,
        {
          // For all available options, see:
          // https://github.com/getsentry/sentry-webpack-plugin#options

          // Suppresses source map uploading logs during build
          silent: true,

          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
        {
          // For all available options, see:
          // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

          // Upload a larger set of source maps for prettier stack traces (increases build time)
          widenClientFileUpload: true,

          // Hides source maps from generated client bundles
          hideSourceMaps: true,

          // Automatically tree-shake Sentry logger statements to reduce bundle size
          disableLogger: true,
        },
      )
    : moduleExports;
};
