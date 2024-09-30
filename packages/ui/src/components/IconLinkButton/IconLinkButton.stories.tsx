import type { Meta, StoryObj } from "@storybook/react";

import { ChevronLeft } from "../Icons/ChevronLeft";
import { IconLinkButton } from "./IconLinkButton";

const meta = {
  title: "UI Library/IconLinkButton",
  component: IconLinkButton,
  args: {
    title: "Link",
    Icon: ChevronLeft,
    size: "md",
    variant: "primary",
    href: "",
  },
  argTypes: {
    Icon: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof IconLinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
export const Secondary = { args: { variant: "secondary" } } satisfies Story;
export const Unstyled = { args: { variant: "unstyled" } } satisfies Story;
