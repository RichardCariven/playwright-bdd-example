module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  extends: ["eslint:recommended", "plugin:json/recommended-legacy", "prettier"],
  rules: {
    "no-console": ["error", { allow: ["error"] }],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/strict",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "no-console": ["error", { allow: ["error"] }],
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", ignoreRestSiblings: true },
        ],
        "@typescript-eslint/no-misused-promises": [
          2,
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          { prefer: "type-imports", fixStyle: "inline-type-imports" },
        ],
      },
    },
  ],
  ignorePatterns: ["node_modules/", "**/.eslintrc.js", "dist/"],
};
