# Changelog

## Unreleased

### Added

- **Enhanced Link Cards** — New `EnhancedLink` Vue component renders external links as rich cards with metadata (title, description, logo/favicon). Supports `card`, `inline`, and `compact` layout variants.
- **ResourceGrid component** — Responsive CSS Grid container for displaying multiple `EnhancedLink` cards in a 2–3 column layout.
- **Build-time metadata fetching** — VitePress plugin (`linkMetadataPlugin`) scans markdown files for `<EnhancedLink>` components and fetches Open Graph / Twitter Card / favicon metadata at build time.
- **Metadata cache system** — Disk-backed JSON cache at `.vitepress/cache/link-metadata.json` with 7-day TTL, atomic writes, and corruption recovery.
- **Redirect handling** — Metadata fetcher follows HTTP redirects and stores both original and final URLs in the cache so cards render correctly for redirecting URLs.
- **Rate limiting** — Concurrent request limiter (max 5 simultaneous) with per-domain delay (500 ms) to avoid overwhelming external servers.
- **Placeholder icon system** — Category-based SVG placeholder icons (code, book, video, link) for URLs without logos or favicons. Icons use CSS variables for automatic light/dark theme adaptation.
- **`SKIP_METADATA` environment variable** — Set `SKIP_METADATA=true` to skip metadata fetching during local development for faster startup.
- **Usage documentation** — New page at `/contributing/enhanced-links` explaining component API, layouts, custom overrides, redirect handling, and troubleshooting.
- **Plugin README** — Technical documentation at `docs/.vitepress/plugins/metadata/README.md` covering architecture, configuration, and cache format.

### Dependencies

- Added `cheerio` for server-side HTML parsing during metadata fetching.
- Added `@types/node` for TypeScript support in Node.js build scripts.
