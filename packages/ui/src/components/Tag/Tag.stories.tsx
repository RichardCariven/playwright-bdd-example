import type { Meta, StoryObj } from "@storybook/react";

import { BroadcastFilledIcon } from "../Icons/Broadcast";
import { Tag } from "./Tag";

const meta = {
  title: "UI Library/Chips & Tags/Tags",
  component: Tag,
  args: {
    children: "55 mins",
  },
  argTypes: {
    Icon: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    variant: "grey",
    Icon: BroadcastFilledIcon,
  },
} satisfies Story;

export const NoIcon = {
  args: {
    variant: "grey",
  },
} satisfies Story;
