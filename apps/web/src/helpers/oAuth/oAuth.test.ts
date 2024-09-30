import jwt from "jsonwebtoken";

import { type Locale } from "@rayo/localisation/i18n";
import { getRegionalConfig } from "@web/config";

import {
  constructAuthorizeState,
  constructAuthorizeUrl,
  getAuthTokenAges,
  getoAuthVerifyUrl,
  parseAuthorizeState,
} from "./oAuth";

// Mock nanoid to ensure predictable behavior
jest.mock("nanoid", () => ({
  nanoid: jest.fn(() => "randomString"),
}));

describe("constructAuthorizeState", () => {
  it("should construct the authorize state with valid inputs", () => {
    const originUrl = "https://example.com";
    const result = constructAuthorizeState({ originUrl });
    expect(typeof result).toBe("string");

    const parsedResult = parseAuthorizeState(result);
    expect(parsedResult.originUrl).toBe(originUrl);
    expect(
      Object.prototype.hasOwnProperty.call(parsedResult, "randomString"),
    ).toBe(true);
    expect(
      Object.prototype.hasOwnProperty.call(parsedResult, "isPremiumLogin"),
    ).toBe(true);
  });

  it("should construct the authorize state with isPremiumLogin set to true", () => {
    const originUrl = "https://example.com";
    const result = constructAuthorizeState({ originUrl, isPremiumLogin: true });
    const parsedResult = parseAuthorizeState(result);
    expect(parsedResult.isPremiumLogin).toBe(true);
  });

  it("should construct the authorize state with isPremiumLogin set to false", () => {
    const originUrl = "https://example.com";
    const result = constructAuthorizeState({
      originUrl,
      isPremiumLogin: false,
    });
    const parsedResult = parseAuthorizeState(result);
    expect(parsedResult.isPremiumLogin).toBe(false);
  });

  it("should throw an error if originUrl is null", () => {
    expect(() => {
      constructAuthorizeState({ originUrl: null });
    }).toThrow("originUrl is null");
  });

  it("should construct the authorize state with default isPremiumLogin when not provided", () => {
    const originUrl = "https://example.com";
    const result = constructAuthorizeState({ originUrl });
    const parsedResult = parseAuthorizeState(result);
    expect(parsedResult.isPremiumLogin).toBe(false);
  });
});

describe("constructAuthorizeUrl", () => {
  const state = "testState";
  const { oAuthApi } = getRegionalConfig("en-gb", "SHEPHERD");
  const expectedRedirectUri = getoAuthVerifyUrl();
  const expectedAuthorizeUrl = `${oAuthApi}/authorize/?client_id=web&scope=user%3Aread+user%3Awrite&response_type=code&redirect_uri=${encodeURIComponent(
    expectedRedirectUri,
  )}&state=${state}`;

  it("constructs the authorize URL correctly", () => {
    const authorizeUrl = constructAuthorizeUrl({
      state,
      locale: "en-gb",
    });
    expect(authorizeUrl).toBe(expectedAuthorizeUrl);
  });

  it("should throw an error if locale is wrong", () => {
    expect(() =>
      constructAuthorizeUrl({ state, locale: "foo" as Locale }),
    ).toThrow();
  });
});

describe("getAuthTokenAges", () => {
  test("calculates token ages correctly", () => {
    // Define a mock decoded token
    const decodedToken = {
      exp: Math.floor(Date.now() / 1000) + 3600, // Expire in 1 hour
    };

    // Mock jwt.decode function
    jest
      .spyOn(jwt, "decode")
      .mockImplementation(jest.fn().mockReturnValue(decodedToken));

    // Call the function with a mock access token
    const { clampedAccessTokenMaxAge, refreshTokenMaxAge } =
      getAuthTokenAges("mockAccessToken");

    // Calculate expected values
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const expectedAccessTokenMaxAge = decodedToken.exp - (nowInSeconds + 300);
    const expectedClampedAccessTokenMaxAge = Math.max(
      expectedAccessTokenMaxAge,
      0,
    );
    const expectedRefreshTokenMaxAge = 3600 * 24 * 180;

    // Check if the returned values match the expected values
    expect(clampedAccessTokenMaxAge).toBe(expectedClampedAccessTokenMaxAge);
    expect(refreshTokenMaxAge).toBe(expectedRefreshTokenMaxAge);
  });

  test("throws error for invalid decoded token", () => {
    // Mock jwt.decode function to return undefined
    jest
      .spyOn(jwt, "decode")
      .mockImplementation(jest.fn().mockReturnValue(undefined));

    // Call the function with a mock access token that will return undefined decoded token
    expect(() => {
      getAuthTokenAges("mockAccessToken");
    }).toThrow("Invalid decoded token from JWT decode");
  });
});
