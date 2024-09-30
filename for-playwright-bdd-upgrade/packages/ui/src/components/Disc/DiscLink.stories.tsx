import type { Meta, StoryObj } from "@storybook/react";

import { DiscLink } from "./DiscLink";

const meta = {
  title: "UI Library/Disc",
  component: DiscLink,
  args: {
    isSkeleton: false,
    title: "Greatest Hits Radio",
    href: "#",
    imageSrc:
      "https://media.bauerradio.com/image/upload/c_crop,g_custom/v1680254509/brand_manager/stations/g4uplubigg8uujkawgk3.jpg",
  },
} satisfies Meta<typeof DiscLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AsLink = {} satisfies Story;
