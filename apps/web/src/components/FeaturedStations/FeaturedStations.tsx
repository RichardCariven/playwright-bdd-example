import { getFeaturedStations } from "@rayo/fetch-client/helpers/lapi/index";
import { getCrowdinTranslations, getLocale } from "@rayo/localisation/server";
import { StationListItem } from "@rayo/ui/components";
import { getRegionalConfig } from "@web/config";
import { shuffle } from "@web/helpers/array-shuffle/array-shuffle";

import { MediaScrollerWrapper } from "./components/StationDiscMediaScrollerWrapper";

export const FeaturedStations = async () => {
  const locale = getLocale();
  const { aggregatorBrandCode } = getRegionalConfig(locale, "COMMON");
  const t = await getCrowdinTranslations(locale, ["server-common"]);
  const stations = await getFeaturedStations({
    locale,
    aggregatorBrandCode,
  });

  return (
    <MediaScrollerWrapper
      heading={t("featured-stations-heading")}
      linkName={t("featured-stations-all-stations")}
    >
      {shuffle(stations).map((station) => (
        <StationListItem
          imgAlt={station.stationName}
          imageSrc={station.stationListenBarLogo}
          title={station.stationName}
          description={station.stationStrapline}
          key={station.stationId}
          href={`/${station.stationDADIChannelId}`}
          className="snap-start"
        />
      ))}
    </MediaScrollerWrapper>
  );
};
