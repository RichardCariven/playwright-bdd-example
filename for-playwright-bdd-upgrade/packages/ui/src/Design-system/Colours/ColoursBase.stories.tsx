import type { Meta, StoryObj } from "@storybook/react";

import { ColoursBase } from "./ColoursBase";

const meta = {
  title: "UI Library/Design-System/Colours",
  component: ColoursBase,
} satisfies Meta<typeof ColoursBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {},
} satisfies Story;
