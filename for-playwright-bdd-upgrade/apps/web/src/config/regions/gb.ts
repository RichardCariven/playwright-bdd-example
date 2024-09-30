import { type RegionalConfig } from "../config.d";

export const config: RegionalConfig = {
  COMMON: {
    default: {
      teslaDomain: "https://hellorayo.co.uk",
      aggregatorBrandCode: "UK_PLANETRADIO",
    },
  },
  SHEPHERD: {
    default: {
      oAuthApi: "https://account.planetradio.co.uk/oauth2",
      accessTokenCookieName: "shepherd-access-token-gb",
      refreshTokenCookieName: "shepherd-refresh-token-gb",
    },
    dev: {
      oAuthApi: "https://stage.account.planetradio.co.uk/oauth2",
    },
    stage: {
      oAuthApi: "https://dev.account.planetradio.co.uk/oauth2",
    },
  },
  ONBOARDING: {
    default: {
      defaultNearYouStations: ["gh0", "hit"],
    },
  },
  FEATURES: {
    default: {
      GA4: {
        enabled: true,
        trackingId: "G-BXVFXZWE6M",
      },
      GTM: {
        enabled: true,
        containerId: "GTM-WZVNMJ",
      },
    },
  },
  FOOTER: {
    default: {
      links: [
        {
          id: "speak-up",
          title: "Speak Up",
          href: "https://www.bauerlegal.co.uk/speak-up/",
        },
        {
          id: "careers",
          title: "Careers",
          href: "https://www.bauermedia.co.uk/join/careers/",
        },
        {
          id: "support",
          title: "Support",
          href: "https://support.hellorayo.co.uk/",
        },
      ],
      linkOrder: [
        "terms",
        "privacy",
        "speak-up",
        "competitions",
        "cookies",
        "careers",
        "support",
      ],
    },
  },
};
