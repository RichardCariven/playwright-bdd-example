"use client";

import { useState } from "react";

import useNowPlaying from "@web/hooks/useNowPlaying/useNowPlaying";

export const NowPlayingTest = ({ stationCode }: { stationCode: string }) => {
  const { data, isLoading } = useNowPlaying({ stationCode });

  if (!data && isLoading) {
    return (
      <p>
        <i>loading ...</i>
      </p>
    );
  }

  if (data?.stationNowPlaying?.nowPlayingArtist) {
    return (
      <p>
        {data.stationNowPlaying.nowPlayingArtist} -{" "}
        {data.stationNowPlaying.nowPlayingTrack}
      </p>
    );
  }

  if (data?.stationOnAir?.episodeTitle) {
    return <p>{data.stationOnAir.episodeTitle}</p>;
  }

  return (
    <p>
      <i>no data</i>
    </p>
  );
};

export const NowPlayingTestWrapper = ({
  stationCode,
  mounted,
}: {
  stationCode: string;
  mounted?: boolean;
}) => {
  const [mount, setMount] = useState(mounted);

  return (
    <fieldset className="m-5 bg-neutral-light p-5">
      <legend className="font-bold">{stationCode}</legend>
      <p>
        <button className="ring-1" onClick={() => setMount(!mount)}>
          {mount ? "unmount" : "mount"}
        </button>
      </p>
      {mount && <NowPlayingTest stationCode={stationCode} />}
    </fieldset>
  );
};
