import * as React from "react";

import { formatAMPM, formatEpisodeLength } from "../../helpers/time-dates";
import { cn } from "../../tailwind/utils/cn";
import { PremiumIcon } from "../Icons/Premium";
import Image from "../Image/Image";
import { Link, type LinkProps } from "../Link/Link";
import { TrackListItem, type TrackListUnion } from "../ListItems/TrackListItem";
import { StationDisc } from "../StationDisc/StationDisc";
import { Tag } from "../Tag/Tag";

export interface ForYouEpisodeCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type: "on-air" | "on-demand";
  tagText: string;
  show: {
    image: string;
    title: string;
    link: LinkProps;
    startTime: string;
    length: number;
  };
  station: {
    logo: string;
    link: LinkProps;
  };
  nowPlaying: TrackListUnion;
  isPremium?: boolean;
  isLoading?: boolean;
  playButton: React.ReactNode;
}

function ForYouEpisodeCard({
  className,
  type,
  tagText,
  show,
  station,
  nowPlaying,
  isPremium,
  isLoading,
  playButton,
  ...props
}: ForYouEpisodeCardProps) {
  const parentClassNames = "h-[278px] w-[327px] rounded-2xl bg-neutral-light p-6 md:h-80 md:w-[325px]"; // prettier-ignore

  if (isLoading) {
    return (
      <div className={cn(parentClassNames)}>
        <div className="flex items-start justify-between">
          <div className="size-[72px] animate-pulse rounded-lg bg-neutral-dark md:size-[88px]" />
          <div className="flex items-center">
            <Tag isLoading className="mr-2" />
            <div className="size-8 animate-pulse rounded-full bg-neutral-dark" />
          </div>
        </div>
        <div className="mt-6 h-3 w-20 animate-pulse rounded bg-neutral-dark md:mt-[42px]" />
        <div className="mt-[0.625rem] h-11 animate-pulse md:h-[52px]">
          <div className="h-4 w-5/6 rounded bg-neutral-dark md:h-5" />
          <div className="mt-2 h-4 w-3/5 rounded bg-neutral-dark md:h-5" />
        </div>
        <div className="mt-5 flex items-center gap-4">
          <TrackListItem type="description" description="" isLoading />
          <div className="size-12 shrink-0 animate-pulse rounded-full bg-neutral-dark" />
        </div>
      </div>
    );
  }

  return (
    <article
      title={show.title}
      className={cn(parentClassNames, "group relative", className)}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="size-[72px] overflow-hidden rounded-lg duration-300 ease-in-out group-hover:brightness-[.8] group-active:brightness-100 md:size-[88px]">
          <Image
            className="object-cover duration-300 ease-in-out group-hover:scale-125 group-active:scale-100"
            width={144}
            height={144}
            src={show.image}
            alt={show.title}
          />
        </div>
        <div className="flex items-center">
          <Tag
            className="mr-2"
            variant={type === "on-air" ? "on-air" : "white"}
          >
            {tagText}
          </Tag>
          <Link className="z-[1]" {...station.link}>
            <StationDisc
              imageSrc={station.logo}
              alt={show.title}
              variant="default"
              size="sm"
            />
          </Link>
        </div>
      </div>
      <div className="mt-6 text-neutral-darker label-s-semibold md:mt-[42px]">
        {type === "on-air"
          ? formatAMPM(show.startTime, show.length)
          : formatEpisodeLength(show.length)}
      </div>
      <div className="mt-[0.625rem] line-clamp-2 h-11 text-neutral heading-s-bold md:h-[52px] md:heading-m-bold">
        {isPremium ? (
          <span className="relative -ml-1 inline-block w-8">
            <PremiumIcon className="absolute -bottom-[7px] left-0" />
          </span>
        ) : null}
        <Link
          className="before:absolute before:inset-0 before:z-0 before:content-[''] focus-visible:absolute focus-visible:outline-primary"
          {...show.link}
        >
          {show.title}
        </Link>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <TrackListItem {...nowPlaying} />
        {playButton}
      </div>
    </article>
  );
}

export { ForYouEpisodeCard };
