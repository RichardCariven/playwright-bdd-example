"use client";

import { useContext } from "react";
import useSWRSubscription from "swr/subscription";

import { type LapiSchema } from "@rayo/fetch-client/*";
import { PusherContext } from "@web/components/Providers/PusherProvider";

export type NowPlaying = Partial<
  Pick<
    LapiSchema.components["schemas"]["Station"],
    "stationNowPlaying" | "stationOnAir"
  >
>;

export default function usePusherNowPlaying({
  stationCode,
  hls,
}: {
  stationCode: string;
  hls?: boolean;
}) {
  const pusher = useContext(PusherContext);

  if (!pusher) {
    throw new Error("Can't find Pusher context provider");
  }

  return useSWRSubscription<NowPlaying, boolean, [string, string]>(
    ["pusher", `cache-station-${hls ? "hls-" : ""}${stationCode}`],
    ([, channelName], { next }) => {
      function onError(message: string, error?: unknown) {
        next(true);
        console.error("Pusher error", message, error);
      }

      if (!pusher.client) return;

      const channel = pusher.client.subscribe(channelName);

      pusher.client.connection.bind("error", (error: unknown) =>
        onError("Connection error", error),
      );
      channel.bind("pusher:subscription_error", (error: unknown) =>
        onError("Subscription error", error),
      );
      channel.bind("pusher:cache_miss", () => onError("Cache miss"));

      channel.bind("station.update", (m: NowPlaying) => {
        next(null, (state) => ({
          ...state,
          ...m,
        }));
      });

      return () => {
        pusher.client?.connection.unbind("error", (error: unknown) =>
          onError("Connection error", error),
        );
        channel.unbind();
        pusher.client?.unsubscribe(channelName);
      };
    },
  );
}
