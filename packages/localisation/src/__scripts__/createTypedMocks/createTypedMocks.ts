/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import fs from "fs";

import { type DictionaryWithPageId } from "../fetchCrowdinContents/fetchCrowdinContents";
import { toCamelCase } from "../toCamelCase/toCamelCase";

export const createTypedMocks = async (
  path: string,
  dictionaries: DictionaryWithPageId[],
): Promise<void> => {
  const filepath = `${path}/crowdinMocks.ts`;

  const bannerComment = `
          // Generated file. Do not edit manually.
          // Run yarn workspace @rayo/localisation generate to update this file.
        `;

  const imports = dictionaries
    .map(
      ({ pageId }) => `import ${toCamelCase(pageId)} from "./${pageId}.json";`,
    )
    .join("\n");

  const typeImports =
    "export const crowdinMocks = {\n" +
    dictionaries
      .map(({ pageId }) => `"${pageId}": ${toCamelCase(pageId)},`)
      .join("\n") +
    "};";

  const fileContent = [bannerComment, imports, typeImports].join("\n");

  await fs.promises.writeFile(filepath, fileContent);

  console.log(`File ${filepath} created successfully.`);
};
