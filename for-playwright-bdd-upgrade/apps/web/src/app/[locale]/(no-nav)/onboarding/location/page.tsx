import type { Metadata } from "next";

import { getCrowdinTranslations } from "@rayo/localisation/server";
import {
  HighlightList,
  HighlightListItem,
  LinkButton,
} from "@rayo/ui/components";
import LocationIcon from "@rayo/ui/icons/Location";
import { NewsIcon } from "@rayo/ui/icons/News";
import SettingsIcon from "@rayo/ui/icons/Settings";
import { updatePostcode } from "@web/actions/updatePostcode";
import type { NextPageParams } from "@web/app/pageTypes";
import { SubmitButton } from "@web/components/Forms/submit-button";
import { HeaderButtons } from "@web/components/Onboarding/HeaderButtons";

import PostcodeInput from "./PostcodeInput";

export const metadata: Metadata = {
  title: "Rayo - Choose your adventure",
  description: "This is a page",
};

export default async function Page({ params }: NextPageParams) {
  const t = await getCrowdinTranslations(params.locale, ["server-common"]);

  return (
    <div className="h-screen bg-neutral-invert">
      <div className="mt-[1.4rem] flex min-h-full grow flex-col">
        <HeaderButtons />
        <div className="mx-auto flex max-w-[360px] grow flex-col px-5">
          <h2 className="mt-16 text-balance text-center heading-m-bold">
            {t("would-you-like-to-share-your-location")}
          </h2>
          <form
            action={updatePostcode}
            className="mt-10 flex min-h-full grow flex-col"
          >
            <PostcodeInput locale={params.locale} />
            <HighlightList className="mt-6 flex flex-col gap-6">
              <HighlightListItem
                Icon={LocationIcon}
                title={t("find-your-local-stations")}
                subtitle={t(
                  "find-all-your-favourite-local-stations-and-content-based-on-your-postcode",
                )}
              />
              <HighlightListItem
                Icon={NewsIcon}
                title={t("relevant-content")}
                subtitle={t(
                  "listen-to-news-weather-traffic-updates-and-more-based-on-your-postcode",
                )}
              />
              <HighlightListItem
                Icon={SettingsIcon}
                title={t("update-postcode")}
                subtitle={t("you-can-change-this-anytime-in-settings")}
              />
            </HighlightList>
            <div className="sticky bottom-0 mt-auto flex flex-col items-center gap-2 bg-scrim-light p-6">
              <SubmitButton className="w-full">{t("continue")}</SubmitButton>
              <LinkButton
                href="onboarding/genres"
                className="w-full"
                variant="text"
              >
                {t("skip")}
              </LinkButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
