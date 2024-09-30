import { type Locale } from "@rayo/localisation/i18n";

import { getConfig, getRegionalConfig } from "./config";
import global from "./global";
import config from "./regions";

describe("getRegionalConfig", () => {
  test("With locale en-gb", () => {
    const { oAuthApi } = getRegionalConfig("en-gb", "SHEPHERD");
    expect(oAuthApi).toEqual(config.gb.SHEPHERD.default.oAuthApi);
  });

  test("With stage", () => {
    const { oAuthApi } = getRegionalConfig("en-gb", "SHEPHERD", "stage");
    expect(oAuthApi).toEqual(config.gb.SHEPHERD.stage?.oAuthApi);
  });

  test("With locale fi-fi", () => {
    const { oAuthApi } = getRegionalConfig("fi-fi", "SHEPHERD");
    expect(oAuthApi).toEqual(config.fi.SHEPHERD.default.oAuthApi);
  });

  test("Unknown locale should throw error", () => {
    expect(() => getRegionalConfig("foo" as Locale, "SHEPHERD")).toThrow();
  });
});

describe("getConfig", () => {
  test("Get default config", () => {
    const { domain } = getConfig();
    expect(domain).toEqual(global.default.domain);
  });

  test("Get config with stage", () => {
    const { domain } = getConfig("stage");
    expect(domain).toEqual(global.stage?.domain);
  });
});
