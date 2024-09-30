import { describe, expect, test } from "@jest/globals";

import { toPascalCase } from "./toPascalCase";

describe("toPascalCase", () => {
  test("should convert a hyphen-separated word to PascalCase", () => {
    const result = toPascalCase("hello-world");
    expect(result).toBe("HelloWorld");
  });

  test("should handle single words", () => {
    const result = toPascalCase("hello");
    expect(result).toBe("Hello");
  });

  test("should handle uppercase letters correctly", () => {
    const result = toPascalCase("Hello-World");
    expect(result).toBe("HelloWorld");
  });

  test("should handle mixed case", () => {
    const result = toPascalCase("HeLLo-WoRLd");
    expect(result).toBe("HelloWorld");
  });

  test("should handle an empty string", () => {
    const result = toPascalCase("");
    expect(result).toBe("");
  });

  test("should handle a string with only hyphens", () => {
    const result = toPascalCase("---");
    expect(result).toBe("");
  });

  test("should handle numbers and special characters", () => {
    const result = toPascalCase("hello-world123");
    expect(result).toBe("HelloWorld123");
  });
});
