# Enhanced Link Components

This documentation site uses a custom `EnhancedLink` component that renders external links as rich cards with metadata (title, description, logo/favicon). This guide explains how to use it in documentation pages.

## How It Works

At build time, a VitePress plugin scans all markdown files for `<EnhancedLink>` components, fetches metadata (Open Graph tags, favicons, descriptions) from each URL, and stores the results in a local cache at `.vitepress/cache/link-metadata.json`. The Vue component then reads from this cache at render time — no runtime HTTP requests are made.

## Basic Usage

### Single Card (default layout)

```vue
<EnhancedLink url="https://playwright.dev/" />
```

Renders a card with the site's logo, title, and description.

### Inline Layout

```vue
<EnhancedLink url="https://playwright.dev/" layout="inline" />
```

Renders a compact inline element — useful inside prose paragraphs.

### Compact Layout

```vue
<EnhancedLink url="https://playwright.dev/" layout="compact" />
```

Renders a smaller card with less padding — useful in dense lists.

## Grid of Links

Wrap multiple `<EnhancedLink>` components in a `<ResourceGrid>` to display them in a responsive 2–3 column grid:

```vue
<ResourceGrid>
  <EnhancedLink url="https://playwright.dev/" />
  <EnhancedLink url="https://vitepress.dev/" />
  <EnhancedLink url="https://github.com/vuejs/vue" />
</ResourceGrid>
```

On mobile the grid collapses to a single column automatically.

## Custom Metadata Overrides

If the fetched metadata is incorrect or you want to provide custom text, use the `title`, `description`, and `icon` props:

```vue
<EnhancedLink
  url="https://example.com/"
  title="My Custom Title"
  description="A hand-written description for this resource."
  icon="/icons/custom-icon.svg"
/>
```

Props take precedence over fetched metadata.

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | **required** | The external URL to link to |
| `layout` | `'card' \| 'inline' \| 'compact'` | `'card'` | Display layout variant |
| `title` | `string` | — | Override the fetched title |
| `description` | `string` | — | Override the fetched description |
| `icon` | `string` | — | Override the fetched logo/favicon with a custom image path |

## Placeholder Icons

When a site has no logo or favicon, the component automatically selects a category-based placeholder icon:

| Domain pattern | Icon |
|----------------|------|
| `github.com`, `gitlab.com`, `bitbucket.org` | Code icon |
| `readthedocs.org`, `docs.*` | Book icon |
| `youtube.com`, `vimeo.com` | Video/play icon |
| Everything else | Generic link icon |

## Redirect Handling

The metadata fetcher follows HTTP redirects automatically (up to the runtime limit). Both the original URL and the final URL after redirects are stored in the cache, so cards render correctly even when a URL redirects to a different domain.

## Development Mode

To skip metadata fetching during local development (speeds up the dev server startup):

```bash
SKIP_METADATA=true pnpm docs:dev
```

## Cache Management

The cache file lives at `docs/.vitepress/cache/link-metadata.json` and has a 7-day TTL. Entries are refreshed automatically when they expire.

To force a full cache refresh, delete the cache file before building:

```bash
rm docs/.vitepress/cache/link-metadata.json
pnpm docs:build
```

## Troubleshooting

**Card shows only the URL (no title/description)**
- The URL may have failed to fetch metadata. Check the build log for `[LinkMetadata] ✗ Failed:` warnings.
- The site may block automated requests. Try providing custom `title` and `description` props.

**Logo/favicon not showing**
- The image URL may be unreachable or return an error. The component will fall back to a placeholder icon automatically.

**Build is slow on first run**
- The first build fetches metadata for all URLs. Subsequent builds use the cache and are much faster.
- Use `SKIP_METADATA=true` during development to skip fetching entirely.

**Redirecting URLs not resolving correctly**
- The fetcher follows redirects and caches both the original and final URL. If you see issues, delete the cache file and rebuild to get fresh metadata.
