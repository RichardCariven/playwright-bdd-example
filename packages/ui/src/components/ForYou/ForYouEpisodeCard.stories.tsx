import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "../IconButton/IconButton";
import { PlayFilledIcon } from "../Icons/Play";
import { ForYouEpisodeCard } from "./ForYouEpisodeCard";

const meta = {
  title: "UI Library/For You/For You Episode Card",
  component: ForYouEpisodeCard,
  args: {
    type: "on-air",
    tagText: "On-air",
    show: {
      image:
        "https://media.bauerradio.com/image/upload/q_auto,c_fill,g_faces,w_180,h_180/v1681306084/shows/rcrkqqxkzxkjuw6awjjf.png",
      title: "Magic Breakfast with Ronan and Harriet",
      link: {
        href: "https://hellorayo.co.uk/magic/shows/magic-breakfast-with-ronan-and-harriet/",
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
  },
} satisfies Meta<typeof ForYouEpisodeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnAirSong = {
  args: {
    nowPlaying: {
      type: "track",
      title: "Physical",
      artist: "Dua Lipa",
      image:
        "https://media.bauerradio.com/image/upload/tracks/160x160/169097.jpg?ver=1580451372",
    },
  },
} satisfies Story;

export const OnAirSongPremium = {
  args: {
    isPremium: true,
    nowPlaying: {
      type: "track",
      title: "History",
      artist: "Joel Corry, Becky Hill",
      image:
        "https://media.bauerradio.com/image/upload/tracks/160x160/169097.jpg?ver=1580451372",
    },
  },
} satisfies Story;

export const OnAirDescription = {
  args: {
    show: {
      ...meta.args.show,
      title:
        "Magic Breakfast with Ronan and Harriet and Ronan and Harriet and Ronan and Harriet",
    },
  },
};

export const OnDemand = {
  args: {
    type: "on-demand",
    tagText: "Episode",
    show: { ...meta.args.show, length: 3300 },
  },
} satisfies Story;

export const Loading = {
  args: {
    isLoading: true,
  },
  parameters: {
    chromatic: { pauseAnimationAtEnd: false },
  },
} satisfies Story;
