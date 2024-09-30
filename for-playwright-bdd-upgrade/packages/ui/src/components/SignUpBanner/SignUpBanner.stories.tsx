import type { Meta, StoryObj } from "@storybook/react";

import { SignUpBanner } from "./SignUpBanner";

const meta = {
  title: "UI Library/Sign Up Banner",
  parameters: {
    layout: "padded",
  },
  component: SignUpBanner,
  args: {
    signInBtnText: "Sign In",
    signUpBtnText: "Sign Up",
    heading: "Sign in to listen to Rayo",
    description: "Listening to live radio and on-demand has never been so easy",
  },
} satisfies Meta<typeof SignUpBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
