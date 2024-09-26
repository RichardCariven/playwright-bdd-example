import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { type ElementKey } from "../../env/global";
import { getElementLocator } from "../../support/web-element-helper";
import { test } from "../setup/fixtures";

const { Then } = createBdd(test);

Then(
  "the {string} switch/checkbox/radio_button should( not) be checked",
  async ({ page, $step, globalConfig }, elementKey: ElementKey) => {
    const negate = /should not/.test($step.title);
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );
    await expect(elementIdentifier).toBeVisible();
    if (negate) {
      await expect(elementIdentifier).not.toBeChecked();
    } else {
      await expect(elementIdentifier).toBeChecked();
    }
  },
);
