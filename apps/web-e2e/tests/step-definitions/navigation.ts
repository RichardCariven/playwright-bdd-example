import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { type PageId } from "../env/global";
import {
  getExpectedPageURL,
  navigateToPage,
} from "../support/navigation-behaviour";
import { test } from "./setup/fixtures";

const { Given, Then, When } = createBdd(test);

Given(
  "I am on the {string} Page",
  async ({ page, globalConfig }, pageId: PageId) => {
    await navigateToPage(page, pageId, globalConfig);

    const expectedPageUrl = getExpectedPageURL(pageId, globalConfig);

    try {
      await expect(page).toHaveURL(expectedPageUrl, { timeout: 30000 });
    } catch (error) {
      throw Error(
        `🧨 page '${page.url()}' does not match expected '${expectedPageUrl}' 🧨`,
      );
    }
  },
);

const confirmpageURL = Then(
  "I am directed/kept to/on the {string} Page",
  async ({ page, globalConfig }, pageId: PageId) => {
    const expectedPageUrl = getExpectedPageURL(pageId, globalConfig);
    try {
      await expect(page).toHaveURL(expectedPageUrl, { timeout: 30000 });
    } catch (error) {
      throw Error(
        `🧨 page '${page.url()}' does not match expected '${expectedPageUrl}' 🧨`,
      );
    }
  },
);

Then(
  "I should be on the page {string}",
  async ({ page, globalConfig }, pageId: PageId) => {
    await confirmpageURL({ page, globalConfig }, pageId);
  },
);

When(
  "I refresh the {string} Page",
  async ({ page, globalConfig }, pageId: PageId) => {
    await page.reload();

    const expectedPageUrl = getExpectedPageURL(pageId, globalConfig);
    try {
      await expect(page).toHaveURL(expectedPageUrl, { timeout: 30000 });
    } catch (error) {
      throw Error(
        `🧨 page '${page.url()}' does not match expected '${expectedPageUrl}' 🧨`,
      );
    }
  },
);
