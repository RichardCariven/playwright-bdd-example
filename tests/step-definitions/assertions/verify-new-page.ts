import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { type PageId } from "../../env/global";
import { getExpectedPageURL } from "../../support/navigation-behaviour";
import { test } from "../setup/fixtures";

const { Then } = createBdd(test);

Then(
  "the {string} page is opened in a new tab",
  async ({ page, globalConfig }, pageId: PageId) => {
    const expectedPageUrl = getExpectedPageURL(pageId, globalConfig);

    const newTabPromise = page.waitForEvent("popup");
    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL(expectedPageUrl);
  },
);
