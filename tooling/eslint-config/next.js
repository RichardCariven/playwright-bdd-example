module.exports = {
  root: true,
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  extends: [
    "next/core-web-vitals",
    "turbo",
    "eslint:recommended",
    "plugin:json/recommended-legacy",
    "prettier",
  ],
  rules: {
    "no-console": ["error", { allow: ["error"] }],
    "@next/next/no-html-link-for-pages": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "next/core-web-vitals",
        "turbo",
        "eslint:recommended",
        "plugin:storybook/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/strict",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "no-console": ["error", { allow: ["error"] }],
        "@next/next/no-html-link-for-pages": "off",
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports", fixStyle: "inline-type-imports" },
        ],
        "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-misused-promises": [
          2,
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
      },
    },
  ],
};
