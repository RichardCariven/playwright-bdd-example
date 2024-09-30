import { domains } from "../../i18n.config";
import { getBaseDomain } from "./getBaseDomain";

describe("getBaseDomain", () => {
  test("should return the base domain for a simple domain", () => {
    expect(getBaseDomain(domains[1])).toBe(domains[1]);
  });

  test("should return the base domain if sub domains used", () => {
    expect(getBaseDomain(`sub.domain.${domains[1]}`)).toBe(domains[1]);
  });

  test("should return the base domain for a simple domain with port", () => {
    expect(getBaseDomain(`${domains[1]}:3000`)).toBe(domains[1]);
  });

  test("should return the base domain if sub domains used with port", () => {
    expect(getBaseDomain(`sub.domain.${domains[1]}:3000`)).toBe(domains[1]);
  });

  test("should return undefined if domain is not in config", () => {
    expect(getBaseDomain("example.com")).toBe(undefined);
  });
});
