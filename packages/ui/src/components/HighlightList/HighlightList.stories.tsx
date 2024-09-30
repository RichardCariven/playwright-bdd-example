import type { Meta, StoryObj } from "@storybook/react";

import LocationIcon from "../Icons/Location";
import { NewsIcon } from "../Icons/News";
import SettingsIcon from "../Icons/Settings";
import { HighlightList, HighlightListItem } from "./HighlightList";

const meta = {
  title: "UI Library/Highlight List Item",
  component: HighlightListItem,
  args: {
    Icon: LocationIcon,
    title: "Highlight title",
    subtitle: "Highlight subtitle",
  },
} satisfies Meta<typeof HighlightListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HightlightListItem = {} satisfies Story;

export const HighlightListItems = {
  render: function Render(_args) {
    return (
      <HighlightList className="flex max-w-[327px] flex-col gap-6">
        <HighlightListItem
          Icon={LocationIcon}
          title="Find your local stations"
          subtitle="Find all your favourite local stations and content based on your postcode"
        />
        <HighlightListItem
          Icon={NewsIcon}
          title="Relevant content"
          subtitle="Listen to news, weather, traffic updates, and more based on your postcode"
        />
        <HighlightListItem
          Icon={SettingsIcon}
          title="Update postcode"
          subtitle="You can change this anytime in settings"
        />
      </HighlightList>
    );
  },
} satisfies Story;
