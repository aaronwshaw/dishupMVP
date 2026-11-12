import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
    // Tests never touch real services, even if a developer's shell has the keys set.
    env: { NEXT_PUBLIC_SUPABASE_URL: "", NEXT_PUBLIC_SUPABASE_ANON_KEY: "", NEXT_PUBLIC_SENTRY_DSN: "" },
    coverage: {
      provider: "v8",
      // Business logic lives in src/lib; UI is checked by lint, types and the build.
      include: ["src/lib/**/*.ts"],
      exclude: ["src/lib/**/*.test.ts", "src/lib/types.ts", "src/lib/useReviews.ts", "src/lib/monitoring.ts"],
      reporter: ["text", "text-summary"],
      // CI fails if coverage drops below these.
      thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 },
    },
  },
});
