import * as Sentry from "@sentry/nextjs";

import { type Locale } from "../../i18n.config";
import { type PageId } from "../../types";
import { fetchCrowdinContent } from "../fetchCrowdinContent/fetchCrowdinContent";
import { fetchCrowdinManifest } from "../fetchCrowdinManifest/fetchCrowdinManifest";
import { getLanguageFromLocale } from "../getLanguageFromLocale/getLanguageFromLocale";

export const fetchCrowdinDictionary = async (
  locale: Locale,
  bundles: PageId[],
): Promise<Record<string, string>> => {
  try {
    const language = getLanguageFromLocale(locale);
    const { timestamp } = await fetchCrowdinManifest();
    const dictionaries = await Promise.all(
      bundles.map(async (bundle) => {
        return await fetchCrowdinContent(language, bundle, timestamp);
      }),
    );
    return Object.assign({}, ...dictionaries) as Record<string, string>;
  } catch (error) {
    // NOTICE: Catch errors - We don't want to break the site just because something is wrong with Crowdin.
    if (process.env.NEXT_PUBLIC_DEVELOPMENT) {
      console.error(error);
    }

    Sentry.captureException(error);

    return {} as never;
  }
};
