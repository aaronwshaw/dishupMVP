# Runbook: a Sentry error alert fired

DishUp reports browser and server errors to Sentry. A **new issue** emails the owner (Aaron).

## Setup (once)
1. Create a Sentry project (platform: Next.js) and copy its DSN.
2. In Vercel → Project → Settings → Environment Variables, add `NEXT_PUBLIC_SENTRY_DSN`
   for **Production** and **Preview**, then redeploy.
3. In Sentry → Alerts, create an issue alert: "A new issue is created" → email the owner.
4. Test it: open a **preview** deployment at `/debug/error`. The issue should appear in
   Sentry within a minute, tagged with the commit (release) and `preview` environment, and
   the alert email should arrive. In production, `/debug/error` returns 404.

## When an alert arrives
1. **Open the issue in Sentry.** Check how many users and events, the browser, and the page.
2. **Find the release.** The `release` tag is the Git commit. If it started with the latest
   deploy, roll back first: Vercel → Deployments → previous deployment → *Instant Rollback*.
3. **Reproduce** on the page in the issue (use the breadcrumbs to see what the user did).
4. **Fix** on a `fix/OD-###-…` branch, add a test that fails without the fix, open a PR.
5. **Resolve** the issue in Sentry as "resolved in next release" so it reopens if it returns.

## Severity guide
| Situation | Action |
|---|---|
| Users can't search, open a dish, or post a review | Roll back now, then fix |
| Error on one page or browser, workaround exists | Fix within a day |
| Noise (browser extensions, bots) | Ignore the issue in Sentry |
