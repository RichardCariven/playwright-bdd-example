import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { type ElementKey } from "../../env/global";
import { getElementLocator } from "../../support/web-element-helper";
import { test } from "../setup/fixtures";

const { Then } = createBdd(test);

Then(
  "the {string} field should contain the text {string}",
  async (
    { page, globalConfig },
    elementKey: ElementKey,
    expectedText: string,
  ) => {
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );
    await expect(elementIdentifier).toBeVisible();
    await expect(elementIdentifier).toHaveValue(expectedText);
  },
);

Then(
  "the {string} message should contain the text {string}",
  async (
    { page, globalConfig },
    elementKey: ElementKey,
    expectedText: string,
  ) => {
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );
    await expect(elementIdentifier).toBeVisible();
    await expect(elementIdentifier).toHaveText(expectedText);
  },
);
