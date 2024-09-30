const sharedConfig = require("@rayo/ui/tailwind/config.js");

module.exports = {
  content: [
    "../web/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/**/*.{js,ts,jsx,tsx}",
    "**/.storybook/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [sharedConfig],
};
