/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order, since "undici" depends on the "TextEncoder" global API.
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 *
 * https://mswjs.io/docs/migrations/1.x-to-2.x#requestresponsetextencoder-is-not-defined-jest
 */

/* eslint-disable */

import { ReadableStream } from "node:stream/web";

const { TextDecoder, TextEncoder } = require("node:util");
const { clearImmediate } = require("node:timers");
const { performance } = require("node:perf_hooks");

if (globalThis.ReadableStream === undefined) {
  globalThis.ReadableStream = ReadableStream;
}

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  performance: { value: performance, writable: true },
  clearImmediate: { value: clearImmediate },
});

const { Blob, File } = require("node:buffer");
const { fetch, Headers, FormData, Request, Response } = require("undici");

Object.defineProperties(globalThis, {
  fetch: { value: fetch, writable: true },
  Blob: { value: Blob },
  File: { value: File },
  Headers: { value: Headers },
  FormData: { value: FormData },
  Request: { value: Request },
  Response: { value: Response },
});
