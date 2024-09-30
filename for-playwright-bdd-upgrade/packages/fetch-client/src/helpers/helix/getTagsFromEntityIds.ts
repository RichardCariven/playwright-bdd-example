import { contentApi } from "@rayo/fetch-client";
import { type Locale } from "@rayo/localisation/i18n";
import { getCountryFromLocale } from "@rayo/localisation/server";

import { type components } from "../../schemas/content";
import { getRegionId } from "./getRegionId";
import { handleError } from "./handleError";

interface GetTagesFromEntityIdsProps {
  entityIds: number[];
  locale: Locale;
  withImages?: boolean;
}

interface FetchResponse {
  data:
    | {
        tag: components["schemas"]["TagDto"] | null;
        images?: components["schemas"]["EntityImageDto"][] | null;
      }[]
    | null;
}

export const getTagsFromEntityIds = async ({
  entityIds,
  locale,
  withImages,
}: GetTagesFromEntityIdsProps): Promise<FetchResponse> => {
  try {
    const region = getCountryFromLocale(locale ?? "en-gb");
    const regionId = getRegionId(region);

    // Fetch tags with entityIds
    const tagsPromises = entityIds.filter(Boolean).map((entityId) => {
      return contentApi.GET("/content/v1/regions/{regionId}/tags/{tagId}", {
        params: {
          path: {
            regionId,
            tagId: entityId,
          },
        },
        next: {
          revalidate: 600,
        },
      });
    });

    const tagsData = await Promise.all(tagsPromises);

    //filter out tags with error
    tagsData.filter((tag) => {
      return !tag.error;
    });

    if (tagsData.length === 0) {
      return { data: [] };
    }

    // Map tags into data object
    let data: FetchResponse["data"] = tagsData.map((tag) => {
      if (!tag.data?.data) {
        return { tag: null, images: null };
      }
      return { tag: tag.data?.data, images: null };
    });

    // Fetch images with entityIds if withImages is true
    if (withImages) {
      const imagePromises = entityIds.map((entityId) => {
        return contentApi.GET(
          "/content/v1/regions/{regionId}/tags/{tagId}/images",
          {
            params: {
              path: {
                regionId,
                tagId: entityId,
              },
            },
            next: {
              revalidate: 600,
            },
          },
        );
      });
      const imagesData = await Promise.all(imagePromises);

      //filter out images with error
      imagesData.filter((image) => {
        return !image.error;
      });

      // Merge images into data object
      data = data.map((tag) => {
        const image = imagesData?.find((image) => {
          return image.data?.data[0].entityId === tag.tag?.id;
        });
        return { ...tag, images: image?.data?.data };
      });
    }
    return { data };
  } catch (error) {
    handleError({ message: "Failed to fetch tags from entity ids", error });
  }
};
