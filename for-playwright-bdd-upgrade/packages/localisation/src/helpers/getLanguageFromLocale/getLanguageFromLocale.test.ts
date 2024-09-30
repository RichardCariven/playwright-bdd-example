import { type Locale } from "../../i18n.config";
import { getLanguageFromLocale } from "./getLanguageFromLocale";

describe("getLanguageFromLocale", () => {
  test("Swedish", () => {
    expect(getLanguageFromLocale("sv-se")).toEqual("sv");
  });

  test("Finnish", () => {
    expect(getLanguageFromLocale("fi-fi")).toEqual("fi");
  });

  test("English", () => {
    expect(getLanguageFromLocale("en-gb")).toEqual("en");
  });

  test("Unknown locale should throw", () => {
    expect(() => getLanguageFromLocale("foo-foo" as Locale)).toThrow();
  });
});
