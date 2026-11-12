import * as Sentry from "@sentry/nextjs";
import { sentryOptions } from "@/lib/monitoring";

export function register() {
  // Same settings on the Node.js and edge runtimes.
  Sentry.init(sentryOptions());
}

// Reports errors thrown while rendering pages on the server.
export const onRequestError = Sentry.captureRequestError;
