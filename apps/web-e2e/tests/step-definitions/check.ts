import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { type ElementKey } from "../env/global";
import { getElementLocator } from "../support/web-element-helper";
import { test } from "./setup/fixtures";

const { When } = createBdd(test);

When(
  "I (un)check the {string} checkbox/switch/radio_button",
  async ({ page, globalConfig, $step }, elementKey: ElementKey) => {
    const negate = /uncheck/.test($step.title);
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );
    await expect(elementIdentifier).toBeVisible();
    if (negate) {
      await elementIdentifier.uncheck();
      await expect(elementIdentifier).not.toBeChecked();
    } else {
      await elementIdentifier.check();
      await expect(elementIdentifier).toBeChecked();
    }
  },
);
