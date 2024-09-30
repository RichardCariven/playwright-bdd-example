import { http, HttpResponse } from "msw";

import { type PageId } from "@rayo/localisation";
import { crowdinMocks } from "@rayo/localisation/mocks";

/**
 * From manifest.json we are using timestamp for fetching translations in order to get them fresh.
 * Timestamp does not matter with mocks
 *
 * Crowdin URL samples:
 * - https://distributions.crowdin.net/<DISTRUBTION HASH>/manifest.json
 * - https://distributions.crowdin.net/<DISTRUBTION HASH>/content/<LOCALE>/server-common.json?timestamp=1709891005
 */

export const crowdinTranslationsGetHandler = [
  http.get("**//distributions.crowdin.net/**/manifest.json", () => {
    return HttpResponse.json({
      files: [],
      languages: [],
      language_mapping: [],
      custom_languages: [],
      timestamp: 0,
      content: {},
      mapping: [],
    });
  }),

  http.get("**//distributions.crowdin.net/**/content/**", ({ request }) => {
    const filename = request.url.substring(request.url.lastIndexOf("/") + 1);
    const crowdinId = filename.substring(
      0,
      filename.lastIndexOf("."),
    ) as PageId;
    const mockedDictionary = crowdinMocks[crowdinId];
    return HttpResponse.json(mockedDictionary);
  }),
];
