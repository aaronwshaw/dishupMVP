import { notFound } from "next/navigation";

// Throws on purpose so we can confirm errors reach Sentry and alerts fire.
// Only works on preview deployments and locally; production returns 404.
export default function DebugErrorPage() {
  if (process.env.VERCEL_ENV === "production") notFound();
  throw new Error(`DishUp test error (${process.env.VERCEL_ENV ?? "local"})`);
}

export const dynamic = "force-dynamic";
