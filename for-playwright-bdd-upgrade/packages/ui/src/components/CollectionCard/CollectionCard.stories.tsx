import type { Meta, StoryObj } from "@storybook/react";

import { EpisodeCard } from "../EpisodeCard/EpisodeCard";
import { CollectionCard } from "./CollectionCard";

const EpCard = () => (
  <EpisodeCard
    href="#"
    title="Magic’s Biggest Summer Showdown"
    imageSrc="https://assets.planetradio.co.uk/artist/1-1/320x320/253.jpg?ver=1465083315"
    stationImageSrc="https://media.bauerradio.com/image/upload/c_crop,g_custom/q_auto,w_256/v1678798986/brand_manager/stations/gd4jspqbga8mgvbmffaf.png"
    durationLabel="55 mins"
  />
);

const meta = {
  title: "UI Library/On-Demand Cards/Collection Card",
  component: CollectionCard,
  args: {
    isSkeleton: false,
    ariaLoadingText: "Loading",
    title: "Soundtracks from the Movies",
    ariaMoveLeft: "Move left",
    ariaMoveRight: "Move right",
    bgSrc: "",
    bgLayerSrc: "collection-card-layerbg.png",
  },
} satisfies Meta<typeof CollectionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimarySingle = {
  args: {
    children: <EpCard key={1} />,
  },
} satisfies Story;

export const PrimaryMultiple = {
  args: {
    children: [
      <EpCard key={1} />,
      <EpCard key={2} />,
      <EpCard key={3} />,
      <EpCard key={4} />,
      <EpCard key={5} />,
    ],
  },
} satisfies Story;

export const PrimaryWithTitleLink = {
  args: {
    titleLink: { href: "#", locale: undefined },
    children: [
      <EpCard key={1} />,
      <EpCard key={2} />,
      <EpCard key={3} />,
      <EpCard key={4} />,
      <EpCard key={5} />,
    ],
  },
} satisfies Story;

export const PrimarySkeleton = {
  args: { isSkeleton: true, children: <></> },
} satisfies Story;
