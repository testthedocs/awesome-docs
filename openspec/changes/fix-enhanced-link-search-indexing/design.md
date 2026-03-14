## Context

VitePress's built-in local search works by indexing the **static markdown source** of each page at build time. It does not execute Vue components or fetch runtime data.

`<EnhancedLink>` components that omit the `title` prop display their link title by fetching metadata from `/cache/link-metadata.json` in the browser at runtime. Because the search indexer never sees this fetched title, those links are invisible to search — searching for "GitLab Style Guide", "Google Developer Documentation Style Guide", etc. returns no results even though those pages exist.

The metadata cache (`docs/.vitepress/cache/link-metadata.json`) already contains the correct titles for all URLs — it is populated at build time by the `linkMetadataPlugin`. The titles are available; they just aren't written into the markdown source.

**Affected files (EnhancedLink usages without `title`):**
- `docs/style-guides.md` — multiple `<ResourceGrid>` blocks
- `docs/tools.md` — multiple `<ResourceGrid>` blocks
- `docs/contributing/enhanced-links.md` — example usages (documentation page)

## Goals / Non-Goals

**Goals:**
- Every `<EnhancedLink>` in the docs has an explicit `title` prop so VitePress search can index it.
- Titles are sourced from the existing metadata cache — no new network requests.
- The fix is purely in markdown content files; no component or plugin code changes.

**Non-Goals:**
- Changing the `EnhancedLink` component's runtime behaviour.
- Modifying the metadata fetch/cache pipeline.
- Adding search indexing for `description` or other metadata fields (out of scope).
- Fixing the example usages in `docs/contributing/enhanced-links.md` — those are intentional illustrations of the component API and should remain as-is.

## Decisions

### Decision 1: Add `title` props to markdown source (not a build-time transform)

**Chosen:** Manually add `title="..."` to each `<EnhancedLink>` in the markdown files, using the metadata cache as the source of truth.

**Alternatives considered:**
- *VitePress search `_render` hook*: Could transform component markup into indexable text at search-index build time. More complex, requires ongoing maintenance, and is fragile against VitePress upgrades.
- *Markdown-it plugin to inject titles*: Would auto-populate titles from the cache during the markdown parse phase. Adds build complexity and makes the markdown source less readable/auditable.
- *Always require `title` prop (lint rule)*: Good long-term hygiene but doesn't fix existing content.

**Rationale:** Explicit `title` props in the markdown source are the simplest, most transparent, and most maintainable solution. The markdown becomes self-documenting, the search index is correct, and no tooling changes are needed.

### Decision 2: Source titles from the metadata cache

**Chosen:** Read `docs/.vitepress/cache/link-metadata.json` to get the canonical title for each URL.

**Rationale:** The cache is already populated and authoritative. Using it avoids any new network requests and ensures consistency between what the card displays at runtime and what the search index contains.

### Decision 3: Use the page `<title>` metadata value, trimmed if needed

Some cached titles are verbose (e.g., `"Fast and reliable end-to-end testing for modern web apps | Playwright"`). For the `title` prop, use a human-readable short form (the part before ` | ` or ` - ` where appropriate) to keep the markdown readable and the search results clean.

## Risks / Trade-offs

- **Cache staleness** → If a linked site changes its page title, the `title` prop in markdown will drift from the fetched metadata. Mitigation: the `title` prop is the authoritative display value; the cache is only used as the initial source. Periodic audits can catch drift.
- **Manual effort** → There are ~30 `<EnhancedLink>` usages to update across 2-3 files. Low risk of error given the small scope.
- **Contributing docs examples** → The `docs/contributing/enhanced-links.md` page intentionally shows `<EnhancedLink>` without `title` as a usage example. These should NOT be changed, as they demonstrate the component's auto-fetch capability.
