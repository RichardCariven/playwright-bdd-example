import { mergeTests } from "@playwright/test";

import { test as localeTest } from "./localeFixture";
import { locatorsFixture } from "./locatorsFixture";

export const test = mergeTests(locatorsFixture, localeTest);
