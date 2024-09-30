export const countries = ["gb", "fi", "se"] as const;
export const languages = ["en", "fi", "sv"] as const;

export const domains = [
  "localhost",
  "hellorayo.co.uk",
  "radioplay.fi",
  "radioplay.se",
] as const;

export const domainLocaleMap: Record<(typeof domains)[number], Locale> = {
  localhost: "en-gb",
  "hellorayo.co.uk": "en-gb",
  "radioplay.fi": "fi-fi",
  "radioplay.se": "sv-se",
};

export const defaultLocale = "en-gb" satisfies Locale;

export type Country = (typeof countries)[number];
export const isCountry = (country: string): country is Country => {
  return countries.includes(country);
};

export type Language = (typeof languages)[number];
export const isLanguage = (language: string): language is Language => {
  return languages.includes(language);
};

export type Locale =
  `${(typeof languages)[number]}-${(typeof countries)[number]}`;
export const isSupportedLocale = (locale: string) => {
  const supportedLocales = countries
    .map((country) => languages.map((language) => `${language}-${country}`))
    .flat() as Locale[];

  return supportedLocales.includes(locale);
};
