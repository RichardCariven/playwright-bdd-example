import type { Locator, Page } from "@playwright/test";

import type { ElementKey, GlobalConfig } from "../env/global";
import { getCurrentPageId } from "./navigation-behaviour";

export const getElementLocator = (
  page: Page,
  elementKey: ElementKey,
  globalConfig: GlobalConfig,
): { elementIdentifier: Locator; elementType: string } => {
  const { pages, commonElements } = globalConfig;

  const currentPage = getCurrentPageId(page, globalConfig);

  const elementMap =
    pages[currentPage]?.elements?.[elementKey] || commonElements?.[elementKey];

  if (!elementMap) {
    throw Error(`🧨 Unable to find the locator '${elementKey}' mapping 🧨`);
  }

  let elementIdentifier: Locator;

  if (elementMap.type == "ByTestId") {
    elementIdentifier = page.getByTestId(elementMap.identifier);
  } else if (elementMap.type == "ByExactText") {
    elementIdentifier = page.getByText(elementMap.identifier, { exact: true });
  } else if (elementMap.type == "ByPartialText") {
    elementIdentifier = page.getByText(elementMap.identifier);
  } else if (elementMap.type == "ByLabel") {
    elementIdentifier = page.getByLabel(elementMap.identifier);
  } else if (elementMap.type == "ByRole") {
    elementIdentifier = page.getByRole(...elementMap.identifier);
  } else if (elementMap.type == "ByPlaceholder") {
    elementIdentifier = page.getByPlaceholder(elementMap.identifier);
  } else if (elementMap.type == "Locator") {
    elementIdentifier = page.locator(elementMap.identifier);
  } else {
    throw Error(
      `🧨 element Type for locator '${elementKey}' is not one of TestId, Role, Text or Label 🧨`,
    );
  }

  return { elementIdentifier, elementType: elementMap.type };
};
