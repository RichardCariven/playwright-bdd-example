import { type Locale } from "@rayo/localisation/i18n";
import { getCountryFromLocale } from "@rayo/localisation/server";

import { listenApi } from "../..";
import { handleError } from "../helix/handleError";
import { getAggregatorBrand } from "./getAggregatorBrand";

export const getFeaturedStations = async ({
  locale,
  aggregatorBrandCode,
}: {
  locale: Locale;
  aggregatorBrandCode: string;
}) => {
  const oneHour = 3600;
  const country = getCountryFromLocale(locale);

  try {
    const brand = await getAggregatorBrand({ aggregatorBrandCode });
    const stationIds = brand.StationIds;

    const { data: stations, error: stationsError } = await listenApi.GET(
      "/stations/{regionCode}",
      {
        params: {
          path: {
            regionCode: country.toUpperCase() as Uppercase<typeof country>,
          },
          query: {
            "StationId[]": stationIds,
          },
        },
        next: { revalidate: oneHour },
      },
    );

    if (stationsError) {
      throw new Error("LAPI -> /stations request failed");
    }

    return stations.sort(
      (a, b) =>
        stationIds.indexOf(a.stationId) - stationIds.indexOf(b.stationId),
    );
  } catch (error) {
    handleError({
      message: "Error in getAllStations",
      error,
    });
  }
};
