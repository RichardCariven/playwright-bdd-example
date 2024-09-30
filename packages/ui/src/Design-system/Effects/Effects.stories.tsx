import type { Meta, StoryObj } from "@storybook/react";

import { Effects } from "./Effects";

const meta = {
  title: "UI Library/Design-System/Effects",
  component: Effects,
} satisfies Meta<typeof Effects>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {},
} satisfies Story;
