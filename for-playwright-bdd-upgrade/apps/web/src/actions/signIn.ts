"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { getLocaleByDomain } from "@rayo/localisation/server";
import {
  constructAuthorizeState,
  constructAuthorizeUrl,
} from "@web/helpers/oAuth/oAuth";

interface OAuthSignIn {
  isPremiumLogin?: boolean;
}

export const signIn = (props: OAuthSignIn = {} as OAuthSignIn) => {
  let authorizeUrl = "";

  try {
    const referer = headers().get("referer");
    const hostname = headers().get("host");
    const locale = getLocaleByDomain(hostname);
    const state = constructAuthorizeState({
      originUrl: referer,
      isPremiumLogin: props.isPremiumLogin,
    });

    authorizeUrl = constructAuthorizeUrl({
      state,
      locale,
    });

    cookies().set("stateParam", state, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  } catch (e) {
    // TODO: Add logging
    console.error(e);
  }

  redirect(authorizeUrl);
};
