"use client";

import type { FetchOptions } from "openapi-fetch";
import type { FilterKeys, PathsWithMethod } from "openapi-typescript-helpers";
import { type SWRConfiguration } from "swr";

import { listenApi } from "../../index";
import type { paths as lapiPaths } from "../../schemas/lapi";
import { useCustomSwr } from "../common/useCustomSwr";

export function useListenApi<
  Path extends PathsWithMethod<lapiPaths, "get">,
  Options extends FetchOptions<FilterKeys<lapiPaths[Path], "get">>,
>(path: Path, options: Options, swrOptions?: SWRConfiguration) {
  return useCustomSwr(listenApi, path, options, swrOptions);
}
