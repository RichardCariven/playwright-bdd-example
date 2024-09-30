import { type RegionalConfig } from "../config.d";

export const config: RegionalConfig = {
  COMMON: {
    default: {
      teslaDomain: "https://radioplay.fi",
      aggregatorBrandCode: "FI_RADIOPLAY",
    },
  },
  SHEPHERD: {
    default: {
      oAuthApi: "https://account.radioplay.fi/oauth2",
      accessTokenCookieName: "shepherd-access-token-fi",
      refreshTokenCookieName: "shepherd-refresh-token-fi",
    },
    dev: {
      oAuthApi: "https://stage.account.radioplay.fi/oauth2",
    },
    stage: {
      oAuthApi: "https://dev.account.radioplay.fi/oauth2",
    },
  },
  ONBOARDING: {
    default: {},
  },
  FEATURES: {
    default: {
      GA4: {
        enabled: false,
      },
      GTM: {
        enabled: true,
        containerId: "GTM-P9WKQGB",
      },
    },
  },
  FOOTER: {
    default: {},
  },
};
