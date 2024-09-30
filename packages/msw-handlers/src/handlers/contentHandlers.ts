import { http, HttpResponse } from "msw";

import { collections } from "@rayo/fetch-client/mocks/content/collections";
import { images } from "@rayo/fetch-client/mocks/content/images";
import { items } from "@rayo/fetch-client/mocks/content/items";
import { tags } from "@rayo/fetch-client/mocks/content/tags";

import { CONTENT_API_BASE } from "../config";

export const contentApiHandlers = [
  http.get(`${CONTENT_API_BASE}/:regionId/collections`, ({ request }) => {
    const url = new URL(request.url);
    const filterCode = url.searchParams.get("filter.code");
    const collection = collections.find(
      (collection) => collection[0].code === filterCode,
    );
    return HttpResponse.json({ data: collection });
  }),

  http.get(
    `${CONTENT_API_BASE}/:regionId/collections/:collectionId/items`,
    ({ params }) => {
      const collectionId = params.collectionId;
      const filteredItems = items.filter(
        (item) => item.collectionId === Number(collectionId),
      );
      return HttpResponse.json({ data: filteredItems });
    },
  ),

  http.get(`${CONTENT_API_BASE}/:regionId/tags/:tagId`, ({ params }) => {
    const tagId = params.tagId;
    const tag = tags.find((tag) => tag.id === Number(tagId));
    return HttpResponse.json({
      data: tag,
    });
  }),

  http.get(`${CONTENT_API_BASE}/:regionId/tags/:tagId/images`, ({ params }) => {
    const image = images.find(
      (image) => image[0].entityId === Number(params.tagId),
    );
    return HttpResponse.json({
      data: image,
    });
  }),
];
