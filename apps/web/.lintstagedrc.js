const path = require("path");

/**
 * We need to construct the "next lint" command to make it work.
 * See https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged
 */
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  // NOTICE: We need tsc to run without files option from lint-staged. Make sure we have it as a function.
  "**/*.ts?(x)": () => "tsc --project tsconfig.json --noEmit",
  "*.{ts,tsx,js}": ["jest --bail --findRelatedTests --passWithNoTests"],
  "*.md": ["prettier --write"],
  // NOTICE: Have eslint and prettier in same glob to avoid concurrency race conditions.
  "*.{ts,tsx,js,json}": [buildEslintCommand, "prettier --write"],
};
