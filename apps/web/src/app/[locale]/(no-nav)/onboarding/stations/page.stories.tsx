import type { Meta, StoryObj } from "@storybook/react";

import Stations from "./page";

const meta = {
  title: "Web App Pages/Onboarding/Stations",
  parameters: {
    decorator: "web-app-page",
    layout: "fullscreen",
    nextjs: {
      navigation: {
        pathname: "/onboarding/stations",
      },
    },
  },
  component: Stations,
  args: {
    params: {
      locale: "en-gb",
    },
  },
} satisfies Meta<typeof Stations>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page = {} satisfies Story;
