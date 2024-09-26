import { configureAxe, injectAxe, type getAxeResults } from "axe-playwright";

import { type Page } from "@playwright/test";

export const injectAndConfigureAxe = async (page: Page) => {
  // NOTICE: Inject axe needs to be called after "page.goto()" and before checking axe results.
  await injectAxe(page);
  await configureAxe(page, {
    rules: [
      {
        id: "color-contrast",
        // This will disable the "color-contrast" rule for elements that match the selector.
        selector: '*:not([data-ignore-a11y*="color-contrast"])',
      },
    ],
  });
};

export const isAxeResults = (
  value: unknown,
): value is Awaited<ReturnType<typeof getAxeResults>> => {
  if (!value || typeof value !== "object") {
    return false;
  }
  return "violations" in value;
};
