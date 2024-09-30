"use client";

import { type LapiSchema } from "@rayo/fetch-client/";
import { useCrowdin, useLocale } from "@rayo/localisation";
import { ForYouEpisodeCard, IconLinkButton } from "@rayo/ui/components";
import { PlayFilledIcon } from "@rayo/ui/icons/Play";
import { type TrackListUnion } from "@rayo/ui/src/components/ListItems/TrackListItem";
import useNowPlaying from "@web/hooks/useNowPlaying/useNowPlaying";

export type ForYouEpisodeCardStation = Pick<
  LapiSchema.components["schemas"]["Station"],
  | "stationName"
  | "stationCode"
  | "stationDADIChannelId"
  | "stationListenBarLogo"
>;

export const ForYouEpisodeCardWrapper = ({
  station,
}: {
  station: ForYouEpisodeCardStation;
}) => {
  const locale = useLocale();
  const t = useCrowdin(["client-common"]);
  const { data, isLoading } = useNowPlaying({
    stationCode: station.stationCode,
  });

  const { stationNowPlaying, stationOnAir } = data ?? {};

  let nowPlaying: TrackListUnion;

  if (
    stationNowPlaying?.nowPlayingTrackId === 0 ||
    stationNowPlaying?.nowPlayingTrack === ""
  ) {
    nowPlaying = {
      type: "description",
      description: stationOnAir?.episodeDescription ?? "",
    };
  } else {
    nowPlaying = {
      type: "track",
      image: stationNowPlaying?.nowPlayingSmallImage ?? "",
      title: stationNowPlaying?.nowPlayingTrack ?? "",
      artist: stationNowPlaying?.nowPlayingArtist ?? "",
      timestamp: undefined,
    };
  }

  const stationPageLink = `${station.stationDADIChannelId}`;
  return (
    <ForYouEpisodeCard
      className="snap-center"
      type="on-air"
      tagText={t("for-you-episode-card-on-air")}
      show={{
        image:
          stationOnAir?.episodeImageUrl || station.stationListenBarLogo || "",
        title: stationOnAir?.episodeTitle || station.stationName || "",
        link: {
          locale,
          href: stationPageLink,
          hardNav: true,
        },
        startTime: stationOnAir?.episodeStart ?? "",
        length: stationOnAir?.episodeDuration ?? 0,
      }}
      nowPlaying={nowPlaying}
      station={{
        logo: station.stationListenBarLogo ?? "",
        link: {
          locale,
          href: stationPageLink,
          hardNav: true,
        },
      }}
      playButton={
        <IconLinkButton
          className="z-[1] shrink-0"
          Icon={PlayFilledIcon}
          aria-label={t("play-button")}
          size="md"
          title={station.stationName || ""}
          href={`${station.stationDADIChannelId}/play`}
          target="_blank"
          hardNav
        />
      }
      isLoading={isLoading}
    />
  );
};
