import { distributionHash } from "../../config";
import { type Language } from "../../i18n.config";
import { type PageId } from "../../types";
import { buildCrowdinContentUrl } from "../urls/urls";

export const fetchCrowdinContent = async (
  language: Language,
  pageId: PageId,
  timestamp: number,
) => {
  const url = buildCrowdinContentUrl(
    distributionHash,
    language,
    pageId,
    timestamp,
  );
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Unsuccessful fetch status (${response.status}) on ${url}`);
    return {};
  }
  return (await response.json()) as Record<string, string>;
};
