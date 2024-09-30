import { type Locale } from "../../i18n.config";
import { getCountryFromLocale } from "./getCountryFromLocale";

describe("getCountryFromLocale", () => {
  test("Locale en-gb", () => {
    expect(getCountryFromLocale("en-gb")).toEqual("gb");
  });

  test("Locale fi-fi", () => {
    expect(getCountryFromLocale("fi-fi")).toEqual("fi");
  });

  test("Unknown locale should throw", () => {
    expect(() => getCountryFromLocale("foo-foo" as Locale)).toThrow();
  });
});
