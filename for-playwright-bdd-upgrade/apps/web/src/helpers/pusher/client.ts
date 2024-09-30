import Pusher from "pusher-js";

import { getConfig } from "@web/config";

const IS_SERVER = typeof window === typeof undefined;

export function createPusherClient() {
  const { pusherKey } = getConfig();

  if (!pusherKey) {
    throw new Error("No Pusher key set");
  }

  // We dont need WS client open on server
  if (IS_SERVER) {
    return undefined;
  }

  const pusher = new Pusher(pusherKey, {
    cluster: "eu",
    forceTLS: true,
  });

  return pusher;
}
