import type { Meta, StoryObj } from "@storybook/react";

import { TrackListItem } from "./TrackListItem";

const meta = {
  title: "UI Library/List Items/Track List Item",
  component: TrackListItem,
} satisfies Meta<typeof TrackListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    type: "track",
    image:
      "https://assets.planetradio.co.uk/artist/1-1/160x160/7.jpg?ver=1465083153",
    title: "History",
    artist: "Joel Corry, Becky Hill",
    timestamp: 810,
  },
  argTypes: {
    description: {
      control: false,
    },
  },
} satisfies Story;

export const Description = {
  args: {
    type: "description",
    description:
      "Your favourite duo is here to brighten your weekday mornings. Test your knowledge with Don’t Google This At Home or try and beat the hardest game on radio The Reflex. Email us at morning@magic.co.uk",
  },
  argTypes: {
    image: {
      control: false,
    },
    title: {
      control: false,
    },
    artist: {
      control: false,
    },
    timestamp: {
      control: false,
    },
  },
} satisfies Story;
