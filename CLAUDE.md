@AGENTS.md

# OpenDish (DishUp) — rules for AI agents and humans

OpenDish lets people rate a specific dish at a restaurant. Stack: Next.js 16 (App Router),
React 19, TypeScript (strict), Tailwind CSS v4, deployed on Vercel. All data access goes
through `src/lib/data.ts`; reviews are in browser localStorage until OD-13 (Supabase).
Team process: OpenDish Engineering Playbook (Kanban board, GitHub Flow, Conventional Commits).

## Always
- Start from the board ticket (OD-###). Plan before editing; list the files you will touch.
- TypeScript strict. No `any`. Validate user input at the boundary.
- Keep business logic in `src/lib/` as small pure functions.
- Mobile-first: check layouts at 390px. Every control is reachable by keyboard.
- Run `npm run lint` and `npm run build` before saying a task is done. Show the output.
- Commits: Conventional Commits with the ticket, e.g. `fix(review): scroll to new review (OD-4)`.

## Never
- Never read, print or edit `.env*` files or paste secrets/keys into prompts or code.
- Never push to `main`, force-push, merge PRs, or change `.github/` or this file.
- Never add a dependency without saying why; prefer what is already in package.json.
- Never disable a lint rule or skip a check to make CI pass.
