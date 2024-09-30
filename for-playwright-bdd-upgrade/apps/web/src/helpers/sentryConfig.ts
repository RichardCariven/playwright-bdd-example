import * as Sentry from "@sentry/nextjs";

export const getCleanEnvironmentName = (branch: string): string => {
  // The environment name can't contain newlines, spaces or forward slashes, can't be the string "None",
  // or exceed 64 characters.
  return branch.replace(`/`, `:`).substring(0, Math.min(branch.length, 64));
};

export const initSentry = (): void => {
  const branch =
    process.env.VERCEL_GIT_COMMIT_REF ?? process.env.NEXT_PUBLIC_ENV;
  Sentry.init({
    dsn:
      process.env.SENTRY_DSN ??
      process.env.NEXT_PUBLIC_SENTRY_DSN ??
      "https://c69b2651152ae04dc9b03cc7c2f6b321@o4506660126523392.ingest.us.sentry.io/4506910260396032",
    environment: branch
      ? getCleanEnvironmentName(branch)
      : process.env.NODE_ENV,
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Or if we want to filter events based on context
    // https://docs.sentry.io/platforms/javascript/configuration/sampling/#setting-a-sampling-function
    // tracesSampler: (_samplingContext) => {
    //   if ("...") {
    //     // These are important - take a big sample
    //     return 1;
    //   } else if ("...") {
    //     // These are less important or happen much more frequently - only take 1%
    //     return 0.01;
    //   } else if ("...") {
    //     // These aren't something worth tracking - drop all transactions like this
    //     return 0;
    //   } else {
    //     // Default sample rate
    //     return 0.5;
    //   }
    // },

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
};
