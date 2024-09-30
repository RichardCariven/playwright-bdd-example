import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { type ElementKey } from "../env/global";
import {
  getRandomData,
  type RandomInputType,
} from "../support/random-data-helper";
import { getElementLocator } from "../support/web-element-helper";
import { test } from "./setup/fixtures";

const { Then, When } = createBdd(test);

Then(
  "I fill in the {string} input with {string}",
  async ({ page, globalConfig }, elementKey: ElementKey, input: string) => {
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );

    await expect(elementIdentifier).toBeVisible();
    await elementIdentifier.fill(input);
    await elementIdentifier.blur();
  },
);

When(
  "I fill in the {string} input/field with a randomly generated {string}",
  async (
    { page, globalConfig },
    elementKey: ElementKey,
    dataType: RandomInputType,
  ) => {
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );

    const input = getRandomData(dataType);
    // todo change below console.log to an alternative way of storing and reporting the random value selected
    console.log(`random data type ${dataType}, random data value ${input}`); // eslint-disable-line
    await expect(elementIdentifier).toBeVisible();
    await elementIdentifier.fill(input);
    await elementIdentifier.blur();
  },
);
