## Why

`<EnhancedLink>` components that omit the `title` prop display their link title by fetching metadata at runtime in the browser. VitePress's built-in local search indexes only the static markdown source, so those links have no searchable text — searching for "GitLab Style Guide" (or any other title that comes from fetched metadata) returns zero results. Adding explicit `title` props to every `<EnhancedLink>` in the docs gives the search indexer the text it needs.

## What Changes

- Add a `title` prop to every `<EnhancedLink>` usage that currently omits it across all markdown pages.
- Titles are sourced from the already-populated metadata cache (`docs/.vitepress/cache/link-metadata.json`) so no new network requests are needed.
- No changes to the `EnhancedLink` component, the metadata plugin, or the VitePress config.

## Capabilities

### New Capabilities

- `enhanced-link-title-audit`: Audit all markdown files for `<EnhancedLink>` usages missing a `title` prop and populate them from the metadata cache.

### Modified Capabilities

<!-- No existing spec-level requirements are changing. -->

## Impact

- All markdown files under `docs/` that use `<EnhancedLink>` without a `title` prop.
- The metadata cache (`docs/.vitepress/cache/link-metadata.json`) is read-only for this change (used as the source of truth for titles).
- No runtime or build-pipeline code changes required.
