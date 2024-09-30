import { listenApi } from "@rayo/fetch-client";
import {
  getCountryFromLocale,
  getCrowdinTranslations,
  getLocale,
} from "@rayo/localisation/server";
import { Link, type OnBoardDiscProps } from "@rayo/ui/components";
import { cn } from "@rayo/ui/tailwind/utils/cn";
import { getRegionalConfig } from "@web/config";

import { Items } from "./Items";

export default async function StationsNearYou({
  postcode,
}: {
  postcode?: string;
}) {
  const locale = getLocale();

  // TODO: Do we need "en-gb" fallbacks here or should we always assume that we get the locale?
  const country = getCountryFromLocale(locale ?? "en-gb");
  const t = await getCrowdinTranslations(locale ?? "en-gb", ["server-common"]);
  const { defaultNearYouStations } = getRegionalConfig(
    locale ?? "en-gb",
    "ONBOARDING",
  );

  // TODO: Instead of using static lat and long, use postcode when it is possible

  const { data: localStationCodes } = await listenApi.GET(
    "/localstations/{regionCode}",
    {
      params: {
        path: { regionCode: country },
        query: { latitude: "54.60073471", longitude: "-5.91652155" },
      },
    },
  );

  const { data: stations } = await listenApi.GET("/stations/{regionCode}", {
    params: {
      path: {
        regionCode: country as Uppercase<typeof country>,
      },
    },
  });

  const stationCodes = [
    ...(defaultNearYouStations ?? []),
    ...(localStationCodes ?? []),
  ];

  const filteredStations =
    stations?.filter((station) => stationCodes.includes(station.stationCode)) ??
    [];

  const stationsNearYou: OnBoardDiscProps[] = filteredStations.map(
    (station) => ({
      id: station.stationCode,
      imageSrc: station.stationListenBarLogo,
      title: station.stationName,
    }),
  );

  return (
    <section className="mb-8 flex flex-col">
      <div className="mx-[1.625rem] flex flex-col sm:items-center">
        <h2
          className={cn("mb-1 text-neutral heading-s-bold", {
            "mb-7": postcode,
          })}
          aria-live="polite"
        >
          {t("onboarding-stations-near-you")}
        </h2>
        {!postcode && (
          <p className="mb-7 text-left text-neutral-darker body-m-medium sm:text-center">
            {t("onboarding-share-your-postcode")}{" "}
            <Link className="p-0" href="onboarding/postcode?from=stations">
              {t("onboarding-enter-postcode")}
            </Link>
          </p>
        )}
      </div>

      <div>
        <Items renderedItems={stationsNearYou} />
      </div>
    </section>
  );
}

export function StationsNearYou_Skeleton({ postcode }: { postcode?: boolean }) {
  return (
    <section className="mb-8 flex flex-col">
      <div className="mx-[1.625rem] flex flex-col sm:items-center">
        <h2
          className={cn(
            "mb-1 h-[1.325rem] w-44 animate-pulse rounded bg-neutral-dark text-neutral heading-s-bold",
            {
              "mb-1": postcode,
            },
          )}
          aria-live="polite"
        ></h2>
        <div className="mb-7 h-5 w-64 animate-pulse rounded bg-neutral-dark" />
      </div>

      <div>
        <Items renderedItems={[]} loading={true} />
      </div>
    </section>
  );
}
