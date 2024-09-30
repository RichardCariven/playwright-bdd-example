/**
 * openapi-fetch uses native "fetch" by default under to hood.
 * nextjs has extended version of native fetch what wont be used if we dont give the fetch
 * as a prop when creating the client. extended version of fetch is required for nextjs
 * internal caching to work
 */

import createClient from "openapi-fetch";

import { Config } from "./config";
import type { paths as contentPaths } from "./schemas/content";
import type { paths as eventsPaths } from "./schemas/events";
import type { paths as lapiPaths } from "./schemas/lapi";
import type { paths as shepherdPaths } from "./schemas/shepherd";
import type { paths as subscriptionsPaths } from "./schemas/subscriptions";

const eventsApi = createClient<eventsPaths>({
  baseUrl: Config.events.prod,
  fetch: (p) => fetch(p),
  keepalive: true,
});

const listenApi = createClient<lapiPaths>({
  baseUrl: Config.listen.prod,
  fetch: (p) => fetch(p),
  keepalive: true,
});

const contentApi = createClient<contentPaths>({
  baseUrl: Config.helix.prod,
  fetch: (p) => fetch(p),
  keepalive: true,
});

const shepherdApi = createClient<shepherdPaths>({
  baseUrl: Config.shepherd.prod,
  fetch: (p) => fetch(p),
  keepalive: true,
});

const subscriptionsApi = createClient<subscriptionsPaths>({
  baseUrl: Config.subscriptions.prod,
  fetch: (p) => fetch(p),
  keepalive: true,
});

export { listenApi, eventsApi, contentApi, shepherdApi, subscriptionsApi };

export * as ContentSchema from "./schemas/content/index";
export * as EventsSchema from "./schemas/events/index";
export * as LapiSchema from "./schemas/lapi/index";
export * as ShepherdSchema from "./schemas/shepherd/index";
export * as SubscriptionsSchema from "./schemas/subscriptions/index";
