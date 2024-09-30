import { HtmlValidate, type RuleConfig } from "html-validate";
import { cucumberReporter, defineBddConfig } from "playwright-bdd";

import { defineConfig, devices, expect } from "@playwright/test";

import { isAxeResults } from "./tests/support/axe";

const testDir = defineBddConfig({
  paths: ["tests/features/**/*.feature"],
  steps: ["tests/step-definitions/**/*.ts"],
  importTestFrom: "./tests/step-definitions/setup/fixtures.ts",
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir,
  /* Run tests in files in parallel */
  fullyParallel: true,
  expect: {
    timeout: 5000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 6 : undefined,
  /* location for the Snapshot "golden screenshots" if used*/
  snapshotDir: "screenshots",
  snapshotPathTemplate:
    "screenshots/{platform}{/projectName}/{testFilePath}/{arg}{ext}",
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? "blob"
    : [
        ["html"],
        cucumberReporter("html", { outputFile: "cucumber-report/report.html" }),
      ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    screenshot: "only-on-failure",
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "retain-on-failure",
    testIdAttribute: "data-testid",
    headless: true,
    video: "off",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      grep: [/@web/, /@all/],
      name: "Chrome-Desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      grep: [/@web/, /@all/],
      name: "Safari-Desktop",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Iphone",
      grep: [/@mobile/, /@all/],
      use: { ...devices["iPhone XR"] },
    },
    {
      name: "Android-Tablet",
      grep: [/@mobile/, /@all/],
      use: { ...devices["Galaxy Tab S4"] },
    },
  ],
});

expect.extend({
  toHTMLValidate(markup: unknown, config?: { rules?: RuleConfig }) {
    if (typeof markup !== "string") {
      return {
        message: () =>
          'Markup needs to be of type "string" in "expect(markup).toHTMLValidate()"',
        pass: false,
      };
    }

    const htmlValidate = new HtmlValidate({
      extends: [
        "html-validate:recommended",
        "html-validate:document",
        "html-validate:prettier",
      ],
      rules: {
        "require-sri": "off",
        "script-type": "off",
        "attribute-boolean-style": "off",
        "no-inline-style": "off",
        // NOTICE: Rule modified because Next.js add "link" elements for fonts with attribute crossorigin="".
        "attribute-empty-style": ["error", { style: "empty" }],
        ...config?.rules,
      },
    });

    const report = htmlValidate.validateStringSync(markup);

    return {
      message: () =>
        JSON.stringify(
          {
            valid: report.valid,
            warningCount: report.warningCount,
            errorCount: report.errorCount,
            resultsMessages: report.results.map((result) => result.messages),
          },
          null,
          "  ",
        ),
      pass: report.valid,
    };
  },
  toAxeValidate(axeResults: unknown) {
    if (!isAxeResults(axeResults)) {
      return {
        message: () =>
          'AxeResults needs to be of type "AxeResults" in "expect(axeResults).toAxeValidate()"',
        pass: false,
      };
    }

    return {
      message: () => JSON.stringify(axeResults.violations, null, "  "),
      pass: !axeResults.violations.length,
    };
  },
});
