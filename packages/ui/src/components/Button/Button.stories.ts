import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "UI Library/Button",
  component: Button,
  args: {
    children: "This is Button!",
    size: "md",
    disabled: false,
    isLoading: false,
    loadingText: "Stop! Hammer time.",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
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
