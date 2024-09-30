import type { Meta, StoryObj } from "@storybook/react";

import Genres from "./page";

const meta = {
  title: "Web App Pages/Onboarding/Genres",
  parameters: {
    decorator: "web-app-page",
    layout: "fullscreen",
    nextjs: {
      navigation: {
        pathname: "/onboarding/genres",
      },
    },
  },
  component: Genres,
  args: {
    params: {
      locale: "en-gb",
    },
  },
} satisfies Meta<typeof Genres>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page = {} satisfies Story;
