## Context

The Awesome Docs site is a VitePress-based curated list. Navigation and sidebar are defined in [`docs/.vitepress/config.mjs`](docs/.vitepress/config.mjs). Content pages are Markdown files under `docs/`. The site already uses `EnhancedLink` and `ResourceGrid` Vue components for rich link cards.

Currently there is no AI-specific section. The only AI-related content is a single Grammarly entry in [`docs/writing.md`](docs/writing.md). MCP (Model Context Protocol) servers have no presence at all.

The change adds four new Markdown pages under `docs/ai/`, updates the VitePress config, and adds cross-references from two existing pages.

## Goals / Non-Goals

**Goals:**
- Create `docs/ai/` subdirectory with `index.md`, `writing.md`, `review.md`, and `mcp-servers.md`
- Add a top-level **AI** nav item in `config.mjs` with three sub-items
- Add an **AI** sidebar group in `config.mjs`
- Add cross-reference links from `docs/writing.md` and `docs/quality.md` to the new AI pages
- Update `docs/index.md` Categories Overview to list the new AI section
- Populate each page with curated, relevant content following existing page conventions

**Non-Goals:**
- Moving or removing the Grammarly entry from `docs/writing.md` (cross-link only)
- Adding MCP servers beyond the Vale MCP server in the initial implementation
- Creating a new VitePress theme component or plugin
- Automated link validation for the new pages (handled by existing CI)

## Decisions

### Decision 1: `docs/ai/` subdirectory over a single `docs/ai.md`

**Chosen**: Subdirectory with four files (`index.md`, `writing.md`, `review.md`, `mcp-servers.md`)

**Rationale**: Each topic (writing, review, MCP servers) is a distinct category that will grow independently. A subdirectory allows each to have its own nav entry, sidebar link, and URL. A single flat file would become unwieldy as content grows.

**Alternative considered**: Single `docs/ai.md` — simpler to start but harder to split later without breaking URLs.

### Decision 2: Cross-link from existing pages, not move content

**Chosen**: Add a "See also" cross-reference in `docs/writing.md` and `docs/quality.md` pointing to the new AI pages.

**Rationale**: Moving Grammarly would break the logical flow of `writing.md` (it's a browser extension, not exclusively an AI tool). Cross-linking preserves existing structure while connecting readers to the new section.

**Alternative considered**: Move all AI-adjacent tools to `docs/ai/` — cleaner taxonomy but risks breaking reader expectations and existing bookmarks.

### Decision 3: Top-level nav item for AI

**Chosen**: Add `AI` as a new top-level nav item alongside `Tools` and `Resources`.

**Rationale**: AI tooling is a first-class concern, not a subcategory of existing tools. A top-level item signals its importance and makes it discoverable.

**Alternative considered**: Add AI as a sub-item under `Tools` — less visible, undersells the category.

### Decision 4: Use plain Markdown lists for initial content (not `EnhancedLink`)

**Chosen**: Plain Markdown links for the initial content entries.

**Rationale**: `EnhancedLink` requires metadata fetching at build time. For a new section with potentially unstable URLs (especially MCP server repos), plain links are safer and faster to author. `EnhancedLink` can be adopted incrementally per the existing contributing guide.

**Alternative considered**: Use `EnhancedLink` throughout — richer UX but adds build-time risk for new/unstable URLs.

## Risks / Trade-offs

- **MCP ecosystem immaturity** → The Vale MCP server and MCP in general are early-stage. Links may go stale quickly. Mitigation: note the experimental nature in the page intro; rely on community PRs to keep current.
- **Content staleness for AI tools** → AI tooling moves fast. Mitigation: keep entries minimal (name + one-line description + link); avoid version-specific details.
- **Nav crowding** → Adding a top-level AI item makes the nav bar wider. Mitigation: acceptable at current nav item count; revisit if more top-level items are added.

## Open Questions

- Should `docs/ai/index.md` be a full landing page with summaries of each sub-page, or a minimal redirect-style page? (Recommendation: full landing page, consistent with how other index pages work in the contributing section.)
