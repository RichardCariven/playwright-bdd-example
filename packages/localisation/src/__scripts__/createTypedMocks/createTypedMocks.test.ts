import fs from "fs";

import { describe, expect, jest, test } from "@jest/globals";

import { type PageId } from "../../types";
import { toCamelCase } from "../toCamelCase/toCamelCase";
import { createTypedMocks } from "./createTypedMocks";

// Mock fs and toCamelCase function
jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn(),
  },
}));

jest.mock("../toCamelCase/toCamelCase", () => ({
  toCamelCase: jest.fn((str) => str),
}));

describe("createTypedMocks", () => {
  test("should generate a TypeScript mocks file", async () => {
    // Setup
    const writeFileMock = fs.promises.writeFile as jest.Mock;
    const toCamelCaseMock = toCamelCase as jest.Mock;
    const path = "somePath";
    const translations = [
      {
        pageId: "page1" as PageId,
        dictionary: {},
      },
      {
        pageId: "page2" as PageId,
        dictionary: {},
      },
    ];

    // Mock toCamelCase to return modified strings
    toCamelCaseMock.mockImplementation((str) => `camel${str as string}`);

    // Execute
    await createTypedMocks(path, translations);

    // Check if writeFileMock was called
    expect(writeFileMock).toHaveBeenCalledTimes(1);
    const [receivedPath, receivedContent] = writeFileMock.mock.calls[0];

    // Check the path
    expect(String(receivedPath)).toEqual(`${path}/crowdinMocks.ts`);

    // Check essential parts of the content
    expect(receivedContent).toContain('import camelpage1 from "./page1.json";');
    expect(receivedContent).toContain('import camelpage2 from "./page2.json";');
    expect(receivedContent).toContain("export const crowdinMocks = {");
    expect(receivedContent).toContain('"page1": camelpage1,');
    expect(receivedContent).toContain('"page2": camelpage2,');
  });
});
