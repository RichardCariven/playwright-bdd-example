import { initSentry } from "helpers/sentryConfig";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    initSentry();
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    initSentry();
  }
}
