import { contentApi } from "@rayo/fetch-client";
import { type Locale } from "@rayo/localisation/i18n";
import { getCountryFromLocale } from "@rayo/localisation/server";

import { type components } from "../../schemas/content";
import { getRegionId } from "./getRegionId";
import { handleError } from "./handleError";

interface GetItemsFromCollectionCodeProps {
  collectionCode: string;
  locale: Locale;
}

interface FetchResponse {
  data: components["schemas"]["CollectionItemDto"][] | null;
}

export const getItemsFromCollectionCode = async ({
  collectionCode,
  locale,
}: GetItemsFromCollectionCodeProps): Promise<FetchResponse> => {
  try {
    const region = getCountryFromLocale(locale ?? "en-gb");
    const regionId = getRegionId(region);

    const { data: collections, error: collectionsError } = await contentApi.GET(
      "/content/v1/regions/{regionId}/collections",
      {
        params: {
          query: {
            // @ts-expect-error api spec is potentially wrong filter.code should be a filter
            "filter.code": collectionCode,
          },
          path: {
            regionId,
          },
        },
        next: {
          revalidate: 600,
        },
      },
    );

    if (collectionsError) {
      throw new Error("Failed to fetch collections");
    }

    const { data: items, error: itemsError } = await contentApi.GET(
      "/content/v1/regions/{regionId}/collections/{collectionId}/items",
      {
        params: {
          path: {
            regionId,
            collectionId: collections.data[0].id,
          },
          query: {
            limit: 100,
          },
        },
        next: {
          revalidate: 600,
        },
      },
    );

    if (itemsError) {
      throw new Error("Failed to fetch items for collection");
    }

    return { data: items.data };
  } catch (error) {
    handleError({
      message: "Failed to fetch items from collection code",
      error,
    });
  }
};
