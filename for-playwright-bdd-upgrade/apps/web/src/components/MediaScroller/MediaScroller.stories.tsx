import {
  ForYouEpisodeCard,
  IconButton,
  type ForYouEpisodeCardProps,
} from "@rayo/ui/components";
import { PlayFilledIcon } from "@rayo/ui/icons/Play";
import type { Meta, StoryObj } from "@storybook/react";

import { MediaScroller } from "./MediaScroller";

const show: ForYouEpisodeCardProps = {
  type: "on-air",
  tagText: "On-air",
  show: {
    image:
      "https://media.bauerradio.com/image/upload/q_auto,c_fill,g_faces,w_500,h_500/v1721843069/shows/nwlkpoyo5xnngqsuv7dj.png",
    title: "Magic Breakfast with Harriet Scott",
    link: {
      href: "https://hellorayo.co.uk/magic/shows/magic-breakfast-harriet-scott/",
      hardNav: true,
      target: "_blank",
    },
    startTime: "2024-07-09 10:00:00",
    length: 3600,
  },
  station: {
    logo: "https://media.bauerradio.com/image/upload/c_crop,g_custom/v1717186714/brand_manager/stations/jsezzqimdkcuy0ood8q8.png",
    link: {
      href: "https://hellorayo.co.uk/magic/",
      hardNav: true,
      target: "_blank",
    },
  },
  nowPlaying: {
    type: "description",
    description:
      "Your favourite duo is here to brighten your weekday mornings. Test your knowledge with Don’t Google This At Home or try and beat the hardest game on radio The Reflex. Email us at morning@magic.co.uk",
  },
  playButton: (
    <IconButton
      className="z-[1] shrink-0"
      Icon={PlayFilledIcon}
      aria-label="Play"
      size="md"
    />
  ),
};

const meta = {
  title: "Web App Components/Media Scroller",
  parameters: {
    decorator: "web-app-component",
  },
  component: MediaScroller,
} satisfies Meta<typeof MediaScroller>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: [
      <ForYouEpisodeCard key={0} className="snap-start" {...show} />,
      <ForYouEpisodeCard key={1} className="snap-start" {...show} />,
      <ForYouEpisodeCard key={2} className="snap-start" {...show} />,
      <ForYouEpisodeCard key={3} className="snap-start" {...show} />,
      <ForYouEpisodeCard key={4} className="snap-start" {...show} />,
      <ForYouEpisodeCard key={5} className="snap-start" {...show} />,
      <ForYouEpisodeCard key={6} className="snap-start" {...show} />,
      <ForYouEpisodeCard key={7} className="snap-start" {...show} />,
    ],
  },
} satisfies Story;

export const FewerChildren = {
  args: {
    children: [
      <ForYouEpisodeCard key={0} className="snap-start" {...show} />,
      <ForYouEpisodeCard key={1} className="snap-start" {...show} />,
    ],
  },
} satisfies Story;
