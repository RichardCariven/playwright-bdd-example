import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  getCountryFromLocale,
  getLocaleByDomain,
} from "@rayo/localisation/server";
import { getConfig, getRegionalConfig } from "@web/config";
import {
  getAuthTokenAges,
  getoAuthVerifyUrl,
  parseAuthorizeState,
} from "@web/helpers/oAuth/oAuth";

export async function GET(request: Request) {
  const hostname = headers().get("host");
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const stateParam = cookies().get("stateParam");

  if (
    !code ||
    !state ||
    !stateParam ||
    state !== stateParam?.value ||
    !hostname
  ) {
    return new Response("Invalid State", {
      status: 422,
    });
  }

  try {
    const { originUrl } = parseAuthorizeState(state);
    const locale = getLocaleByDomain(hostname);
    const country = getCountryFromLocale(locale);
    const redirectUri = getoAuthVerifyUrl();
    const { cookieDomain } = getConfig();
    const { oAuthApi, accessTokenCookieName, refreshTokenCookieName } =
      getRegionalConfig(locale, "SHEPHERD");

    const client_id = process.env.OAUTH_CLIENT_ID;
    const client_secret =
      process.env[`OAUTH_CLIENT_SECRET_${country.toUpperCase()}`];

    if (!client_id || !client_secret) {
      throw new Error("Missing oAuth env vars");
    }

    // TODO: This fetch client should be replaced with shepherd client from client package
    const tokens = await fetch(`${oAuthApi}/access_token/`, {
      method: "POST",
      headers: {
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        client_id,
        client_secret,
        code,
      },
    });

    const { access_token, refresh_token } = (await tokens.json()) as {
      access_token: string;
      refresh_token: string;
    };

    const { clampedAccessTokenMaxAge, refreshTokenMaxAge } =
      getAuthTokenAges(access_token);

    const cookieSettings: Partial<ResponseCookie> = {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "strict", // do we use strict?
      domain:
        process.env.NODE_ENV === "development"
          ? "localhost"
          : `.${cookieDomain}`,
    };

    cookies().set(accessTokenCookieName, access_token, {
      ...cookieSettings,
      maxAge: clampedAccessTokenMaxAge,
    });

    cookies().set(refreshTokenCookieName, refresh_token, {
      ...cookieSettings,
      maxAge: refreshTokenMaxAge,
    });

    redirect(originUrl);
  } catch (error) {
    // TODO: Add logging
    console.error("error", error);
    return new Response("Something went wrong. See the logs", {
      status: 500,
    });
  }
}
