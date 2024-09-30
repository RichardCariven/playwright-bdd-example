import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { test } from "../setup/fixtures";

const { Then } = createBdd(test);

Then(
  "the language attribute value should be {string}",
  async ({ page }, expectedLang: string) => {
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe(expectedLang);
  },
);
