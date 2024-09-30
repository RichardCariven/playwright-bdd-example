import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { PodcastIcon } from "../../Icons/Podcast";
import { Input } from "./Input";

const meta = {
  title: "UI Library/Forms/Input",
  component: Input,
  args: {
    id: "test-id",
    disabled: false,
    type: "text",
    placeholder: "Postcode e.g. W9 1AG",
    label: "What's your postcode?",
    description: "Enter your postcode for an enhanced local experience",
    required: false,
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;

export const Error = {
  args: {
    defaultValue: "W9 1AG",
    errorMessage: "There was an error processing your postcode",
  },
} satisfies Story;

export const WithIcon = {
  args: {
    icon: <PodcastIcon className="fill-neutral-darker" />,
  },
} satisfies Story;
