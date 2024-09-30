"use client";

import type { FetchOptions } from "openapi-fetch";
import type createClient from "openapi-fetch";
import type { FilterKeys, PathsWithMethod } from "openapi-typescript-helpers";
import useSWR, { type SWRConfiguration } from "swr";

import { createSwrError } from "../../helpers/common/swrError";

type FetchClient<Paths extends object> = ReturnType<typeof createClient<Paths>>;

export function useCustomSwr<
  Paths extends object,
  Path extends PathsWithMethod<Paths, "get">,
  Options extends FetchOptions<FilterKeys<Paths[Path], "get">>,
>(
  fetcher: FetchClient<Paths>,
  path: Path,
  options: Options,
  swrOptions?: SWRConfiguration,
) {
  return useSWR(
    [path, options],
    ([path, options]) =>
      fetcher.GET(path, options).then(({ data, error, response }) => {
        if (error) {
          throw createSwrError(response, error);
        }
        return data;
      }),
    swrOptions,
  );
}
