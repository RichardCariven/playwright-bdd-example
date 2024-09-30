import type { Meta, StoryObj } from "@storybook/react";

import { ColoursVariable } from "./ColoursVariable";

const meta = {
  title: "UI Library/Design-System/Colours",
  component: ColoursVariable,
} satisfies Meta<typeof ColoursVariable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variables = {
  args: {},
} satisfies Story;
