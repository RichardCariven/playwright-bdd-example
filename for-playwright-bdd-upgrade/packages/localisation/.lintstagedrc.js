module.exports = {
  // NOTICE: Have eslint and prettier in same glob to avoid concurrency race conditions.
  "*.{ts,tsx}": () => "tsc",
  "*.{js,ts,tsx}": ["jest --bail --findRelatedTests --passWithNoTests"],
  "*.{ts,tsx,js,json}": ["eslint --fix", "prettier --write"],
};
