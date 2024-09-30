import React from "react";

import { type LapiSchema } from "@rayo/fetch-client";
import { getCrowdinTranslations, getLocale } from "@rayo/localisation/server";
import { DiscLink, EditDisc } from "@rayo/ui/components";

import { MediaScrollerWrapper } from "./Components/MediaScrollerWrapper";

export interface StationDiscCarouselProps {
  stations: LapiSchema.components["schemas"]["StationMinified"][];
  withEditDisc?: boolean;
}

export const StationDiscCarousel = async ({
  stations,
  withEditDisc,
}: StationDiscCarouselProps) => {
  const locale = getLocale();
  const t = await getCrowdinTranslations(locale, ["server-common"]);

  return (
    <MediaScrollerWrapper>
      {stations.map((station) => (
        <DiscLink
          title={station.stationName}
          imageSrc={station.stationListenBarLogo}
          className="snap-start scroll-ml-4"
          key={station.stationId}
          href={`/stations/${station.stationDADIChannelId}`}
        />
      ))}
      {withEditDisc && (
        <EditDisc
          title={t("station-disc-carousel-edit")}
          className="snap-start scroll-ml-4"
        />
      )}
    </MediaScrollerWrapper>
  );
};
