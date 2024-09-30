import type { Meta, StoryObj } from "@storybook/react";

import { LinkButton } from "./LinkButton";

const meta = {
  title: "UI Library/LinkButton",
  component: LinkButton,
  args: {
    children: "This is Link Button!",
    size: "md",
    href: "#",
  },
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    variant: "primary",
  },
} satisfies Story;

export const Secondary = {
  args: {
    variant: "secondary",
  },
} satisfies Story;

export const Text = {
  args: {
    variant: "text",
  },
} satisfies Story;
