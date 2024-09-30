import type { Meta, StoryObj } from "@storybook/react";

import { SectionHeader } from "./SectionHeader";

const meta = {
  title: "UI Library/SectionHeader",
  component: SectionHeader,
  args: {
    linkName: "Link",
    heading: "Heading",
    // eslint-disable-next-line no-console
    onLeftClick: () => console.log("Left Clicked"),
    // eslint-disable-next-line no-console
    onRightClick: () => console.log("Right Clicked"),
    variant: "default",
    isSkeleton: false,
    ariaLabelLeft: "",
    ariaLabelRight: "",
  },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    linkName: "Link",
    heading: "Heading",
    link: {
      href: "#",
    },
  },
} satisfies Story;

export const OnlyButtons = {
  args: {
    heading: undefined,
  },
} satisfies Story;

export const LongText = {
  args: {
    linkName: "Link with long text super long text super lonng long super",
    heading:
      "Heading super long text super long text super long text super long text super long text super long text super long super long long text super long text super long text super long text super long super long long text super long text super long text super long text super long super long",
    link: {
      href: "#",
    },
  },
} satisfies Story;

export const DisabledButtons = {
  args: {
    rightDisabled: true,
    leftDisabled: true,
    link: {
      href: "#",
    },
  },
} satisfies Story;

export const DefaultSkeleton = {
  args: {
    linkName: "Link",
    heading: "My heading",
    isSkeleton: true,
    link: {
      href: "#",
    },
  },
} satisfies Story;

export const WithImage = {
  args: {
    heading: "2010s",
    subHeading: "because you like",
    variant: "withImage",
    imgSrc:
      "https://bauer-radio-helix-public.s3.eu-west-2.amazonaws.com/production-cms/image/Dance_Onboarding_abd0172946.png",
    imgAlt: "Dance img",
  },
} satisfies Story;

export const WithImageLongText = {
  args: {
    heading: "My heading is very long super long Lorem ipsum dolor sit",
    subHeading:
      "My sub heading Lorem ipsum dolor sit amet, qui minim labore adipisicing minim",
    variant: "withImage",
    imgSrc:
      "https://bauer-radio-helix-public.s3.eu-west-2.amazonaws.com/production-cms/image/Dance_Onboarding_abd0172946.png",
    imgAlt: "Dance img",
  },
} satisfies Story;

export const WithImageSkeleton = {
  args: {
    heading: "2010s",
    subHeading: "because you like",
    variant: "withImage",
    isSkeleton: true,
    imgSrc:
      "https://bauer-radio-helix-public.s3.eu-west-2.amazonaws.com/production-cms/image/Dance_Onboarding_abd0172946.png",
    imgAlt: "Dance img",
  },
} satisfies Story;
