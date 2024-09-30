import { type MockedFunction, type MockInstance } from "jest-mock";
import { createMock } from "storybook-addon-module-mock";

import { stationsNowPlaying } from "@rayo/fetch-client/mocks/lapi/stationsNowPlaying";
import * as localisationClient from "@rayo/localisation";
import { defaultLocale } from "@rayo/localisation/i18n";
import * as localisationServer from "@rayo/localisation/server";

import * as ArrayShuffle from "../../web/src/helpers/array-shuffle/array-shuffle";
import * as usePusherNowPlayingModule from "../../web/src/hooks/pusher/usePusherNowPlaying";

export function mockGetLocale() {
  const mock = createMock(localisationServer, "getLocale") as MockInstance<
    typeof localisationServer.getLocale
  >;
  mock.mockReturnValue(defaultLocale);
  return mock;
}

export function mockUseLocale() {
  const mock = createMock(localisationClient, "useLocale") as MockInstance<
    typeof localisationClient.useLocale
  >;
  mock.mockReturnValue(defaultLocale);
  return mock;
}

export function mockUsePusherNowPlaying() {
  const mock = createMock(
    usePusherNowPlayingModule,
    "default",
  ) as MockedFunction<typeof usePusherNowPlayingModule.default>;

  mock.mockReturnValue({
    error: false,
    data: stationsNowPlaying[0] satisfies usePusherNowPlayingModule.NowPlaying,
  });

  return mock;
}

export function mockShuffle() {
  const mock = createMock(ArrayShuffle, "shuffle") as MockInstance<
    typeof ArrayShuffle.shuffle
  >;
  mock.mockImplementation((value) => value);
  return mock;
}
