import { fetchCrowdinContent } from "../../helpers/fetchCrowdinContent/fetchCrowdinContent";
import { type Language } from "../../i18n.config";
import { type PageId } from "../../types";

export interface DictionaryWithPageId {
  pageId: PageId;
  dictionary: Record<string, string>;
}

export async function fetchCrowdinContents(
  language: Language,
  pageIds: PageId[],
  timestamp: number,
): Promise<DictionaryWithPageId[]> {
  const fetchPromises = pageIds.map(async (pageId) => {
    return {
      pageId,
      dictionary: await fetchCrowdinContent(language, pageId, timestamp),
    };
  });
  const contents = await Promise.all(fetchPromises);

  // Generate one dictionary for testing purposes
  contents.push({
    pageId: "_test",
    dictionary: {
      greeting: "Hi",
      welcome: "Welcome",
      helloUser: "Hello {{username}}",
    },
  });

  return contents;
}
