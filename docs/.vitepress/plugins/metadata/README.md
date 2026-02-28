# Link Metadata Plugin

Build-time metadata fetching and caching system for VitePress enhanced link cards.

## Overview

This plugin scans markdown files for `<EnhancedLink>` components, fetches Open Graph / Twitter Card / favicon metadata from each URL at build time, and persists the results to a JSON cache. The Vue components read from this cache at render time — no runtime HTTP requests are made.

## Files

| File | Purpose |
|------|---------|
| `fetchMetadata.ts` | HTTP fetch + HTML parsing (cheerio). Extracts OG, Twitter Card, and standard meta tags. Follows redirects and stores both original and final URL. |
| `rateLimiter.ts` | Concurrent request limiter (default: 5 simultaneous) with per-domain delay (default: 500 ms). Prevents overwhelming external servers. |
| `cache.ts` | Disk-backed JSON cache with 7-day TTL, atomic writes, corruption recovery, and redirect alias support. |
| `../linkMetadataPlugin.ts` | VitePress/Vite plugin entry point. Hooks into `buildStart`, scans markdown, orchestrates fetching and caching. |

## Configuration

All defaults can be changed by editing `linkMetadataPlugin.ts`:

| Option | Default | Description |
|--------|---------|-------------|
| Cache TTL | 7 days | How long cached entries are considered fresh |
| Max concurrent requests | 5 | Maximum simultaneous HTTP requests |
| Per-domain delay | 500 ms | Minimum gap between requests to the same domain |
| Request timeout | 10 s | Abort a fetch after this many milliseconds |
| Cache file path | `docs/.vitepress/cache/link-metadata.json` | Location of the cache file |

## Environment Variables

| Variable | Effect |
|----------|--------|
| `SKIP_METADATA=true` | Skip all metadata fetching (useful for fast local dev) |

## Cache Format

```json
{
  "https://example.com/": {
    "metadata": {
      "title": "Example Domain",
      "description": "This domain is for use in illustrative examples.",
      "image": null,
      "favicon": "https://example.com/favicon.ico",
      "url": "https://example.com/",
      "finalUrl": "https://example.com/"
    },
    "fetchedAt": "2026-02-28T15:00:00.000Z"
  }
}
```

Each entry is keyed by the **original URL** as written in the markdown. If the URL redirects, an alias entry is also stored under the **final URL** so both keys resolve to the same metadata.

## Redirect Handling

The fetcher uses `redirect: 'follow'` and records `response.url` as `finalUrl`. The cache stores entries under both the original and final URL. This means:

- Authors write the URL they know (e.g. the old domain)
- The card renders correctly using metadata from the redirected destination
- No manual URL updates are needed when sites migrate

## Adding New URLs

Simply add an `<EnhancedLink url="...">` component to any markdown file. The plugin will detect it on the next build and fetch its metadata automatically.

## Clearing the Cache

```bash
# Clear entire cache
rm docs/.vitepress/cache/link-metadata.json

# Rebuild with fresh metadata
pnpm docs:build
```
