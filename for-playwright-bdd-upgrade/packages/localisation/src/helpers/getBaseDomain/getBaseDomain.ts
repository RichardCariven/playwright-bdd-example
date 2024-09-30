import { domains } from "../../i18n.config";

export const getBaseDomain = (host: string) => {
  const domain = host.split(":")[0];
  const baseDomain = domains.find((d) => domain.includes(d));
  return baseDomain;
};
