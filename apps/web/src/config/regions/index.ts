import { type Country } from "@rayo/localisation/i18n";

import { type RegionalConfig } from "../config.d";
import { config as fi } from "./fi";
import { config as gb } from "./gb";
import { config as se } from "./se";

const config: Record<Country, RegionalConfig> = {
  gb,
  fi,
  se,
};

export default config;
