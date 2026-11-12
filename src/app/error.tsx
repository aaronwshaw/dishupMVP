"use client";

import { useEffect } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-5xl font-extrabold text-brand">Oops</p>
      <h1 className="mt-4 text-2xl font-extrabold">Something went wrong on our end</h1>
      <p className="mt-2 text-muted">We&apos;ve been notified and are looking into it.</p>
      <div className="mt-6 flex gap-3">
        <button type="button" onClick={retry} className="rounded-md bg-brand px-6 py-3 font-bold text-white hover:bg-brand-dark">
          Try again
        </button>
        <Link href="/" className="rounded-md border border-line px-6 py-3 font-bold hover:bg-band">
          Back to home
        </Link>
      </div>
    </div>
  );
}
