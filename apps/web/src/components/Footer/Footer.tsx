import { listenApi, type LapiSchema } from "@rayo/fetch-client";
import { type Country } from "@rayo/localisation/i18n";
import {
  getCountryFromLocale,
  getCrowdinTranslations,
  getLocale,
} from "@rayo/localisation/server";
import { Footer as UIFooter, type FooterProps } from "@rayo/ui/components";
import { getRegionalConfig, type FooterConfig } from "@web/config";
import { sortByKey } from "@web/helpers/sortByKey/sortByKey";

type FooterLink = FooterProps["links"][number];

export const Footer = async () => {
  const locale = getLocale();
  const country = getCountryFromLocale(locale);
  const { aggregatorBrandCode } = getRegionalConfig(locale, "COMMON");
  const { links: configLinks, linkOrder } = getRegionalConfig(locale, "FOOTER");
  const t = await getCrowdinTranslations(locale, ["server-common"]);

  const { data } = await listenApi.GET(
    "/aggregatorbrands",

    {
      params: {
        query: {
          // @ts-expect-error filter needs update in spec
          "_filter[AggregatorBrandCode]": aggregatorBrandCode,
        },
      },
    },
  );

  // @ts-expect-error /aggregatorbrands incorrect typing. More detail on PLS 721
  const brands:
    | LapiSchema.components["schemas"]["AggregatorBrand"][]
    | undefined = data;

  const brand = brands?.[0];

  const lapiLinks = [
    {
      id: "terms",
      title: t("footer-terms-and-conditions"),
      href: brand?.AggregatorBrandTermsUrl,
    },
    {
      id: "privacy",
      title: t("footer-privacy-policy"),
      href: brand?.AggregatorBrandPrivacyUrl,
    },
    {
      id: "competitions",
      title: t("footer-competition-terms-and-conditions"),
      href: brand?.AggregatorBrandCompetitionTermsUrl,
    },
    {
      id: "cookies",
      title: t("footer-cookie-policy"),
      href: brand?.AggregatorBrandCookiesUrl,
    },
    {
      id: "advertise",
      title: t("footer-advertise-with-us"),
      href: brand?.AggregatorBrandAdvertiseUrl,
    },
  ] satisfies Partial<Required<FooterConfig>["links"][number]>[];

  const mergedLinks = [...lapiLinks, ...(configLinks ?? [])];

  if (linkOrder?.length) {
    sortByKey(mergedLinks, linkOrder, "id");
  }

  const links = mergedLinks
    .filter((link): link is FooterLink => !!link.href)
    .map(
      (link) =>
        ({
          href: link.href,
          title: link.title,
        }) satisfies FooterLink,
    );

  const legal: Partial<Record<Country, FooterProps["legal"]>> = {
    gb: (
      <>
        Bauer Media Group consists of : Bauer Consumer Media Ltd, Company number
        01176085; Bauer Radio Limited, Company number: 1394141
        <br />
        Registered office: Media House, Peterborough Business Park, Lynch Wood,
        Peterborough PE2 6EA and H Bauer Publishing, Company number: LP003328;
        <br />
        Registered office: The Lantern, 75 Hampstead Road, London NW1 2PL
        <br />
        All registered in England and Wales. VAT no 918 5617 01
        <br />H Bauer Publishing are authorised and regulated for credit broking
        by the FCA (Ref No: 845898)
      </>
    ),
  };

  const props: FooterProps = {
    links,
    legal: legal[country],
  };

  return <UIFooter {...props} />;
};
