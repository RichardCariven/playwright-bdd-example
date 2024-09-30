import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";

import { type Locale } from "../../i18n.config";
import { getLocaleByDomain } from "../getLocaleByDomain/getLocaleByDomain";
import { getLocaleFromPath } from "../getLocaleFromPath/getLocaleFromPath";

/**
 *
 * Next.js currently doesn't provide an API to read route params like locale at
 * arbitrary places in Server Components (see https://github.com/vercel/next.js/pull/59909 and https://github.com/vercel/next.js/discussions/58862).
 *
 * getLocale method is inspired by https://github.com/vordgi/next-impl-getters/blob/main/package/src/get-pathname.ts
 *
 *
 * STABILITY
 *
 * getLocale almost fully utilizes Next.js functionality and is awaiting PR https://github.com/vercel/next.js/pull/59909 merging.
 * Our E2E localisation tests will catch possible issues after Next.js update
 */

export const getLocale = (): Locale => {
  const store = staticGenerationAsyncStorage.getStore();

  if (!store) {
    // TODO: Log an error
    throw new Error(
      "staticGenerationAsyncStorage is empty: getLocale method is not for client side, or staticGenerationAsyncStorage does not work anymore due to nextjs update",
    );
  }

  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    return getLocaleFromPath(store.urlPathname);
  }

  const { incrementalCache } = store;

  if (!incrementalCache?.requestHeaders.host) {
    // TODO: Log an error
    throw new Error(
      "staticGenerationAsyncStorage is empty: getLocale method is not for client side, or staticGenerationAsyncStorage does not work anymore due to nextjs update",
    );
  }

  return getLocaleByDomain(incrementalCache.requestHeaders.host as string);
};
