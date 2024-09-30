/* eslint no-console: ["error", { allow: ["log", "error"] }] */

import fs from "fs";

import { type DictionaryWithPageId } from "../fetchCrowdinContents/fetchCrowdinContents";
import { toPascalCase } from "../toPascalCase/toPascalCase";

interface ParamsType {
  key: string;
  params: string[] | null;
}

const generateUnionType = (type: string, types: string[]): string =>
  `export type ${type} = ${types.join(" | ")};`;

const generateParams = (data: Record<string, string>): ParamsType[] => {
  return Object.entries(data).map(([key, value]) => {
    const matches = value.match(/{{(.*?)}}/g);
    const params = matches ? matches.map((match) => match.slice(2, -2)) : null;
    return { key, params };
  });
};

const generateParamEntry = ({ key, params }: ParamsType): string => {
  if (params === null) {
    return `"${key}": null`;
  }
  return `"${key}": { ${params
    .map((param) => `${param}: string`)
    .join("; ")} }`;
};

const generateTranslationType = (
  pageId: string,
  translation: Record<string, string>,
): string => {
  const params = generateParams(translation);
  const entries = params.map(generateParamEntry).join("; ");
  if (!entries.length) {
    return `export type ${toPascalCase(pageId)}Dictionary = object;`;
  }
  return `export type ${toPascalCase(pageId)}Dictionary = { ${entries} };`;
};

const generateDicMap = (map: string[]) =>
  `export type DicMap = {${map.join("; ")}};`;

const generateTranslationsTypes = (
  translations: {
    pageId: string;
    dictionary: Record<string, string>;
  }[],
): string => {
  const pageIdUnionType = generateUnionType(
    "PageId",
    translations.map((t) => `"${t.pageId}"`),
  );
  const pageTranslationTypesUnionType = generateUnionType(
    "Dictionary",
    translations.map((t) => `${toPascalCase(t.pageId)}Dictionary`),
  );
  const pageParamsType = translations
    .map(({ pageId, dictionary }) =>
      generateTranslationType(pageId, dictionary),
    )
    .join("\n");
  const dicMap = generateDicMap(
    translations.map(
      (t) => `"${t.pageId}": ${toPascalCase(t.pageId)}Dictionary`,
    ),
  );

  return [
    pageParamsType,
    pageIdUnionType,
    pageTranslationTypesUnionType,
    dicMap,
  ].join("\n");
};

export const createTypes = async (
  path: string,
  translations: DictionaryWithPageId[],
): Promise<void> => {
  const filepath = `${path}/types.d.ts`;
  const bannerComment = `// Generated file. Do not edit manually.\n// Run yarn workspace @rayo/localisation generate to update this file.\n`;
  const content = generateTranslationsTypes(translations);

  await fs.promises.writeFile(filepath, `${bannerComment}${content}`);

  console.log(`File ${filepath} created successfully.`);
};
