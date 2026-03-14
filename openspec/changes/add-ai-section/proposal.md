## Why

AI tooling for technical writing and documentation review is evolving rapidly, and readers of Awesome Docs need a dedicated, structured place to discover AI writing assistants, agent skills/prompt templates, and MCP servers relevant to documentation workflows. The Vale MCP server in particular represents a new paradigm — connecting AI agents directly to prose linting — that has no home in the current docs.

## What Changes

- Add a new `docs/ai/` subdirectory with four pages: `index.md`, `writing.md`, `review.md`, and `mcp-servers.md`
- Add an **AI** top-level nav group in the VitePress config with links to all three sub-pages
- Add an **AI** sidebar group in the VitePress config
- Add a cross-reference from `docs/writing.md` pointing to the new AI writing page
- Add a cross-reference from `docs/quality.md` pointing to the new AI review page
- Populate `docs/ai/writing.md` with AI writing assistants and agent skills/prompt resources for technical writing
- Populate `docs/ai/review.md` with AI review tools and agent skills/prompt resources for documentation review
- Populate `docs/ai/mcp-servers.md` with the Vale MCP server entry and a brief MCP introduction
- Update `docs/index.md` Categories Overview to include the new AI section

## Capabilities

### New Capabilities

- `ai-writing-page`: A curated page of AI writing assistants and agent skills/prompts for technical writing workflows
- `ai-review-page`: A curated page of AI review tools and agent skills/prompts for documentation review workflows
- `ai-mcp-servers-page`: A curated page of MCP servers relevant to documentation, starting with the Vale MCP server
- `ai-section-nav`: VitePress navigation and sidebar entries for the new AI section

### Modified Capabilities

<!-- No existing spec-level capabilities are changing -->

## Impact

- `docs/.vitepress/config.mjs` — nav and sidebar updated
- `docs/index.md` — Categories Overview section updated
- `docs/writing.md` — cross-reference added
- `docs/quality.md` — cross-reference added
- New files: `docs/ai/index.md`, `docs/ai/writing.md`, `docs/ai/review.md`, `docs/ai/mcp-servers.md`
- No breaking changes; all existing pages and URLs remain unchanged
