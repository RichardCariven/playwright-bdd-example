import type { Meta, StoryObj } from "@storybook/react";

import Icons from "./Icons";

const meta = {
  title: "UI Library/Design-System/Icons",
  component: Icons,
} satisfies Meta<typeof Icons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
