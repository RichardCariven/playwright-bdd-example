import type { Meta, StoryObj } from "@storybook/react";

import { Disc } from "./Disc";

const meta = {
  title: "UI Library/Disc",
  component: Disc,
  args: {
    handleClick: () => undefined,
    isSkeleton: false,
    disabled: false,
    title: "Greatest Hits Radio",
    imageSrc:
      "https://media.bauerradio.com/image/upload/c_crop,g_custom/v1680254509/brand_manager/stations/g4uplubigg8uujkawgk3.jpg",
  },
} satisfies Meta<typeof Disc>;

export default meta;

type Story = StoryObj<typeof Disc>;

export const Primary = {} satisfies Story;
