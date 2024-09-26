import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { test } from "../setup/fixtures";

const { Then } = createBdd(test);

Then(
  "the Screenshot for the {string} screen should match the stored image",
  async ({ page }, screenshot_name: string) => {
    await expect
      .soft(page, `${screenshot_name} Screenshot match failed`)
      .toHaveScreenshot(`${screenshot_name}.png`, { fullPage: true });
  },
);
