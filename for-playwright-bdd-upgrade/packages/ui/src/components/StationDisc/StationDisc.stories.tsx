import { useEffect, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { StationDisc } from "./StationDisc";

const meta = {
  title: "UI Library/StationDisc",
  component: StationDisc,
  args: {
    variant: "default",
    size: "lg",
    imageSrc:
      "https://media.bauerradio.com/image/upload/c_crop,g_custom/q_auto,w_256/v1678798986/brand_manager/stations/gd4jspqbga8mgvbmffaf.png",
    loading: false,
    alt: "StationLogo",
  },
} satisfies Meta<typeof StationDisc>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;

export const Loading = {
  args: {
    state: "loading",
  },
} satisfies Story;

export const HeroPlaying = {
  args: {
    variant: "hero",
    state: "playing",
    audioLength: 360,
  },
  render: function Render(args) {
    const [audiblePosition, setAudiblePosition] = useState(90);

    useEffect(() => {
      const interval = setInterval(() => {
        setAudiblePosition((prevPosition) => {
          if (prevPosition === args.audioLength) {
            return 0;
          } else {
            return prevPosition + 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }, [args.audioLength]);

    return <StationDisc {...args} audioPosition={audiblePosition} />;
  },
} satisfies Story;

export const HeroBuffering = {
  args: {
    variant: "hero",
    state: "buffering",
  },
} satisfies Story;
