import { createBdd } from "playwright-bdd";

import { expect } from "@playwright/test";

import { type ElementKey } from "../env/global";
import {
  getRandomData,
  type RandomInputType,
} from "../support/random-data-helper";
import { getElementLocator } from "../support/web-element-helper";
import { test } from "./setup/fixtures";

const { When } = createBdd(test);

When(
  "I select the {string} option from the {string} dropdown",
  async ({ page, globalConfig }, option: string, elementKey: ElementKey) => {
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );

    await expect(elementIdentifier).toBeVisible();
    await elementIdentifier.selectOption({ label: option });
  },
);

When(
  "I select the randomly generated {string} option from the {string} dropdown",
  async (
    { page, globalConfig },
    randomOption: RandomInputType,
    elementKey: ElementKey,
  ) => {
    const { elementIdentifier } = getElementLocator(
      page,
      elementKey,
      globalConfig,
    );

    const option = getRandomData(randomOption);
    // todo change below console.log to an alternative way of storing and reporting the random value selected
    // eslint-disable-next-line no-console
    console.log(
      `random data type ${randomOption}, random data value ${option}`,
    );
    await expect(elementIdentifier).toBeVisible();
    await elementIdentifier.selectOption({ label: option });
  },
);
