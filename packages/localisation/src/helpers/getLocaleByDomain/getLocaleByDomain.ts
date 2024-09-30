import { domainLocaleMap, type Locale } from "../../i18n.config";
import { getBaseDomain } from "../getBaseDomain/getBaseDomain";

export const getLocaleByDomain = (hostname: string | null): Locale => {
  if (!hostname) {
    throw new Error(`Cant assign a locale for undefined hostname`);
  }

  const baseDomain = getBaseDomain(hostname);

  if (!baseDomain) {
    throw new Error(
      `Cant find a base domain for hostname ${hostname}, therefore cant assign a locale`,
    );
  }

  return domainLocaleMap[baseDomain];
};
