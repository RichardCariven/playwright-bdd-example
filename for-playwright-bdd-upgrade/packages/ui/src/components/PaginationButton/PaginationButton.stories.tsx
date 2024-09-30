import type { Meta, StoryObj } from "@storybook/react";

import { PaginationButton } from "./PaginationButton";

const meta = {
  title: "UI Library/Pagination Button",
  component: PaginationButton,
  args: {
    variant: "default",
    onClick: () => null,
  },
} satisfies Meta<typeof PaginationButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <div className="flex gap-2 bg-purple-500">
      <PaginationButton {...args} variant="active" />
      <PaginationButton {...args} />
      <PaginationButton {...args} />
    </div>
  ),
} satisfies Story;
