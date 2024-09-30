import { getLocaleFromPath } from "./getLocaleFromPath";

describe("getLocaleFromPath", () => {
  it("returns the locale when it is a supported locale", () => {
    const path = "/en-gb/some/route";
    expect(getLocaleFromPath(path)).toBe("en-gb");
  });

  it("throws an error when the locale is not supported", () => {
    const path = "/foo/some/route";
    expect(() => {
      getLocaleFromPath(path);
    }).toThrow("Is not supported locale");
  });

  it("throws an error when the path is empty", () => {
    expect(() => getLocaleFromPath("")).toThrow("Is not supported locale");
  });

  it("returns the locale from the path even if it contains query parameters", () => {
    const path = "/fi-fi/some/route?query=param";
    expect(getLocaleFromPath(path)).toBe("fi-fi");
  });

  it("returns the locale from the path even if it contains hash fragment", () => {
    const path = "/en-gb/some/route#hash";
    expect(getLocaleFromPath(path)).toBe("en-gb");
  });

  it("returns the locale from the path even if it is absolute URL", () => {
    const path = "https://hellorayo.com/en-gb/some/route";
    expect(getLocaleFromPath(path)).toBe("en-gb");
  });
});
