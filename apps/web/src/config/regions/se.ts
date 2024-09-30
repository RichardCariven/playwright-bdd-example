import { type RegionalConfig } from "../config.d";

export const config: RegionalConfig = {
  COMMON: {
    default: {
      teslaDomain: "https://radioplay.se",
      aggregatorBrandCode: "SE_RADIOPLAY",
    },
  },
  SHEPHERD: {
    default: {
      oAuthApi: "https://account.radioplay.se/oauth2",
      accessTokenCookieName: "shepherd-access-token-se",
      refreshTokenCookieName: "shepherd-refresh-token-se",
    },
    dev: {
      oAuthApi: "https://stage.account.radioplay.se/oauth2",
    },
    stage: {
      oAuthApi: "https://dev.account.radioplay.se/oauth2",
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
        containerId: "GTM-NTNVZXP",
      },
    },
  },
  FOOTER: {
    default: {},
  },
};
