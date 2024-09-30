import { type Locale } from "@rayo/localisation/i18n";

import { getPostcodeValidation } from "./postcodeValidation";

describe("getPostcodeValidation", () => {
  it("returns the correct pattern for a UK postcode", () => {
    expect(getPostcodeValidation("en-gb")).toBe(
      "^[A-Za-z]{1,2}[0-9][A-Za-z0-9]?\\s?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$",
    );
  });

  it("returns undefined for a region without validation", () => {
    expect(getPostcodeValidation("xx" as Locale)).toBeUndefined();
    expect(getPostcodeValidation("fi-fi")).toBeUndefined();
    expect(getPostcodeValidation("sv-se")).toBeUndefined();
  });

  it("returns undefined when locale is an empty string", () => {
    expect(getPostcodeValidation("" as Locale)).toBeUndefined();
  });

  it("returns undefined when locale is null", () => {
    expect(getPostcodeValidation(null as unknown as Locale)).toBeUndefined();
  });

  it("returns undefined when locale is undefined", () => {
    expect(
      getPostcodeValidation(undefined as unknown as Locale),
    ).toBeUndefined();
  });
});
