import { getFeaturedStations } from "@rayo/fetch-client/helpers/lapi/index";
import { getLocale } from "@rayo/localisation/server";
import { getRegionalConfig } from "@web/config";

import { ForYouEpisodeCardWrapper } from "./components/ForYouEpisodeCardWrapper";
import { MediaScrollerWrapper } from "./components/MediaScrollerWrapper";

export const ShowsOnAir = async () => {
  const locale = getLocale();
  const { aggregatorBrandCode } = getRegionalConfig(locale, "COMMON");
  const stations = await getFeaturedStations({
    locale,
    aggregatorBrandCode,
  });

  const reducedStations = stations?.map(
    ({
      stationId,
      stationCode,
      stationDADIChannelId,
      stationListenBarLogo,
    }) => ({
      stationId,
      stationCode,
      stationDADIChannelId,
      stationListenBarLogo,
    }),
  );

  return (
    <MediaScrollerWrapper>
      {reducedStations &&
        reducedStations.map((station) => {
          return (
            <ForYouEpisodeCardWrapper
              key={station.stationId}
              station={station}
            />
          );
        })}
    </MediaScrollerWrapper>
  );
};
