import { describe, expect, test } from "@jest/globals";

import { renderTemplate, type ReplaceDictionary } from "./renderTemplate"; // Update the path to your actual file

describe("renderTemplate", () => {
  test("should replace placeholders with matching keys in the dictionary", () => {
    const template = "Hello {{name}}, welcome to {{place}}!";
    const dictionary: ReplaceDictionary = {
      name: "John",
      place: "Earth",
    };
    const result = renderTemplate(template, dictionary);
    expect(result).toBe("Hello John, welcome to Earth!");
  });

  test("should keep original placeholders if no match is found", () => {
    const template = "Hello {{name}}, welcome to {{place}}!";
    const dictionary: ReplaceDictionary = {
      name: "John",
    };
    const result = renderTemplate(template, dictionary);
    expect(result).toBe("Hello John, welcome to {{place}}!");
  });

  test("should handle empty placeholders gracefully", () => {
    const template = "Hello {{}}!";
    const dictionary: ReplaceDictionary = {
      name: "John",
    };
    const result = renderTemplate(template, dictionary);
    expect(result).toBe("Hello {{}}!");
  });

  test("should handle undefined values in dictionary", () => {
    const template = "Hello {{name}}!";
    const dictionary: ReplaceDictionary = {
      name: undefined,
    };
    const result = renderTemplate(template, dictionary);
    expect(result).toBe("Hello {{name}}!");
  });

  test("should handle an empty dictionary", () => {
    const template = "Hello {{name}}, welcome to {{place}}!";
    const dictionary: ReplaceDictionary = {};
    const result = renderTemplate(template, dictionary);
    expect(result).toBe("Hello {{name}}, welcome to {{place}}!");
  });

  test("should handle an empty template string", () => {
    const template = "";
    const dictionary: ReplaceDictionary = {
      name: "John",
      place: "Earth",
    };
    const result = renderTemplate(template, dictionary);
    expect(result).toBe("");
  });
});
