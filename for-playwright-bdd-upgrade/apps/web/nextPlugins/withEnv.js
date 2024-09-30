// NOTICE: Chalk version 4.x needed. Version 5 is ESM and not supported in next.config file yet.
const chalk = require("chalk");
const dotenv = require("dotenv");
const path = require("path");

// NOTICE: This file will run via the Storybook "@storybook/nextjs" framework plugin. However, the dotenv variables will
// not be passed down via the Storybook webpack build to the actual stories (by Storybook security design). There is
// instead some logic in ".storybook/main" to apply dotenv variables.

const applyEnvFile = (branch) => {
  const file =
    branch === "main" ? ".env.vercel.production" : ".env.vercel.preview";
  const dotenvPath = path.resolve(process.cwd(), file);
  const result = dotenv.config({ path: dotenvPath });
  if (result.error) {
    throw result.error;
  }
  // eslint-disable-next-line no-console
  console.info(`- ${chalk.cyan("info")} Loaded env from ${dotenvPath}`);
};

module.exports = (nextConfig = {}) => {
  // Get branch from Vercel environment variable. Fallback to "unknown" if building the application somewhere else
  // (most likely local).
  const branch = process.env.VERCEL_GIT_COMMIT_REF || "unknown";

  // Apply dot env files based on environment if building for production.
  // NOTICE: Next.js will apply ".env.development" automatically when running "next dev".
  if (process.env.NODE_ENV === "production") {
    applyEnvFile(branch);
  }

  // Custom envs.
  const env = {
    NEXT_PUBLIC_ENV: branch,
  };

  // Return config.
  return { ...nextConfig, env };
};
