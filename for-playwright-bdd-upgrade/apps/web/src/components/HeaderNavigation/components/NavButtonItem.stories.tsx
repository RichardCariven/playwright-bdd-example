import { SearchFilledIcon, SearchIcon } from "@rayo/ui/icons/Search";
import type { Meta, StoryObj } from "@storybook/react";

import NavButtonItem from "./NavButtonItem";

const meta = {
  title: "Web App Components/HeaderNavigation/components/NavButtonItem",
  component: NavButtonItem,
  parameters: {
    decorator: "web-app-component",
  },
  args: {
    label: "Search",
    Icon: SearchIcon,
    IconHover: SearchFilledIcon,
  },
} satisfies Meta<typeof NavButtonItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
