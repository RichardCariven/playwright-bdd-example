import React from "react";
import { type Metadata } from "next";

import {
  getItemsFromCollectionCode,
  getTagsFromEntityIds,
} from "@rayo/fetch-client/helpers/helix/index";
import { getCrowdinTranslations } from "@rayo/localisation/server";
import { type OnBoardDiscProps } from "@rayo/ui/components";
import { type NextPageWithProps } from "@web/app/pageTypes";
import { GenresForm } from "@web/components/Onboarding/Genres/GenresForm";
import { HeaderButtons } from "@web/components/Onboarding/HeaderButtons";
import { MainHeading } from "@web/components/Onboarding/MainHeading";

export const metadata: Metadata = {
  title: `Rayo - Choose your genres`,
};

const Genres: NextPageWithProps = async ({ params: { locale } }) => {
  const t = await getCrowdinTranslations(locale, ["server-common"]);
  const collectionItems = await getItemsFromCollectionCode({
    collectionCode: "onboarding-tags",
    locale,
  });

  if (!collectionItems.data) {
    throw new Error("No collection data");
  }

  const tags = await getTagsFromEntityIds({
    entityIds: collectionItems.data.map((item) => item.entityId),
    locale,
    withImages: true,
  });

  if (!tags.data) {
    throw new Error("No tags data");
  }

  const genres: OnBoardDiscProps[] = tags.data
    .map((tag) => {
      return {
        id: tag.tag?.id.toString() || "",
        title: tag.tag?.name || "",
        imageSrc: tag.images?.[0].url || "",
      };
    })
    .filter((tag) => tag.id && tag.title && tag.imageSrc);

  return (
    <div className="flex min-h-full w-full flex-col items-center bg-neutral-invert">
      <section className="mt-[1.4rem] flex w-full max-w-screen-2xl grow flex-col">
        <HeaderButtons showBackButton={false} showCloseButton={true} />
        <div className="mx-[1.625rem] mb-10 mt-8 flex flex-col gap-2 sm:mx-auto sm:items-center">
          <MainHeading
            heading={t("onboarding-choose-your-genres")}
            subHeading={t("onboarding-pick-at-least-3")}
          />
        </div>
        <GenresForm genres={genres} />
      </section>
    </div>
  );
};
export default Genres;
