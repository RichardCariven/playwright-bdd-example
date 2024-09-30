import type { Meta, StoryObj } from "@storybook/react";

import { ShowsOnAir } from "./ShowsOnAir";

const meta = {
  title: "Web App Components/ShowsOnAir",
  parameters: {
    decorator: "web-app-component",
  },
  component: ShowsOnAir,
} satisfies Meta<typeof ShowsOnAir>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
