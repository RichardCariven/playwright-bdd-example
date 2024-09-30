module.exports = {
  // NOTICE: We need tsc to run without files option from lint-staged. Make sure we have it as a function.
  "**/*.ts?(x)": () => "tsc --project tsconfig.json --noEmit",
  "*.md": ["prettier --write"],
  // NOTICE: Have eslint and prettier in same glob to avoid concurrency race conditions.
  "*.{ts,tsx,js,json}": ["eslint --fix", "prettier --write"],
};
