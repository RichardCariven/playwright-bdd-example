import jwt, { type JwtPayload } from "jsonwebtoken";
import { nanoid } from "nanoid";

import { type Locale } from "@rayo/localisation/i18n";
import { getConfig, getRegionalConfig } from "@web/config";

interface AuthorizeState {
  originUrl: string;
  randomString: string;
  isPremiumLogin: boolean;
}

export const constructAuthorizeState = ({
  originUrl,
  isPremiumLogin,
}: {
  originUrl: string | null;
  isPremiumLogin?: boolean;
}): string => {
  if (!originUrl) {
    throw new Error("originUrl is null");
  }

  return JSON.stringify({
    originUrl: originUrl,
    randomString: nanoid(),
    isPremiumLogin: isPremiumLogin ?? false,
  } satisfies AuthorizeState);
};

export const parseAuthorizeState = (state: string | null): AuthorizeState => {
  if (!state) {
    throw new Error("state is null");
  }

  return JSON.parse(state) as AuthorizeState;
};

export const constructAuthorizeUrl = ({
  state,
  locale,
}: {
  state: string;
  locale: Locale;
}): string => {
  const { oAuthApi } = getRegionalConfig(locale, "SHEPHERD");
  const authorizeUrl = new URL(`${oAuthApi}/authorize/`);
  const redirectUri = getoAuthVerifyUrl();

  authorizeUrl.search = new URLSearchParams({
    client_id: "web",
    scope: "user:read user:write",
    response_type: "code",
    redirect_uri: redirectUri,
    state,
  }).toString();

  return authorizeUrl.href;
};

export const getAuthTokenAges = (accessToken: string) => {
  const decoded_token = jwt.decode(accessToken) as JwtPayload | undefined;

  if (!decoded_token?.exp) {
    throw new Error("Invalid decoded token from JWT decode");
  }

  // a buffer time to account for latency from checking when if the token needs refreshing
  // to when the next request is made
  const latencyBufferInSeconds = 300;
  const nowInSeconds = Math.floor(Date.now() / 1000);

  const accessTokenMaxAge =
    decoded_token.exp - (nowInSeconds + latencyBufferInSeconds);

  const clampedAccessTokenMaxAge = Math.max(accessTokenMaxAge, 0);

  const refreshTokenMaxAge = 3600 * 24 * 180;

  return {
    clampedAccessTokenMaxAge,
    refreshTokenMaxAge,
  };
};

export const getoAuthVerifyUrl = (): string => {
  const { domain, oAuthVerifyPath } = getConfig();

  if (process.env.NODE_ENV === "development") {
    return `http://localhost:3000/${oAuthVerifyPath}`;
  }

  if (process.env.OAUTH_VERIFY_DOMAIN) {
    return `${process.env.OAUTH_VERIFY_DOMAIN}/${oAuthVerifyPath}`;
  }

  return `https://${domain}/${oAuthVerifyPath}`;
};
