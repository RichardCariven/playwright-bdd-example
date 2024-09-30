import type { Meta, StoryObj } from "@storybook/react";

import StationsNearYou from "./StationsNearYou";

const meta = {
  title: "Web App Components/OnBoarding/components/StationsNearYou",
  component: StationsNearYou,
  parameters: {
    decorator: "web-app-component",
  },
} satisfies Meta<typeof StationsNearYou>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
