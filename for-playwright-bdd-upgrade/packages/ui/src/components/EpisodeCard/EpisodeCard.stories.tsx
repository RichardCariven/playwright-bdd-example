import type { Meta, StoryObj } from "@storybook/react";

import { EpisodeCard } from "../EpisodeCard/EpisodeCard";

const meta = {
  title: "UI Library/On-Demand Cards/EpisodeCard",
  component: EpisodeCard,
  args: {
    isLoading: false,
    isPremium: false,
    href: "#",
    title: "Magic’s Biggest Summer Showdown",
    imageSrc:
      "https://assets.planetradio.co.uk/artist/1-1/320x320/253.jpg?ver=1465083315",
    stationImageSrc:
      "https://media.bauerradio.com/image/upload/c_crop,g_custom/q_auto,w_256/v1678798986/brand_manager/stations/gd4jspqbga8mgvbmffaf.png",
    durationLabel: "55 mins",
    className: "w-[300px]",
  },
} satisfies Meta<typeof EpisodeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OverImage = {
  args: {
    variant: "primary",
  },
} satisfies Story;

export const OverSolidColour = {
  args: {
    variant: "secondary",
  },
};

export const OverSolidColourPremium = {
  args: {
    variant: "secondary",
    isPremium: true,
  },
} satisfies Story;

export const OverSolidColourMultiple = {
  args: {
    variant: "secondary",
    imageSrc: [
      "https://assets.planetradio.co.uk/artist/1-1/320x320/10275.jpg?ver=1465118841",
      "https://assets.planetradio.co.uk/artist/1-1/320x320/1327.jpg?ver=1465083900",
      "https://assets.planetradio.co.uk/artist/1-1/320x320/6890.jpg?ver=1465117791",
      "https://assets.planetradio.co.uk/artist/1-1/320x320/253.jpg?ver=1465083315",
    ],
  },
} satisfies Story;
