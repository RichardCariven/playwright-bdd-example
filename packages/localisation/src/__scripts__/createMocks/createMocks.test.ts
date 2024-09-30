import fs from "fs/promises";

import { describe, expect, jest, test } from "@jest/globals";

import { type PageId } from "../../types";
import { type DictionaryWithPageId } from "../fetchCrowdinContents/fetchCrowdinContents";
import { createMocks } from "./createMocks"; // Replace 'your-file' with the actual file name

// Mock the fs/promises module
jest.mock("fs/promises");

describe("createMocks", () => {
  test("should create JSON files for given translations", async () => {
    // Cast writeFile as jest.Mock so TypeScript understands it's mocked
    const writeFileMock = fs.writeFile as jest.Mock;

    const path = "mocks";
    const translations: DictionaryWithPageId[] = [
      {
        pageId: "page1" as PageId,
        dictionary: { key1: "value1", key2: "value2" },
      },
      {
        pageId: "page2" as PageId,
        dictionary: { key1: "value3", key2: "value4" },
      },
    ];

    await createMocks(path, translations);

    // Verify writeFile was called with the expected arguments
    expect(writeFileMock).toHaveBeenCalledWith(
      `${path}/page1.json`,
      JSON.stringify(translations[0].dictionary, null, 2),
    );
    expect(writeFileMock).toHaveBeenCalledWith(
      `${path}/page2.json`,
      JSON.stringify(translations[1].dictionary, null, 2),
    );

    // Verify writeFile was called the right number of times
    expect(writeFileMock).toHaveBeenCalledTimes(translations.length);
  });
});
