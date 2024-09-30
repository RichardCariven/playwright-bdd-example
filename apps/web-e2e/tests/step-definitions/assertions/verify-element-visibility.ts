import { createBdd } from "playwright-bdd";

import { type DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { type ElementKey } from "../../env/global";
import { getElementLocator } from "../../support/web-element-helper";
import { test } from "../setup/fixtures";

const { Then } = createBdd(test);

Then(
  "the {string} button/field/link/dropdown/menu should( not) be displayed",
  async ({ page, $step, globalConfig }, elementKey: ElementKey) => {
    const negate = /should not/.test($step.title);
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );

    if (negate) {
      await expect(elementIdentifier).not.toBeVisible();
    } else {
      await expect(elementIdentifier).toBeVisible();
    }
  },
);

const confirmPageText = Then(
  "the text {string} should( not) be displayed",
  async ({ page, $step }, text: string) => {
    const negate = /should not/.test($step.title);
    if (negate) {
      await expect(page.getByText(text, { exact: true })).not.toBeVisible();
    } else {
      await expect(page.getByText(text, { exact: true })).toBeVisible();
    }
  },
);

Then(
  "I should( not) see the error message {string}",
  async ({ page, $step }, errormessage: string) => {
    await confirmPageText({ page, $step }, errormessage);
  },
);

Then(
  "the text should be visible on the page",
  async ({ page }, data: DataTable) => {
    await Promise.all(
      data.rows().map(async (value) => {
        await expect(page.getByText(value[0], { exact: true })).toBeVisible();
      }),
    );
  },
);
