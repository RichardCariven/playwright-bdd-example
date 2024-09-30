import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "../IconButton/IconButton";
import { ChevronLeft } from "../Icons/ChevronLeft";

const meta = {
  title: "UI Library/IconButton",
  component: IconButton,
  args: {
    Icon: ChevronLeft,
    disabled: false,
    size: "md",
    variant: "primary",
    isLoading: false,
    "aria-label": "Button",
  },
  argTypes: {
    Icon: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
export const Secondary = { args: { variant: "secondary" } } satisfies Story;
