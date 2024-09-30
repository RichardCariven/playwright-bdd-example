/**
 * @jest-environment jsdom
 */

import { type SWRConfiguration } from "swr";

import { useListenApi } from "@rayo/fetch-client/hooks/lapi/index";
import { useLocale } from "@rayo/localisation";
import { renderHook } from "@testing-library/react";
import usePusherNowPlaying from "@web/hooks/pusher/usePusherNowPlaying";

import useNowPlaying from "./useNowPlaying";

jest.mock("@rayo/fetch-client/hooks/lapi/index");
jest.mock("../pusher/usePusherNowPlaying");
jest.mock("@rayo/localisation");

describe("useNowPlaying", () => {
  const mockStationCode = "test-station";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setupMocks = (
    wsData: object | null,
    wsError: Error | null,
    apiData: Array<object> | null,
    apiError: Error | null,
    isLoading: boolean,
  ) => {
    (usePusherNowPlaying as jest.Mock).mockReturnValue({
      data: wsData,
      error: wsError,
    });

    (useListenApi as jest.Mock).mockReturnValue({
      data: apiData,
      error: apiError,
      isLoading: isLoading,
    });

    (useLocale as jest.Mock).mockReturnValue("en-gb");
  };

  const getSwrOptions = () => {
    const [, , swrOptions] = (useListenApi as jest.Mock).mock.calls[0] as [
      unknown,
      unknown,
      SWRConfiguration,
    ];
    return swrOptions;
  };

  it("should return loading state initially", () => {
    setupMocks(null, null, null, null, true);

    const { result } = renderHook(() =>
      useNowPlaying({ stationCode: mockStationCode }),
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(getSwrOptions().refreshInterval).toBe(0);
  });

  it("should return merged result of WS and API data if both available and no errors", () => {
    const wsData = { stationNowPlaying: "wsData" };
    const apiData = [
      {
        stationOnAir: "apiData",
        stationNowPlaying: "apiData",
        stationCode: mockStationCode,
      },
    ];
    setupMocks(wsData, null, apiData, null, false);

    const { result } = renderHook(() =>
      useNowPlaying({ stationCode: mockStationCode }),
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({ ...apiData[0], ...wsData });
    expect(getSwrOptions().refreshInterval).toBe(0);
  });

  it("should return API data if WS has an error", () => {
    const apiData = [
      {
        stationOnAir: "apiData",
        stationNowPlaying: "apiData",
        stationCode: mockStationCode,
      },
    ];
    setupMocks(null, new Error("WS error"), apiData, null, false);

    const { result } = renderHook(() =>
      useNowPlaying({ stationCode: mockStationCode }),
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(apiData[0]);
    expect(getSwrOptions().refreshInterval).toBeGreaterThan(0);
  });

  it("should handle both WS and API errors", () => {
    setupMocks(
      null,
      new Error("WS error"),
      null,
      new Error("API error"),
      false,
    );

    const { result } = renderHook(() =>
      useNowPlaying({ stationCode: mockStationCode }),
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(getSwrOptions().refreshInterval).toBeGreaterThan(0);
  });
});
