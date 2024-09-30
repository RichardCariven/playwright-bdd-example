import { describe, expect, test } from "@jest/globals";

import { toCamelCase } from "./toCamelCase"; // Update the path to your actual file

describe("toCamelCase", () => {
  test("should convert space-separated words to camelCase", () => {
    const result = toCamelCase("hello world");
    expect(result).toBe("helloWorld");
  });

  test("should convert hyphen-separated words to camelCase", () => {
    const result = toCamelCase("hello-world");
    expect(result).toBe("helloWorld");
  });

  test("should handle mixed separators", () => {
    const result = toCamelCase("hello world_again-hi");
    expect(result).toBe("helloWorld_againHi");
  });

  test("should make the first character lowercase", () => {
    const result = toCamelCase("Hello");
    expect(result).toBe("hello");
  });

  test("should handle empty strings", () => {
    const result = toCamelCase("");
    expect(result).toBe("");
  });

  test("should handle strings with only separators", () => {
    const result = toCamelCase(" _- ");
    expect(result).toBe("_");
  });
});
