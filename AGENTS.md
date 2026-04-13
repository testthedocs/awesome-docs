# AGENTS.md

## Project basics
- VitePress site; main content lives in `README.md` and `docs/`.
- Use `pnpm@10.20.0` (see `package.json`).

## Common commands
- Install deps: `pnpm install` (or `task setup:deps` which uses Homebrew to install node/pnpm).
- Dev server: `pnpm docs:dev` (or `task docs:dev`).
- Build: `pnpm docs:build` (or `task docs:build`).
- Preview build: `pnpm docs:preview` (or `task docs:preview`).

## EnhancedLink metadata (build-time)
- Metadata cache: `docs/.vitepress/cache/link-metadata.json` (7-day TTL), copied to `docs/public/cache/link-metadata.json` on build.
- Skip metadata fetch in dev: `SKIP_METADATA=true pnpm docs:dev`.
- Force refresh: delete `docs/.vitepress/cache/link-metadata.json` before `pnpm docs:build`.

## Content conventions (README list)
- List items are alphabetical, one link per item, and descriptions stay on the same line with trailing punctuation.
- New categories require at least 3 items.

## CI link checks
- GitHub Actions runs `lychee` against `README.md` on PRs and weekly (`.github/workflows/*linkcheck*.yml`).
