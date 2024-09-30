import { type Locale } from "@rayo/localisation/i18n";
import { getCountryFromLocale } from "@rayo/localisation/server";

import { type ConfigStages, type RegionalConfig } from "./config.d";
import global from "./global";
import config from "./regions";

export const getRegionalConfig = <
  Loc extends Locale,
  Group extends keyof RegionalConfig,
>(
  locale: Loc,
  group: Group,
  stage?: keyof Omit<RegionalConfig[Group], "default">,
): RegionalConfig[Group]["default"] => {
  const country = getCountryFromLocale(locale);
  const _config = config[country];
  const _stage: keyof RegionalConfig[Group] =
    stage ??
    (process.env.NEXT_PUBLIC_STAGE as
      | keyof ConfigStages<unknown>
      | undefined) ??
    "default";

  if (_stage === "default")
    return _config[group][_stage] as RegionalConfig[Group]["default"];

  return {
    ..._config[group].default,
    ..._config[group][_stage],
  };
};

export const getConfig = (
  stage?: keyof Omit<ConfigStages<unknown>, "default">,
) => {
  const _stage: keyof ConfigStages<unknown> =
    stage ??
    (process.env.NEXT_PUBLIC_STAGE as
      | keyof ConfigStages<unknown>
      | undefined) ??
    "default";

  if (_stage === "default") return global[_stage];

  return { ...global.default, ...global[_stage] };
};

export * from "./config.d";
