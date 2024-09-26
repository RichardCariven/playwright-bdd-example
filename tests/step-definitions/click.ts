import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { type ElementKey } from "../env/global";
import { getElementLocator } from "../support/web-element-helper";
import { test } from "./setup/fixtures";

const { When } = createBdd(test);

When(
  "I click the {string} button/link/dropdown/input/field",
  async ({ page, globalConfig }, elementKey: ElementKey) => {
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );
    await expect(elementIdentifier).toBeVisible();
    await elementIdentifier.click();
  },
);
