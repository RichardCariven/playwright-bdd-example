import type { Meta, StoryObj } from "@storybook/react";

import { StationListItem } from "./StationListItem";

const meta = {
  title: "UI Library/List Items/Station List Item",
  component: StationListItem,
  args: {
    imgAlt: "station",
    href: "/",
    imageSrc:
      "https://media.bauerradio.com/image/upload/c_crop,g_custom/q_auto,w_256/v1678798986/brand_manager/stations/gd4jspqbga8mgvbmffaf.png",
    title: "Hits Radio",
    description: "Listen to the best music",
  },
} satisfies Meta<typeof StationListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;

export const InContainers = {
  decorators: [
    (Story) => (
      <div className="flex w-full flex-col gap-4">
        <p className="text-center text-neutral-darker body-s-medium">
          Fills parent flex container to max width of 348px
        </p>
        <div className="m-auto flex w-full max-w-sm justify-center border-2 border-dashed border-red-500">
          <Story />
        </div>

        <p className="text-center text-neutral-darker body-s-medium">
          Shrinks to min width of 320px
        </p>
        <div className="m-auto flex w-full max-w-80 justify-center border-2 border-dashed border-red-500">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Story;

export const LongText = {
  args: {
    title: "Hits Radio with a super mega mega long name",
    description: "Hits Radio with a super mega mega long description",
  },
} satisfies Story;

export const Loading = {
  args: {
    isSkeleton: true,
  },
} satisfies Story;
