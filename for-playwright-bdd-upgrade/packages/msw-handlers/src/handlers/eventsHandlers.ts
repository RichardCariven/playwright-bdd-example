import { http, HttpResponse } from "msw";

import { EVENT_API_BASE } from "../config";

// TODO: Move all mocks under fetch-client
export const eventsApiHandlers = [
  http.get(`${EVENT_API_BASE}/events/:id`, () => {
    return HttpResponse.json({
      id: 64,
      title: "VG-Lista Topp 40 Bausa Turné",
      startAt: "2023-06-23T07:21:52.000Z",
      endAt: "2023-06-24T11:00:00.000Z",
      liveStartAt: null,
      liveEndAt: null,
      createdAt: "2023-06-23T07:33:53.000Z",
      updatedAt: "2023-06-23T08:28:13.000Z",
    });
  }),
];
