/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import fs from "fs/promises";

import { type DictionaryWithPageId } from "../fetchCrowdinContents/fetchCrowdinContents";

export async function createMocks(
  path: string,
  translations: DictionaryWithPageId[],
) {
  for (const { pageId, dictionary } of translations) {
    const filepath = `${path}/${pageId}.json`;
    try {
      const fileContent = JSON.stringify(dictionary, null, 2);
      await fs.writeFile(filepath, fileContent);

      console.log(`File ${filepath} created successfully.`);
    } catch (error) {
      console.error(`Error creating ${filepath}: ${error as string}`);
    }
  }
}
