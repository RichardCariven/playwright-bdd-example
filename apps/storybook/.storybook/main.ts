import path from "path";

import { type StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../../web/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "msw-storybook-addon",
    "storybook-addon-module-mock",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@chromatic-com/storybook",
  ],
  webpackFinal: (config) => {
    const alias = {
      ...config.resolve?.alias,
      "@web/fonts": path.resolve(__dirname, "../../web/src/fonts/index"),
      "@web/config": path.resolve(__dirname, "../../web/src/config/config"),
      "@web": path.resolve(__dirname, "../../web/src"),
    };
    return { ...config, resolve: { ...config.resolve, alias } };
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  features: {
    experimentalRSC: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  staticDirs: [
    "../public",
    {
      from: "../fonts",
      to: "fonts",
    },
  ],
};

export default config;
