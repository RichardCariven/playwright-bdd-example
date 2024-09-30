import { locatorsFixture } from "./locatorsFixture";

export const test = locatorsFixture.extend({
  locale: async ({ $tags, locale }, use) => {
    if ($tags.includes("@LocaleFi")) {
      locale = "fi";
    } else if ($tags.includes("@LocaleEn")) {
      locale = "en";
    }
    await use(locale);
  },
});
