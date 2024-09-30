import { stations } from "@rayo/fetch-client/mocks/lapi/stations";
import type { Meta, StoryObj } from "@storybook/react";

import { StationDiscCarousel } from "./StationDiscCarousel";

const meta = {
  title: "Web App Components/Station Disc Carousel",
  component: StationDiscCarousel,
  args: {
    stations: stations.slice(0, 20),
  },
  parameters: {
    decorator: "web-app-component",
  },
} satisfies Meta<typeof StationDiscCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const ThreeStations = {
  args: {
    stations: stations.slice(0, 3),
  },
} satisfies Story;

export const WithEditDisc = {
  args: {
    stations: stations.slice(0, 3),
    withEditDisc: true,
  },
} satisfies Story;
