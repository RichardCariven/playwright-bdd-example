import { type Locale } from "@rayo/localisation/i18n";
import { getCountryFromLocale } from "@rayo/localisation/server";

import { listenApi } from "../..";
import { type components } from "../../schemas/lapi";
import { handleError } from "../helix/handleError";

interface FetchResponse {
  data: components["schemas"]["StationMinified"][] | null;
}

export const getAllStations = async ({
  locale,
}: {
  locale: Locale;
}): Promise<FetchResponse> => {
  try {
    const country = getCountryFromLocale(locale ?? "en-gb");
    const { data: stations, error: stationsError } = await listenApi.GET(
      "/stations/{regionCode}",
      {
        params: {
          path: {
            regionCode: country as Uppercase<typeof country>,
          },
        },
      },
    );

    if (stationsError) {
      throw new Error("No stations found for region");
    }

    return { data: stations };
  } catch (error) {
    handleError({
      message: "Error in getAllStations",
      error,
    });
  }
};
