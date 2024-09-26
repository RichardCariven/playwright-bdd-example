import { test as base } from "playwright-bdd";

export const test = base.extend({
  locale: async ({ $tags, locale }, use) => {
    if ($tags.includes("@LocaleFi")) {
      locale = "fi";
    } else if ($tags.includes("@LocaleEn")) {
      locale = "en";
    }
    await use(locale);
  },
});
