/**
 * WS responses with the latest now playing event what is either "stationNowPlaying" or "stationOnAir" object
 * With WS we override initial now playing data coming from api and fallback on api polling if WS has an error
 */

"use client";

import { type LapiSchema } from "@rayo/fetch-client";
import { useListenApi } from "@rayo/fetch-client/hooks/lapi/index";
import { useLocale } from "@rayo/localisation";
import { getCountryFromLocale } from "@rayo/localisation/server";
import usePusherNowPlaying from "@web/hooks/pusher/usePusherNowPlaying";

type NowPlaying = {
  data?: LapiSchema.components["schemas"]["StationNowPlaying"];
  isLoading: boolean;
};

export default function useNowPlaying({
  stationCode,
  hls,
}: {
  stationCode: string;
  hls?: boolean;
}): NowPlaying {
  const locale = useLocale();
  const regionCode = getCountryFromLocale(
    locale,
  ).toUpperCase() as LapiSchema.components["schemas"]["RegionCode"];
  const ws = usePusherNowPlaying({ stationCode, hls });
  const api = useListenApi(
    "/stations_nowplaying/{regionCode}",
    {
      params: {
        path: {
          regionCode: regionCode,
        },
        // @ts-expect-error "StationCode[]" type definition is not correct
        query: { "StationCode[]": stationCode, premium: 1 },
      },
    },
    {
      refreshInterval: ws.error ? 1000 * 30 : 0,
      dedupingInterval: 1000 * 20,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const isLoading = (!ws.error && !ws.data) || (!api.error && api.isLoading);

  if (ws.error && api.data) {
    return { data: api.data[0], isLoading };
  }

  if (ws.data && api.data) {
    return {
      data: {
        ...api.data[0],
        ...ws.data,
      },
      isLoading,
    };
  }

  return { data: undefined, isLoading };
}
