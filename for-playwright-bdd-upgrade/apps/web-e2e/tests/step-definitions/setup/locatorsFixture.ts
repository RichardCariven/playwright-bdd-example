import { type Elements, type GlobalConfig, type Pages } from "env/global";

import test from "@playwright/test";

const pages: Pages = {
  Home: {
    route: "/",
    urlRegex: "/",
    locatorRegex: "^/$",
  },

  "Onboarding Location": {
    route: "/onboarding/location",
    urlRegex: ".*location",
    locatorRegex: "/onboarding/location",
    elements: {
      "Postcode Entry": { type: "ByTestId", identifier: "postcode" },
    },
  },

  "Select Genres": {
    route: "/onboarding/genres",
    urlRegex: ".*genres",
    locatorRegex: "/onboarding/genres",
    elements: {
      "1980s genre": { type: "ByExactText", identifier: "1980s" },
      "Party genre": { type: "ByExactText", identifier: "Party" },
      "Musicals genre": { type: "ByExactText", identifier: "Musicals" },
      "Workout genre": { type: "ByExactText", identifier: "Workout" },
    },
  },

  "Select Favourite Stations": {
    route: "/onboarding/stations",
    urlRegex: ".*stations",
    locatorRegex: "/onboarding/stations",
    elements: {
      "Absolute Radio 60s": {
        type: "ByExactText",
        identifier: "Absolute Radio 60s",
      },
    },
  },
  "Terms and Conditions": {
    route: "https://www.bauerlegal.co.uk/website-terms-of-use-20240805",
    urlRegex: ".*website-terms-of-use-20240805",
    locatorRegex: "",
  },
  "Privacy Policy": {
    route: "https://www.bauerlegal.co.uk/privacy-policy-20240722",
    urlRegex: ".*privacy-policy-20240722",
    locatorRegex: "",
  },
  "Speak Up": {
    route: "https://www.bauerlegal.co.uk/speak-up/",
    urlRegex: ".*speak-up",
    locatorRegex: "",
  },
  "Competition Terms & Conditions": {
    route:
      "https://www.bauerlegal.co.uk/competition-general-terms-and-conditions-20240625",
    urlRegex: ".*competition-general-terms-and-conditions-20240625",
    locatorRegex: "",
  },
  "Cookie Policy": {
    route: "https://www.bauerlegal.co.uk/cookie-policy-20240809",
    urlRegex: ".*cookie-policy-20240809",
    locatorRegex: "",
  },
  Careers: {
    route: "https://www.bauermedia.co.uk/join/careers/",
    urlRegex: ".*join/careers/",
    locatorRegex: "",
  },
  Support: {
    route: "https://support.hellorayo.co.uk/hc/en-gb",
    urlRegex: ".*support.hellorayo.co.uk/hc/en-gb",
    locatorRegex: "",
  },
  "Advertise with us": {
    route: "https://www.bauermedia.co.uk/brands/",
    urlRegex: ".*brands/",
    locatorRegex: "",
  },
};

const commonElements: Elements = {
  Continue: {
    type: "ByRole",
    identifier: ["button", { name: "Continue" }],
  },
  Skip: {
    type: "ByRole",
    identifier: ["link", { name: "skip" }],
  },
  "On Air": {
    type: "ByRole",
    identifier: ["link", { name: "On Air" }],
  },
  Music: {
    type: "ByRole",
    identifier: ["link", { name: /^Music$/ }],
  },
  Podcasts: {
    type: "ByRole",
    identifier: ["link", { name: "Podcasts" }],
  },
  News: {
    type: "ByRole",
    identifier: ["link", { name: "News" }],
  },
  Win: {
    type: "ByRole",
    identifier: ["link", { name: "Win" }],
  },
  Premium: {
    type: "ByRole",
    identifier: ["link", { name: "Premium" }],
  },
  Search: {
    type: "ByRole",
    identifier: ["link", { name: "Search" }],
  },
  "My Library": {
    type: "ByRole",
    identifier: ["link", { name: "My Library" }],
  },
  "Profile Menu": {
    type: "ByTestId",
    identifier: "profile-menu",
  },
  "Sign Out": {
    type: "ByRole",
    identifier: ["menuitem", { name: "Sign Out" }],
  },
  "Account Settings": {
    type: "ByRole",
    identifier: ["menuitem", { name: "Account Settings" }],
  },
  Home: {
    type: "ByLabel",
    identifier: "To Home",
  },
  "Expand Menu": {
    type: "ByTestId",
    identifier: "open-menu",
  },
  "Close Menu": {
    type: "ByTestId",
    identifier: "close-menu",
  },
  "Mobile Nav": {
    type: "ByTestId",
    identifier: "mobile-nav",
  },
  "Terms and Conditions": {
    type: "ByRole",
    identifier: ["link", { name: /^Terms & Conditions$/ }],
  },
  "Privacy Policy": {
    type: "ByRole",
    identifier: ["link", { name: /^Privacy Policy$/ }],
  },
  "Speak Up": {
    type: "ByRole",
    identifier: ["link", { name: /^Speak Up$/ }],
  },
  "Competition Terms & Conditions": {
    type: "ByRole",
    identifier: ["link", { name: /^Competition Terms & Conditions$/ }],
  },
  "Cookie Policy": {
    type: "ByRole",
    identifier: ["link", { name: /^Cookie Policy$/ }],
  },
  Careers: {
    type: "ByRole",
    identifier: ["link", { name: /^Careers$/ }],
  },
  Support: {
    type: "ByRole",
    identifier: ["link", { name: /^Support$/ }],
  },
  "Advertise with us": {
    type: "ByRole",
    identifier: ["link", { name: /^Advertise with us$/ }],
  },
};

export const locatorsFixture = test.extend<{ globalConfig: GlobalConfig }>({
  globalConfig: async ({}, use) => await use({ pages, commonElements }),
});
