import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { type ElementKey } from "../../env/global";
import { getElementLocator } from "../../support/web-element-helper";
import { test } from "../setup/fixtures";

const { Then } = createBdd(test);

Then(
  "the {string} dropdown should contain number of values {int}",
  async (
    { page, globalConfig },
    elementKey: ElementKey,
    number_values: number,
  ) => {
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );
    await expect(elementIdentifier).toBeVisible();
    const elementList = elementIdentifier.getByRole("option");
    await expect(elementList).toHaveCount(number_values);
  },
);

Then(
  "the {string} dropdown should contain the values {string}",
  async ({ page, globalConfig }, elementKey: ElementKey, list: string) => {
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );
    await expect(elementIdentifier).toBeVisible();
    const values = list.split(",");
    const elementList = elementIdentifier.getByRole("option");
    await expect(elementList).toHaveText(values);
  },
);

Then(
  "the {string} dropdown should have the value {string} selected",
  async ({ page, globalConfig }, elementKey: ElementKey, value: string) => {
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );
    await expect(elementIdentifier).toBeVisible();
    await expect(elementIdentifier).toHaveValue(value);
  },
);
