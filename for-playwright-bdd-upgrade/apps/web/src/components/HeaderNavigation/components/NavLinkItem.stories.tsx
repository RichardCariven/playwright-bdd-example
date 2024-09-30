import { PodcastIcon, PodcastIconFilled } from "@rayo/ui/icons/Podcast";
import type { Meta, StoryObj } from "@storybook/react";

import NavLinkItem from "./NavLinkItem";

const meta = {
  title: "Web App Components/HeaderNavigation/components/NavLinkItem",
  component: NavLinkItem,
  parameters: {
    decorator: "web-app-component",
  },
  args: {
    href: "",
    label: "Podcasts",
    Icon: PodcastIcon,
    IconHover: PodcastIconFilled,
  },
} satisfies Meta<typeof NavLinkItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "xl",
    },
    chromatic: {
      modes: {
        mobile: { disable: true },
        "desktop (light)": {
          theme: "light",
          viewport: "xl",
        },
        "desktop (dark)": {
          theme: "dark",
          viewport: "xl",
        },
      },
    },
  },
} satisfies Story;

export const Mobile = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    chromatic: {
      modes: {
        mobile: { disable: true },
        "desktop (light)": { disable: true },
        "desktop (dark)": { disable: true },
        "mobile (light)": {
          theme: "light",
          viewport: "mobile1",
        },
        "mobile (dark)": {
          theme: "dark",
          viewport: "mobile1",
        },
      },
    },
  },
} satisfies Story;
