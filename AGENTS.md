<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Bazar-Dor

Bengali-language (`lang="bn"`) Next.js 16 App Router site for Bangladesh market prices. Single package; no monorepo, tests, CI, git hooks, or `opencode.json`.

## Verification commands

- `npm run dev` · `npm run build` · `npm run start` · `npm run lint` (bare `eslint`, no fix script).
- No test or typecheck script. Typecheck with `npx next typegen && npx tsc --noEmit`: `LayoutProps<"/">` in `src/app/layout.tsx` is a generated global from `.next/(dev/)types`, so a clean checkout fails typecheck before typegen runs.

## Structure and wiring

- App code lives in `src/app`; `@/*` maps to `./src/*`. README's `app/page.tsx` is stale `create-next-app` boilerplate.
- `src/app/layout.tsx` is the only root layout: loads Google font Hind Siliguri (latin + bengali) and mounts Header/Footer around children.
- Header's `Navlinks` and `MarqueeSection` are async Server Components that `fetch` `https://openapi.programming-hero.com/api/bazardor/{categories,products}` at render inside one `<Suspense>`. There are no API routes or local data layer; dev/build need that network (and Google fonts) and throw on non-OK API responses.
- Nav links point to `/categories/[slug]`, but that route is not implemented yet.

## Toolchain quirks

- `next.config.ts` enables `reactCompiler: true` and maps `*.css` through `@tailwindcss/turbopack` (Tailwind 4, no PostCSS config). Read `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/reactCompiler.md` before writing compiler-sensitive code.
- `src/app/globals.css` imports `tailwindcss`; daisyUI is installed but `@plugin "daisyui"` is commented out, so `data-theme="light"` on `<html>` currently has no daisyUI effect.
- Keep the managed Next.js block above byte-for-byte; `next dev` rewrites it when the installed version changes.
