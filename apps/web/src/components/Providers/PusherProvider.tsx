"use client";

import { createContext, useMemo, useRef, type ReactNode } from "react";
import type Pusher from "pusher-js";

import { createPusherClient } from "@web/helpers/pusher/client";

export const PusherProvider = ({ children }: { children: ReactNode }) => {
  const active = useRef(false);

  // Pusher client needs to be a singleton
  const pusher = useMemo(() => {
    if (active.current) {
      return undefined;
    }
    active.current = true;
    return createPusherClient();
  }, []);

  return (
    <PusherContext.Provider value={{ client: pusher }}>
      {children}
    </PusherContext.Provider>
  );
};

export const PusherContext = createContext<{ client: Pusher | undefined }>({
  client: undefined,
});
