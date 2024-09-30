import { type Page as PlaywrightPage } from "@playwright/test";

export type ElementKey = keyof Pages;
export type PageId = keyof Pages;

export type RoleElement = {
  type: "ByRole";
  identifier: Parameters<PlaywrightPage["getByRole"]>;
};

export type CommonElement = {
  type:
    | "ByTestId"
    | "ByPartialText"
    | "ByExactText"
    | "ByLabel"
    | "ByPlaceholder"
    | "Locator";
  identifier: string;
};

export type Elements = Record<string, CommonElement | RoleElement>;

export type Page = {
  route: string;
  urlRegex: string;
  locatorRegex: string;
  elements?: Elements;
};

export type Pages = Record<string, Page>;

export type GlobalConfig = {
  commonElements: Elements;
  pages: Pages;
};
