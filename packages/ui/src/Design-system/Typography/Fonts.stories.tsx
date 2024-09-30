import type { Meta, StoryObj } from "@storybook/react";

import { Fonts } from "./Fonts";

const meta = {
  title: "UI Library/Design-System/Typography",
  component: Fonts,
} satisfies Meta<typeof Fonts>;

export default meta;
type Story = StoryObj<typeof Fonts>;

export const AllFont = {} satisfies Story;
