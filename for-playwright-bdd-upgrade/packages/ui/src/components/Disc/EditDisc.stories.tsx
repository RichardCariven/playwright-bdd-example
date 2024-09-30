import type { Meta, StoryObj } from "@storybook/react";

import { EditDisc } from "./EditDisc";

const meta = {
  title: "UI Library/Disc",
  component: EditDisc,
  args: {
    handleClick: () => undefined,
    disabled: false,
    title: "Edit",
  },
} satisfies Meta<typeof EditDisc>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Edit = {} satisfies Story;
