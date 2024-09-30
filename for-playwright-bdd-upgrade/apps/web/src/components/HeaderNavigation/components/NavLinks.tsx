import { BroadcastFilledIcon, BroadcastIcon } from "@rayo/ui/icons/Broadcast";
import { NewsFilledIcon, NewsIcon } from "@rayo/ui/icons/News";
import { OnDemandFilledIcon, OnDemandIcon } from "@rayo/ui/icons/OnDemand";
import { PodcastIcon, PodcastIconFilled } from "@rayo/ui/icons/Podcast";
import { TrophyFilledIcon, TrophyIcon } from "@rayo/ui/icons/Trophy";

import NavLinkItem from "./NavLinkItem";

export type NavLinksType = {
  items?: {
    onAir?: boolean;
    music?: boolean;
    podcasts?: boolean;
    news?: boolean;
    win?: boolean;
  };
  mobile?: boolean;
};

export default function NavLinks({ mobile, items = {} }: NavLinksType) {
  items = {
    onAir: true,
    music: true,
    podcasts: true,
    news: true,
    win: true,
    ...items,
  };

  return (
    <>
      {items.onAir && (
        <NavLinkItem
          label="On Air"
          href="stations"
          Icon={BroadcastIcon}
          IconHover={BroadcastFilledIcon}
          mobile={mobile}
        />
      )}
      {items.music && (
        <NavLinkItem
          label="Music"
          href=""
          Icon={OnDemandIcon}
          IconHover={OnDemandFilledIcon}
          mobile={mobile}
        />
      )}
      {items.podcasts && (
        <NavLinkItem
          label="Podcasts"
          href=""
          Icon={PodcastIcon}
          IconHover={PodcastIconFilled}
          mobile={mobile}
        />
      )}
      {items.news && (
        <NavLinkItem
          label="News"
          href=""
          Icon={NewsIcon}
          IconHover={NewsFilledIcon}
          mobile={mobile}
        />
      )}
      {items.win && (
        <NavLinkItem
          label="Win"
          href=""
          Icon={TrophyIcon}
          IconHover={TrophyFilledIcon}
          mobile={mobile}
        />
      )}
    </>
  );
}
