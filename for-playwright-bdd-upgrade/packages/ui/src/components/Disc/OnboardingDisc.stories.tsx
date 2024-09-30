import type { Meta, StoryObj } from "@storybook/react";

import { OnboardingDisc } from "./OnboardingDisc";

const meta = {
  title: "UI Library/Disc",
  component: OnboardingDisc,
  args: {
    id: "old-school",
    loading: false,
    disabled: false,
    title: "Rap",
    imageSrc:
      "https://bauer-radio-helix-public.s3.eu-west-2.amazonaws.com/production-cms/image/Rap_Onboarding_0e682084df.png",
  },
} satisfies Meta<typeof OnboardingDisc>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Onboarding = {} satisfies Story;

export const OnboardingSelected = {
  args: {
    defaultChecked: true,
  },
} satisfies Story;
