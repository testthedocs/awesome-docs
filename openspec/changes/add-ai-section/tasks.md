## 1. VitePress Config Updates

- [x] 1.1 Add "AI" top-level nav item to `docs/.vitepress/config.mjs` with sub-items: AI Writing (`/ai/writing`), AI Review (`/ai/review`), MCP Servers (`/ai/mcp-servers`)
- [x] 1.2 Add "AI" sidebar group to `docs/.vitepress/config.mjs` with entries: Overview (`/ai/`), Writing (`/ai/writing`), Review (`/ai/review`), MCP Servers (`/ai/mcp-servers`)

## 2. AI Section Pages

- [x] 2.1 Create `docs/ai/index.md` — landing page with overview of all three sub-pages and brief descriptions of each area
- [x] 2.2 Create `docs/ai/writing.md` — AI writing assistants section and agent skills/prompts section for technical writing
- [x] 2.3 Create `docs/ai/review.md` — AI review tools section and agent skills/prompts section for documentation review
- [x] 2.4 Create `docs/ai/mcp-servers.md` — MCP introduction, Vale MCP server entry, and contribution invitation

## 3. Cross-References in Existing Pages

- [x] 3.1 Add cross-reference in `docs/writing.md` pointing to `/ai/writing` for AI-specific writing tools
- [x] 3.2 Add cross-reference in `docs/quality.md` pointing to `/ai/review` for AI-specific review tools
- [x] 3.3 Add AI section entry to the Categories Overview in `docs/index.md`

## 4. Verification

- [x] 4.1 Run `pnpm docs:dev` and verify all four AI pages render correctly
- [x] 4.2 Verify the AI nav item and sidebar group appear and all links resolve
- [x] 4.3 Verify cross-references in `docs/writing.md` and `docs/quality.md` link correctly
- [x] 4.4 Verify `docs/index.md` Categories Overview includes the AI section link
