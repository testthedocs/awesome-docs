## Context

The awesome-docs VitePress site contains extensive external links to tools, style guides, and resources across multiple documentation pages (tools.md, style-guides.md, etc.). Currently, these appear as plain markdown links, providing minimal context about the linked resources. Users must click each link to discover what it offers.

**Current State:**
- VitePress 1.6.4 with custom theme at `docs/.vitepress/theme/`
- Markdown-based documentation with standard link syntax
- No existing metadata fetching or link enhancement system
- Build process uses `vitepress build docs` command

**Constraints:**
- Must not break existing plain links in documentation
- Build time should not increase excessively (target: < 30s additional time for ~100 links)
- Must work with VitePress static site generation
- Should be opt-in to avoid affecting all links globally

**Stakeholders:**
- Documentation readers (improved UX)
- Documentation maintainers (easier content management)
- Build system (performance considerations)

## Goals / Non-Goals

**Goals:**
- Provide Vue components for rendering enhanced links with metadata
- Fetch and cache metadata at build time to optimize performance
- Support multiple display layouts (card, inline, grid)
- Gracefully handle missing metadata with fallbacks
- Maintain accessibility standards (WCAG 2.1 AA)
- Enable selective application via custom components/containers

**Non-Goals:**
- Client-side metadata fetching (build-time only for performance)
- Automatic enhancement of all markdown links (too invasive)
- Real-time metadata updates (cache-based approach)
- Support for non-HTTP(S) protocols
- Image hosting or CDN integration for fetched logos

## Decisions

### Decision 1: Build-time vs Client-side Metadata Fetching

**Choice:** Build-time metadata fetching with disk caching

**Rationale:**
- **Performance:** Avoids runtime HTTP requests, reducing page load time
- **Reliability:** No dependency on external sites being available at runtime
- **CORS:** Eliminates cross-origin request issues
- **SEO:** Metadata available in static HTML for search engines

**Alternatives Considered:**
- Client-side fetching: Rejected due to CORS issues and performance impact
- Hybrid approach: Unnecessary complexity for static documentation site

### Decision 2: Component API Design

**Choice:** Custom Vue component with explicit URL prop

```vue
<EnhancedLink url="https://playwright.dev/" />
<EnhancedLink url="https://github.com/..." layout="inline" />
```

**Rationale:**
- **Explicit control:** Authors choose which links to enhance
- **Flexibility:** Supports multiple layouts and customization
- **Non-breaking:** Existing markdown links remain unchanged
- **Discoverable:** Clear component name and API

**Alternatives Considered:**
- Markdown container syntax (`::: resource`): Less flexible, harder to customize per-link
- Automatic link detection: Too invasive, would affect all links
- CSS class-based (`{.enhanced}`): Limited by VitePress markdown processing

### Decision 3: Metadata Fetching Technology Stack

**Choice:** 
- HTTP client: `node-fetch` or native `fetch` (Node 18+)
- HTML parser: `cheerio` for lightweight DOM parsing
- Image detection: Custom logic checking multiple favicon paths

**Rationale:**
- **Cheerio:** Familiar jQuery-like API, lightweight, server-side compatible
- **Native fetch:** Available in Node 18+, no additional dependency
- **Custom favicon logic:** More reliable than relying on HTML link tags alone

**Alternatives Considered:**
- Puppeteer/Playwright: Rejected due to heavy dependencies and slow execution
- JSDOM: Heavier than cheerio for our needs
- Third-party metadata APIs: Adds external dependency and potential costs

### Decision 4: Cache Storage Format

**Choice:** Single JSON file at `.vitepress/cache/link-metadata.json`

```json
{
  "https://playwright.dev/": {
    "title": "Playwright",
    "description": "Fast and reliable end-to-end testing...",
    "logo": "https://playwright.dev/img/playwright-logo.svg",
    "favicon": "https://playwright.dev/favicon.ico",
    "fetchedAt": "2026-02-28T15:00:00.000Z"
  }
}
```

**Rationale:**
- **Simplicity:** Single file easier to manage than distributed cache
- **Git-friendly:** Can be committed for consistent builds
- **Portable:** Easy to backup, restore, or share across environments
- **Inspectable:** Human-readable JSON for debugging

**Alternatives Considered:**
- SQLite database: Overkill for simple key-value storage
- Individual JSON files per URL: Harder to manage, more file I/O
- In-memory only: Would require refetching on every build

### Decision 5: VitePress Integration Approach

**Choice:** VitePress plugin + theme components

**Architecture:**
```
docs/.vitepress/
├── plugins/
│   └── linkMetadataPlugin.ts    # Build-time metadata fetching
├── theme/
│   ├── components/
│   │   ├── EnhancedLink.vue     # Main component
│   │   └── ResourceGrid.vue     # Grid container
│   ├── composables/
│   │   └── useMetadata.ts       # Metadata access logic
│   └── index.ts                 # Theme registration
└── cache/
    └── link-metadata.json       # Cached metadata
```

**Rationale:**
- **Plugin:** Hooks into VitePress build lifecycle for metadata fetching
- **Theme components:** Provides Vue components for markdown usage
- **Composables:** Shares metadata access logic across components
- **Separation:** Clear boundaries between build-time and runtime concerns

**Alternatives Considered:**
- Markdown-it plugin: Limited to markdown processing, can't provide Vue components
- Standalone CLI tool: Requires separate execution, harder to integrate

### Decision 6: Placeholder Icon Strategy

**Choice:** Inline SVG with category-based selection

**Categories:**
- Code/GitHub: `<svg>...</svg>` (code bracket icon)
- Documentation: `<svg>...</svg>` (book icon)
- Video: `<svg>...</svg>` (play icon)
- Default: `<svg>...</svg>` (link icon)

**Rationale:**
- **Performance:** Inline SVG avoids additional HTTP requests
- **Theming:** SVG can use CSS variables for theme adaptation
- **Scalability:** Vector format works at any size
- **Customization:** Easy to override via component props

**Alternatives Considered:**
- Icon font: Requires additional font file, harder to customize
- PNG/WebP images: Not scalable, requires multiple sizes
- External icon library: Adds dependency and bundle size

### Decision 7: Error Handling Strategy

**Choice:** Graceful degradation with logging

**Approach:**
- Metadata fetch failure → Log warning, return null, render plain link
- Image load failure → Display placeholder icon
- Cache corruption → Delete cache, rebuild from scratch
- Network timeout → 10s timeout, log warning, continue build

**Rationale:**
- **Build reliability:** Never fail the build due to external site issues
- **User experience:** Always show something (plain link as fallback)
- **Debugging:** Logs provide visibility into issues
- **Resilience:** System continues working despite partial failures

**Alternatives Considered:**
- Fail build on errors: Too strict, external sites are unreliable
- Silent failures: Harder to debug issues
- Retry logic: Adds complexity and build time

## Risks / Trade-offs

### Risk: External sites blocking or rate-limiting requests
**Mitigation:** 
- Implement request delays (500ms between same-domain requests)
- Limit concurrent requests (max 5 simultaneous)
- Cache aggressively (7-day TTL)
- Respect robots.txt and add User-Agent header

### Risk: Increased build time
**Mitigation:**
- Build-time caching prevents refetching on every build
- Parallel fetching with concurrency limits
- Skip metadata fetch if cache is valid
- Provide option to disable metadata fetching for local development

### Risk: Stale metadata in cache
**Trade-off:** Accept 7-day staleness for performance
**Mitigation:**
- Configurable TTL for different use cases
- Manual cache refresh command
- Cache clear command for specific URLs

### Risk: Large cache file size
**Trade-off:** Accept larger repository size for better performance
**Mitigation:**
- Cache only essential metadata fields
- Consider .gitignore for cache file (optional)
- Provide cache cleanup command for old entries

### Risk: Accessibility issues with enhanced components
**Mitigation:**
- Follow WCAG 2.1 AA standards
- Proper ARIA labels and roles
- Keyboard navigation support
- Sufficient color contrast
- Screen reader testing

### Risk: Breaking changes to VitePress API
**Mitigation:**
- Use stable VitePress APIs only
- Pin VitePress version in package.json
- Test with VitePress updates before upgrading
- Document VitePress version compatibility

## Migration Plan

**Phase 1: Setup (No user impact)**
1. Install dependencies (`cheerio`, etc.)
2. Create plugin and component structure
3. Implement metadata fetching service
4. Add cache system

**Phase 2: Component Development**
1. Build EnhancedLink component with basic layout
2. Add placeholder icon system
3. Implement error handling and fallbacks
4. Test with sample URLs

**Phase 3: Integration**
1. Register plugin in VitePress config
2. Register components in theme
3. Test build process with caching
4. Verify accessibility standards

**Phase 4: Documentation Updates**
1. Update tools.md with EnhancedLink components
2. Update style-guides.md with enhanced links
3. Create usage documentation
4. Add examples for different layouts

**Rollback Strategy:**
- Components are opt-in, so removal is non-breaking
- Delete component usage from markdown files
- Remove plugin from VitePress config
- Uninstall dependencies

**Deployment:**
- No special deployment steps required
- Cache file can be committed or regenerated
- Build process remains `vitepress build docs`

## Open Questions

1. **Should the cache file be committed to git?**
   - Pros: Consistent builds across environments, faster CI/CD
   - Cons: Repository bloat, merge conflicts
   - **Recommendation:** Commit initially, evaluate after usage

2. **What should the default TTL be?**
   - Current proposal: 7 days
   - Consider: Documentation sites rarely change metadata
   - **Recommendation:** Start with 7 days, make configurable

3. **Should we support custom markdown container syntax in addition to components?**
   - Would enable: `::: resource-grid` for bulk enhancement
   - Trade-off: More implementation complexity
   - **Recommendation:** Start with components, add containers if needed

4. **How to handle redirects when fetching metadata?**
   - Follow redirects automatically (up to 5 hops)
   - Cache final URL or original URL?
   - **Recommendation:** Follow redirects, cache both URLs

5. **Should we provide a preview/development mode without metadata fetching?**
   - Would speed up local development
   - Could use mock metadata or skip enhancement
   - **Recommendation:** Add `SKIP_METADATA=true` environment variable
