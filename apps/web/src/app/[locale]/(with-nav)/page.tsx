import { type Metadata } from "next";

import { getAggregatorBrand } from "@rayo/fetch-client/helpers/lapi/index";
import { getLocale } from "@rayo/localisation/server";
import { type NextPageWithProps } from "@web/app/pageTypes";
import { FeaturedStations } from "@web/components/FeaturedStations/FeaturedStations";
import { HeroCarousel } from "@web/components/HeroCarousel/HeroCarousel";
import { ShowsOnAir } from "@web/components/ShowsOnAir/ShowsOnAir";
import { getRegionalConfig } from "@web/config";

export const metadata: Metadata = {
  title: `Rayo`,
};

const Home: NextPageWithProps = async () => {
  const locale = getLocale();
  const { aggregatorBrandCode } = getRegionalConfig(locale, "COMMON");

  const brand = await getAggregatorBrand({ aggregatorBrandCode });
  const contentsArray = (
    brand.AggregatorBrandModuleContentPriority as unknown as string
  ).split(",");

  return (
    <>
      {contentsArray.map((block) => {
        switch (block) {
          case "hlx_hero_carousel":
            return <HeroCarousel key={block} />;

          case "hlx_stations_featured":
            return <FeaturedStations key={block} />;

          case "hlx_shows_live":
            return <ShowsOnAir key={block} />;

          case "hlx_collection_featured":
          case "hlx_shows_featured":
          default:
            return null;
        }
      })}
    </>
  );
};

export default Home;

// 1 minute page cache is for testing the CDN
// Should not use 1 minute when we go live
export const revalidate = 60;
