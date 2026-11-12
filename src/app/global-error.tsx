"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

// Replaces the root layout when it crashes, so it can't rely on global styles.
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "96px 16px", color: "#2d333f" }}>
        <title>Something went wrong · DishUp</title>
        <h1 style={{ fontSize: 24 }}>Something went wrong on our end</h1>
        <p style={{ color: "#6f737b" }}>We&apos;ve been notified and are looking into it.</p>
        <button
          type="button"
          onClick={retry}
          style={{ marginTop: 16, background: "#da3743", color: "#fff", border: 0, borderRadius: 6, padding: "12px 24px", fontWeight: 700 }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
