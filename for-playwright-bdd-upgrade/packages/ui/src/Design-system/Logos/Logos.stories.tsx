import type { Meta, StoryObj } from "@storybook/react";

import Logos from "./Logos";

const meta = {
  title: "UI Library/Design-System/Logos",
  component: Logos,
} satisfies Meta<typeof Logos>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
