import fs from "fs";

import { describe, expect, jest, test } from "@jest/globals";

import { type PageId } from "../../types";
import { type DictionaryWithPageId } from "../fetchCrowdinContents/fetchCrowdinContents";
import { createTypes } from "./createTypes";

// Mock fs and toPascalCase function
jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn(),
  },
}));

jest.mock("../toPascalCase/toPascalCase", () => ({
  toPascalCase: jest.fn((str) => str),
}));

describe("createTypes", () => {
  test("should generate a TypeScript types file", async () => {
    // Setup
    const writeFileMock = fs.promises.writeFile as jest.Mock;
    const path = "somePath";

    const translations: DictionaryWithPageId[] = [
      {
        pageId: "page1" as PageId,
        dictionary: {
          key1: "Hello {{name}}",
          key2: "World",
        },
      },
      {
        pageId: "page2" as PageId,
        dictionary: {
          key3: "Foo {{bar}}",
        },
      },
    ];

    // Execute
    await createTypes(path, translations);

    // Check if writeFileMock was called
    expect(writeFileMock).toHaveBeenCalledTimes(1);
    const [, generatedContent] = writeFileMock.mock.calls[0];

    // Check essential parts of the content
    expect(generatedContent).toContain(
      'export type page1Dictionary = { "key1": { name: string }; "key2": null };',
    );
    expect(generatedContent).toContain(
      'export type page2Dictionary = { "key3": { bar: string } };',
    );
    expect(generatedContent).toContain(
      'export type PageId = "page1" | "page2";',
    );
    expect(generatedContent).toContain(
      "export type Dictionary = page1Dictionary | page2Dictionary;",
    );
    expect(generatedContent).toContain(
      'export type DicMap = {"page1": page1Dictionary; "page2": page2Dictionary};',
    );
  });
});
