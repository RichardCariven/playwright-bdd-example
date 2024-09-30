// Extends expect with jest-dom matchers like toHaveClass, toHaveStyle, toBeChecked, etc.
import "@testing-library/jest-dom";
import "whatwg-fetch";

import fetch from "node-fetch";

import { afterAll, afterEach, beforeAll } from "@jest/globals";
import { server } from "@rayo/msw-handlers/src/server";

const globalThisAny = global;
globalThisAny.fetch = fetch;

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});

afterAll(() => server.close());

afterEach(() => server.resetHandlers());

server.events.on("request:start", ({ request }) => {
  // eslint-disable-next-line no-console
  console.log("Outgoing:", request.method, request.url);
});
