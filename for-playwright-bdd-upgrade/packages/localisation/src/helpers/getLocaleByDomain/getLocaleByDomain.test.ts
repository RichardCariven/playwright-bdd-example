import { domainLocaleMap } from "../../i18n.config";
import { getLocaleByDomain } from "./getLocaleByDomain";

describe("getLocaleByDomain", () => {
  test("should return locale by domain", () => {
    expect(getLocaleByDomain("hellorayo.co.uk")).toBe(
      domainLocaleMap["hellorayo.co.uk"],
    );
  });

  it("throws an error when the hostname is empty", () => {
    expect(() => getLocaleByDomain(null)).toThrow(
      "Cant assign a locale for undefined hostname",
    );
  });

  it("throws an error when the hostname is unkown", () => {
    expect(() => getLocaleByDomain("foo.fi")).toThrow(
      "Cant find a base domain for hostname foo.fi, therefore cant assign a locale",
    );
  });
});
