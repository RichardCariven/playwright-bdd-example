import React, { Suspense } from "react";
import { type Metadata } from "next";

import { getItemsFromCollectionCode } from "@rayo/fetch-client/helpers/helix/index";
import { getAllStations } from "@rayo/fetch-client/helpers/lapi/index";
import { getCrowdinTranslations } from "@rayo/localisation/server";
import { Button, type OnBoardDiscProps } from "@rayo/ui/components";
import { type NextPageWithProps } from "@web/app/pageTypes";
import ErrorBoundary from "@web/components/ErrorBoundary/ErrorBoundary";
import { Items } from "@web/components/Onboarding/components/Items";
import StationsNearYou, {
  StationsNearYou_Skeleton,
} from "@web/components/Onboarding/components/StationsNearYou";
import { HeaderButtons } from "@web/components/Onboarding/HeaderButtons";

export const metadata: Metadata = {
  title: `Rayo - Choose your stations`,
};

const Stations: NextPageWithProps = async ({ params: { locale } }) => {
  const t = await getCrowdinTranslations(locale, ["server-common"]);

  const { data: collectionItems } = await getItemsFromCollectionCode({
    collectionCode: "onboarding-stations",
    locale,
  });

  if (!collectionItems) {
    throw new Error("No items found");
  }

  const { data: allStations } = await getAllStations({ locale: locale });

  if (!allStations || allStations.length === 0) {
    throw new Error("No stations found");
  }

  const filteredStations = allStations.filter((station) =>
    collectionItems.some((item) => item.entityId === station.stationId),
  );

  const popularStations: OnBoardDiscProps[] = filteredStations.map(
    (station) => ({
      id: station?.stationId.toString() ?? "",
      title: station?.stationName ?? "",
      imageSrc: station?.stationListenBarLogo ?? "",
    }),
  );

  return (
    <div className="flex min-h-full w-full flex-col items-center bg-neutral-invert">
      <section className="mt-[1.4rem] flex w-full max-w-screen-2xl grow flex-col">
        <HeaderButtons showBackButton={false} showCloseButton={false} />

        <div className="mx-[1.625rem] mb-8 mt-8 flex flex-col gap-2 sm:mx-auto sm:items-center">
          <h1 className={"text-neutral heading-m-bold"} aria-live="polite">
            {t("onboarding-choose-your-stations")}
          </h1>
          <p className={"text-neutral-darker body-m-medium"} aria-live="polite">
            {t("onboarding-pick-as-many-stations-as-you-want")}
          </p>
        </div>

        <ErrorBoundary
          fallback={<p>We should have error UI component, maybe</p>}
        >
          <Suspense fallback={<StationsNearYou_Skeleton postcode />}>
            <StationsNearYou postcode="12345" />
          </Suspense>
        </ErrorBoundary>

        <div className="flex flex-col sm:mx-auto sm:items-center">
          <h2
            className={"mb-7 ml-[1.625rem] text-neutral heading-s-bold sm:ml-0"}
            aria-live="polite"
          >
            {t("onboarding-popular-stations")}
          </h2>
          <Items renderedItems={popularStations} />
        </div>

        <div className="sticky bottom-0 mt-auto flex flex-col items-center bg-scrim-light px-6 py-10">
          <Button type="submit" className="w-full max-w-[20.25rem]">
            {t("continue")}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Stations;
