import { t } from "./t";

describe("t function", () => {
  it("should return the correct translation", () => {
    const dictionary = {
      greeting: "Hi",
      welcome: "Welcome",
      helloUser: "Hello {{username}}",
    };

    const translate = t<["_test"]>(dictionary);

    expect(translate("helloUser", { username: "John" })).toBe("Hello John");
    expect(translate("welcome")).toBe("Welcome");
  });

  it("should handle missing keys by returning the key itself", () => {
    const dictionary = {
      greeting: "Hi",
      welcome: "Welcome",
      helloUser: "Hello {{username}}",
    };

    const translate = t<["_test"]>(dictionary);

    // @ts-expect-error: Because the key is missing
    expect(translate("missingKey")).toBe("missingKey");
  });

  it("should handle null parameters", () => {
    const dictionary = {
      greeting: "Hi",
      welcome: "Welcome",
      helloUser: "Hello {{username}}",
    };

    const translate = t<["_test"]>(dictionary);

    // @ts-expect-error: Because the arguments was not given
    expect(translate("helloUser")).toBe("Hello {{username}}");
  });
});
