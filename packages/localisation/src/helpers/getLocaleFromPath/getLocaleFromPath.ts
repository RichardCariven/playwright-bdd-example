import { isSupportedLocale, type Locale } from "../../i18n.config";

export const getLocaleFromPath = (path: string | undefined | null): Locale => {
  const url = new URL(path ?? "/", "http://base.url");
  const locale = url.pathname.split("/")[1] ?? "";

  if (!isSupportedLocale(locale)) {
    throw new Error("Is not supported locale");
  }

  return locale as Locale;
};
