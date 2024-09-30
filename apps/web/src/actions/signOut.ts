"use server";

import { cookies, headers } from "next/headers";

import { getLocaleByDomain } from "@rayo/localisation/server";
import { getRegionalConfig } from "@web/config";

export const signOut = () => {
  const hostname = headers().get("host");
  const locale = getLocaleByDomain(hostname);
  const { accessTokenCookieName, refreshTokenCookieName } = getRegionalConfig(
    locale,
    "SHEPHERD",
  );

  cookies().delete(accessTokenCookieName);
  cookies().delete(refreshTokenCookieName);

  /**
   *
   * TODO:
   * on SignOut you need to revalidate endpoints what uses auth and possible routes
   * https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#revalidating-data
   * it is possible to use "revalidateTag" and add tags to all fetch functions which are using auth
   * https://nextjs.org/docs/app/api-reference/functions/revalidateTag
   *
   */
};
