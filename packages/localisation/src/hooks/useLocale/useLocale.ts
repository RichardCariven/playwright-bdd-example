"use client";

import { useParams } from "next/navigation";

import { isSupportedLocale, type Locale } from "../../i18n.config";

export const useLocale = (): Locale => {
  const { locale } = useParams<{ locale: Locale }>();

  if (!isSupportedLocale(locale)) {
    throw new Error("Is not supported locale");
  }

  return locale;
};
