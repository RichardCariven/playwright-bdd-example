import { type countries } from "@rayo/localisation/i18n";

export type Regions = (typeof countries)[number];

const regionMapping: Record<Regions, number> = {
  gb: 1,
  fi: 4,
  se: 5,
};

export const getRegionId = (region: Regions): number => {
  return regionMapping[region];
};
