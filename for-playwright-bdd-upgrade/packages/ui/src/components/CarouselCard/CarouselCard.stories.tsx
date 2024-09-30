import type { Meta, StoryObj } from "@storybook/react";

import { CarouselCard } from "./CarouselCard";

const meta = {
  title: "UI Library/CarouselCard",
  component: CarouselCard,
} satisfies Meta<typeof CarouselCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card = {
  args: {
    title: (
      <>
        Say <span className="italic">hello</span> to{" "}
        <span className="block font-bold md:inline">Rayo</span>
      </>
    ),
    subtitle: "The home of your favourite artists, presenters and more!",
    bg: "/static-assets/hero-carousel/Background-Large.webp",
    mobileBg: "/static-assets/hero-carousel/Background-Mobile.png",
    focalImage: "/static-assets/hero-carousel/Model-Large.webp",
    buttons: [
      {
        type: "link",
        variant: "secondary",
        href: "https://about.hellorayo.co.uk",
        label: "Learn more",
        hardNav: true,
        target: "_blank",
      },
    ],
  },
} satisfies Story;
