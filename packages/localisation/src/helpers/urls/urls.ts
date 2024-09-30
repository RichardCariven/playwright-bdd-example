import { type Language } from "../../i18n.config";

export const buildCrowdinManifestUrl = (hash: string) => {
  return `https://distributions.crowdin.net/${hash}/manifest.json`;
};

export const buildCrowdinContentUrl = (
  hash: string,
  langugage: Language,
  pageId: string,
  timestamp: number,
) => {
  return `https://distributions.crowdin.net/${hash}/content/${langugage}/${pageId}.json?timestamp=${timestamp}`;
};
