import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "./Link";

const meta = {
  title: "UI Library/Link",
  component: Link,
  args: {
    href: "",
    children: "This is a link",
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;
