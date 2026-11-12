// Shared Sentry settings for the browser, server and edge runtimes. Monitoring stays
// off until NEXT_PUBLIC_SENTRY_DSN is set (in Vercel), so local dev and CI send nothing.
import type { BrowserOptions } from "@sentry/nextjs";

export function sentryOptions(): BrowserOptions {
  return {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
    // Ties each error to the deploy that introduced it.
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
    // Sample 10% of page loads for performance data; errors are always sent.
    tracesSampleRate: 0.1,
    // Reviews can include a person's name; don't attach IPs or cookies.
    sendDefaultPii: false,
  };
}
