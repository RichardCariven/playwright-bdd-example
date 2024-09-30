import { http, HttpResponse, type DefaultBodyType, type PathParams } from "msw";
import type { SuccessResponseJSON } from "openapi-typescript-helpers";

import { type LapiSchema } from "@rayo/fetch-client";
import { brands } from "@rayo/fetch-client/mocks/lapi/brands";
import { stations } from "@rayo/fetch-client/mocks/lapi/stations";
import { stationsNowPlaying } from "@rayo/fetch-client/mocks/lapi/stationsNowPlaying";

import { LAPI_BASE } from "../config";

type Paths = LapiSchema.paths;

// TODO: move all mocks under fetch-client
export const lapiApiHandlers = [
  http.get(`${LAPI_BASE}/initweb/:stationCode`, () => {
    return HttpResponse.json({
      stationId: 254,
      stationCode: `nfi`,
      stationName: `Radio Nova`,
      stationBrandCode: `FI_RADIONOVA`,
    });
  }),

  http.get(`${LAPI_BASE}/localstations/:regionCode`, () => {
    return HttpResponse.json(["coo", "dra", "dco"]);
  }),

  http.get<
    PathParams,
    DefaultBodyType,
    SuccessResponseJSON<Paths["/stations/{regionCode}"]["get"]>
  >(`${LAPI_BASE}/stations/:regionCode`, ({ request }) => {
    const searchParams = new URL(request.url).searchParams;

    const stationIds: number[] = searchParams
      .getAll("StationId[]")
      .map((id) => parseInt(id));

    if (stationIds.length) {
      return HttpResponse.json<
        SuccessResponseJSON<Paths["/stations/{regionCode}"]["get"]>
      >(stations.filter((station) => stationIds.includes(station.stationId)));
    }

    return HttpResponse.json<
      SuccessResponseJSON<Paths["/stations/{regionCode}"]["get"]>
    >(stations);
  }),

  http.get<
    PathParams,
    DefaultBodyType,
    SuccessResponseJSON<Paths["/aggregatorbrands"]["get"]>
  >(`${LAPI_BASE}/aggregatorbrands`, ({ request }) => {
    const searchParams = new URL(request.url).searchParams;

    const filter_AggregatorBrandCode = searchParams.get(
      "_filter[AggregatorBrandCode]",
    );

    if (filter_AggregatorBrandCode) {
      return HttpResponse.json<
        SuccessResponseJSON<Paths["/aggregatorbrands"]["get"]>
      >(
        // @ts-expect-error /aggregatorbrands incorrect typing. More detail on PLS 721
        brands.filter(
          (i) => i.AggregatorBrandCode === filter_AggregatorBrandCode,
        ),
      );
    }

    return HttpResponse.json<
      SuccessResponseJSON<Paths["/aggregatorbrands"]["get"]>
      // @ts-expect-error /aggregatorbrands incorrect typing. More detail on PLS 721
    >(brands);
  }),

  http.get<
    PathParams,
    DefaultBodyType,
    SuccessResponseJSON<Paths["/stations_nowplaying/{regionCode}"]["get"]>
  >(`${LAPI_BASE}/stations_nowplaying/:regionCode`, () => {
    return HttpResponse.json<
      SuccessResponseJSON<Paths["/stations_nowplaying/{regionCode}"]["get"]>
    >(stationsNowPlaying);
  }),
];
