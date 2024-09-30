import { isCountry, type Country, type Locale } from "../../i18n.config";

export const getCountryFromLocale = (locale: Locale): Country => {
  const country = locale.split("-")[1];
  if (!isCountry(country)) {
    throw new Error("Can't map locale to known country");
  }
  return country;
};
