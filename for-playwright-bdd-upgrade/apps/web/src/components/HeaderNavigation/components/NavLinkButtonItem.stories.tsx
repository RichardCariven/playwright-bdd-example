import { SearchFilledIcon, SearchIcon } from "@rayo/ui/icons/Search";
import type { Meta, StoryObj } from "@storybook/react";

import NavLinkButtonItem from "./NavLinkButtonItem";

const meta = {
  title: "Web App Components/HeaderNavigation/components/NavLinkButtonItem",
  component: NavLinkButtonItem,
  parameters: {
    decorator: "web-app-component",
  },
  args: {
    href: "",
    label: "Search",
    Icon: SearchIcon,
    IconHover: SearchFilledIcon,
  },
} satisfies Meta<typeof NavLinkButtonItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
