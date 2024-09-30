import { type Locale } from "../../i18n.config";
import { type PageId } from "../../types";
import { fetchCrowdinDictionary } from "../fetchCrowdinDictionary/fetchCrowdinDictionary";
import { t } from "../t/t";

export const getCrowdinTranslations = async <T extends PageId[]>(
  locale: Locale,
  bundles: T,
) => {
  const dictionary = await fetchCrowdinDictionary(locale, bundles);
  return t<T>(dictionary);
};
