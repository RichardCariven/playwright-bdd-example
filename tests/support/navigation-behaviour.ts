import { type Page } from "@playwright/test";

import { type GlobalConfig, type PageId } from "../env/global";

export const navigateToPage = async (
  page: Page,
  pageId: PageId,
  { pages }: GlobalConfig,
): Promise<void> => {
  const pageConfigItem = pages[pageId];

  if (!pageConfigItem) {
    throw Error(
      `🧨 Failed to match pageID ${pageId} , \
      possible matches: ${JSON.stringify(
        pages,
      )} check name and case in feature 🧨`,
    );
  }

  const pathname = pageConfigItem.route;

  await page.goto(pathname);
};

export const getExpectedPageURL = (
  pageId: PageId,
  { pages }: GlobalConfig,
): RegExp => {
  const pageRegexString = pages[pageId].urlRegex;
  //Todo Error is not being caught if pages[pageId].urlRegex is undefined.
  if (!pageRegexString) {
    throw Error(
      `🧨 Failed to match pageID ${pageId} , \
      possible matches: ${JSON.stringify(
        pages,
      )} check name and case in feature 🧨`,
    );
  }

  const pageRegex = new RegExp(pageRegexString);
  return pageRegex;
};

const locatorMatchesPageId = (
  path: string,
  pageId: PageId,
  { pages }: GlobalConfig,
): boolean => {
  const pageRegexString = pages[pageId].locatorRegex;

  if (!pageRegexString) {
    throw Error(
      `🧨 Failed to match pageID ${pageId} , \
      possible matches: ${JSON.stringify(
        pages,
      )} check name and case in feature 🧨`,
    );
  }

  const pageRegex = new RegExp(pageRegexString);

  return pageRegex.test(path);
};

export const getCurrentPageId = (
  page: Page,
  globalConfig: GlobalConfig,
): PageId => {
  const { pages } = globalConfig;

  const pageConfigPageIds = Object.keys(pages);

  const { pathname: currentPath } = new URL(page.url());
  const currentPageId = pageConfigPageIds.find((pageId) =>
    locatorMatchesPageId(currentPath, pageId, globalConfig),
  );

  if (!currentPageId) {
    throw Error(
      `🧨 Failed to get page name from current route ${currentPath}, \
      possible pages: ${JSON.stringify(pages)} 🧨`,
    );
  }

  return currentPageId;
};

export const reloadPage = async (page: Page): Promise<void> => {
  await page.reload();
};
