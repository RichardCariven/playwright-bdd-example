interface ApiConfig {
  prod: string;
  stage?: string;
  dev?: string;
}

interface Config {
  listen: ApiConfig;
  helix: ApiConfig;
  shepherd: ApiConfig;
  subscriptions: ApiConfig;
  events: ApiConfig;
}

export const Config: Config = {
  listen: {
    prod: "https://listenapi.planetradio.co.uk/api9.2/",
    stage: "https://stagingapi.planetradio.co.uk/api9.2/",
  },
  helix: {
    prod: "https://helix.apollo.audio/",
  },
  shepherd: {
    prod: "https://account.planetradio.co.uk/api/v2.0/",
    stage: "https://stage.account.planetradio.co.uk/api/v2.0/",
  },
  subscriptions: {
    prod: "https://subscriptions.apollo.audio/",
  },
  events: {
    prod: "https://events.apollo.audio/",
  },
};
