import { isLanguage, type Language, type Locale } from "../../i18n.config";

export const getLanguageFromLocale = (locale: Locale): Language => {
  const language = locale.split("-")[0];
  if (!isLanguage(language)) {
    throw new Error("Can't map locale to known language");
  }
  return language;
};
