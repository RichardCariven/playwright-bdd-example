/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve("@rayo/eslint/node")],
  root: true,
  ignorePatterns: ["src/schemas/*"],
};
