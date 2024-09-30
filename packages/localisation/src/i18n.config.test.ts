import {
  countries,
  isCountry,
  isLanguage,
  isSupportedLocale,
  languages,
} from "./i18n.config";

describe("isCountry", () => {
  test("Known countries", () => {
    countries.forEach((country) => {
      expect(isCountry(country)).toEqual(true);
    });
  });

  test("Unknown country", () => {
    expect(isCountry("foo")).toEqual(false);
  });
});

describe("isLanguage", () => {
  test("Known languages", () => {
    languages.forEach((language) => {
      expect(isLanguage(language)).toEqual(true);
    });
  });

  test("Unknown language", () => {
    expect(isLanguage("foo")).toEqual(false);
  });
});

describe("isSupportedLocale", () => {
  test("Known locales", () => {
    countries
      .map((country) => languages.map((language) => `${language}-${country}`))
      .flat()
      .forEach((locale) => {
        expect(isSupportedLocale(locale)).toEqual(true);
      });
  });

  test("Unknown locale", () => {
    expect(isSupportedLocale("foo")).toEqual(false);
  });
});
