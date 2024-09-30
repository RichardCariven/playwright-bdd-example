/**
 * @jest-environment jsdom
 */

import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { renderHook, waitFor } from "@testing-library/react";

import { SwrError } from "../../helpers/common/swrError";
import { listenApi } from "../../index";
import { SwrWrapper } from "../../jest.utils";
import { useCustomSwr } from "./useCustomSwr";

describe("useCustomSwr", () => {
  const listenApiGETSpy = jest.spyOn(listenApi, "GET");
  const successfulResponse = {
    data: [{ stationId: 1 }],
    error: null,
    response: {
      status: 200,
      ok: true,
    },
  };
  const errorResponse = {
    data: undefined,
    error: { detail: { error_message: "message" } },
    response: {
      status: 401,
      ok: false,
    },
  };

  afterEach(() => {
    listenApiGETSpy.mockReset();
  });

  it("Success", async () => {
    listenApiGETSpy.mockImplementation(() =>
      Promise.resolve(successfulResponse),
    );
    const { result } = renderHook(
      () =>
        useCustomSwr(listenApi, "/stations/{regionCode}", {
          params: { path: { regionCode: "GB" } },
        }),
      { wrapper: SwrWrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(successfulResponse.data);
      expect(result.current.error).toEqual(undefined);
    });
  });

  it("Error", async () => {
    listenApiGETSpy.mockImplementation(() => Promise.resolve(errorResponse));
    const { result } = renderHook(
      () =>
        useCustomSwr(listenApi, "/stations/{regionCode}", {
          params: { path: { regionCode: "GB" } },
        }),
      { wrapper: SwrWrapper },
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(undefined);
      expect(result.current.error).toBeInstanceOf(SwrError);
      expect(result.current.error).toMatchObject({
        responseBody: errorResponse.error,
      });
    });
  });
});
