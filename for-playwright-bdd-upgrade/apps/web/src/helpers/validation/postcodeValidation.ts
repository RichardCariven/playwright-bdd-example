import { type Locale } from "@rayo/localisation/i18n";

export function getPostcodeValidation(locale: Locale) {
  if (!locale) return;

  const postcodeValidation: Partial<Record<Locale, string>> = {
    "en-gb": `^[A-Za-z]{1,2}[0-9][A-Za-z0-9]?\\s?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$`,
  };

  const pattern = postcodeValidation[locale];

  // Returning undefined for a region that has no validation is correct
  // pattern should be undefined to remove validation
  return pattern;
}
