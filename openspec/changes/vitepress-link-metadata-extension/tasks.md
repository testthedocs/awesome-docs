## 1. Project Setup and Dependencies

- [x] 1.1 Install cheerio for HTML parsing (`pnpm add -D cheerio`)
- [x] 1.2 Install @types/node for TypeScript support if needed
- [x] 1.3 Create directory structure: `docs/.vitepress/plugins/`, `docs/.vitepress/theme/components/`, `docs/.vitepress/theme/composables/`
- [x] 1.4 Create cache directory: `docs/.vitepress/cache/`
- [x] 1.5 Add `.vitepress/cache/` to .gitignore (optional, decide based on team preference)

## 2. Metadata Fetching Service

- [x] 2.1 Create `docs/.vitepress/plugins/metadata/fetchMetadata.ts` with HTTP fetch function
- [x] 2.2 Implement Open Graph tag extraction (og:title, og:description, og:image, og:url)
- [x] 2.3 Implement Twitter Card tag extraction (twitter:title, twitter:description, twitter:image)
- [x] 2.4 Implement standard meta tag fallback extraction (description, title)
- [x] 2.5 Implement favicon detection logic (check /favicon.ico, /favicon.svg, /apple-touch-icon.png)
- [x] 2.6 Add HTML entity decoding for metadata text
- [x] 2.7 Implement metadata normalization to consistent format
- [x] 2.8 Add HTTP error handling (404, timeout, network errors)
- [x] 2.9 Implement request timeout (10 seconds default)
- [x] 2.10 Add User-Agent header to requests

## 3. Rate Limiting and Request Management

- [x] 3.1 Create `docs/.vitepress/plugins/metadata/rateLimiter.ts`
- [x] 3.2 Implement concurrent request limiting (max 5 simultaneous)
- [x] 3.3 Implement per-domain request delay (500ms between same-domain requests)
- [x] 3.4 Add request queue management
- [x] 3.5 Add domain extraction and grouping logic

## 4. Cache System Implementation

- [x] 4.1 Create `docs/.vitepress/plugins/metadata/cache.ts`
- [x] 4.2 Implement cache file read/write operations
- [x] 4.3 Add cache entry structure with fetchedAt timestamp
- [x] 4.4 Implement TTL-based cache validation (7-day default)
- [x] 4.5 Add cache corruption handling (invalid JSON recovery)
- [x] 4.6 Implement atomic write operations for cache updates
- [x] 4.7 Add URL hashing for cache keys
- [x] 4.8 Create cache statistics tracking (hit rate, size)
- [x] 4.9 Implement cache clear command/function
- [x] 4.10 Implement cache refresh command/function

## 5. VitePress Plugin Development

- [x] 5.1 Create `docs/.vitepress/plugins/linkMetadataPlugin.ts`
- [x] 5.2 Hook into VitePress buildStart lifecycle
- [x] 5.3 Scan markdown files for EnhancedLink component usage
- [x] 5.4 Extract URLs from component props
- [x] 5.5 Fetch metadata for all URLs (using cache when valid)
- [x] 5.6 Update cache with newly fetched metadata
- [x] 5.7 Add build logging (cache hits, fetches, errors)
- [x] 5.8 Add SKIP_METADATA environment variable support for development
- [x] 5.9 Register plugin in `docs/.vitepress/config.mjs`

## 6. Placeholder Icon System

- [x] 6.1 Create `docs/.vitepress/theme/components/icons/` directory
- [x] 6.2 Create default link icon SVG (`LinkIcon.vue`)
- [x] 6.3 Create code/GitHub icon SVG (`CodeIcon.vue`)
- [x] 6.4 Create documentation/book icon SVG (`BookIcon.vue`)
- [x] 6.5 Create video/play icon SVG (`VideoIcon.vue`)
- [x] 6.6 Implement icon selection logic based on domain
- [x] 6.7 Add CSS variable support for theme-aware colors
- [x] 6.8 Optimize SVG files (minify, remove unnecessary attributes)
- [x] 6.9 Add ARIA labels to icon components

## 7. EnhancedLink Vue Component

- [x] 7.1 Create `docs/.vitepress/theme/components/EnhancedLink.vue`
- [x] 7.2 Define component props (url, layout, title, description, icon)
- [x] 7.3 Implement metadata loading from cache via composable
- [x] 7.4 Implement card layout rendering
- [x] 7.5 Implement inline layout rendering
- [x] 7.6 Implement compact layout rendering
- [x] 7.7 Add logo/favicon image rendering with error handling
- [x] 7.8 Add placeholder icon fallback logic
- [x] 7.9 Implement custom metadata override support
- [x] 7.10 Add loading state skeleton (for future client-side support)
- [x] 7.11 Add error state handling (render as plain link)
- [x] 7.12 Implement responsive design (mobile/desktop layouts)
- [x] 7.13 Add proper ARIA labels and roles
- [x] 7.14 Ensure keyboard navigation support (focusable, Enter key activation)
- [x] 7.15 Test color contrast for WCAG AA compliance

## 8. ResourceGrid Container Component

- [x] 8.1 Create `docs/.vitepress/theme/components/ResourceGrid.vue`
- [x] 8.2 Implement responsive grid layout (CSS Grid)
- [x] 8.3 Configure grid columns (2-3 on desktop, 1 on mobile)
- [x] 8.4 Add gap spacing between grid items
- [x] 8.5 Support slot-based content for EnhancedLink children

## 9. Metadata Composable

- [x] 9.1 Create `docs/.vitepress/theme/composables/useMetadata.ts`
- [x] 9.2 Implement cache file reading logic
- [x] 9.3 Add metadata lookup by URL function
- [x] 9.4 Add reactive metadata state management
- [x] 9.5 Export typed metadata interface

## 10. Theme Integration

- [x] 10.1 Update `docs/.vitepress/theme/index.ts` to register EnhancedLink component
- [x] 10.2 Register ResourceGrid component globally
- [x] 10.3 Import and apply component styles
- [x] 10.4 Test theme integration with VitePress dev server

## 11. Component Styling

- [x] 11.1 Create `docs/.vitepress/theme/components/EnhancedLink.vue` styles
- [x] 11.2 Implement card layout styles (padding, border, shadow)
- [x] 11.3 Implement inline layout styles (compact, icon sizing)
- [x] 11.4 Add hover and focus states
- [x] 11.5 Implement dark theme support using VitePress CSS variables
- [x] 11.6 Add smooth transitions for interactive states
- [x] 11.7 Ensure responsive breakpoints match VitePress defaults
- [x] 11.8 Test styles in both light and dark themes

## 12. Documentation Updates

- [x] 12.1 Update `docs/tools.md` to use EnhancedLink for key tools (5-10 examples)
- [x] 12.2 Update `docs/style-guides.md` to use EnhancedLink for style guides (5-10 examples)
- [x] 12.3 Create usage documentation in `docs/contributing/` explaining EnhancedLink component
- [x] 12.4 Add examples of different layouts (card, inline, grid)
- [x] 12.5 Document custom metadata override usage
- [x] 12.6 Add troubleshooting section for common issues

## 13. Testing and Validation

- [x] 13.1 Test metadata fetching with various URL types (GitHub, docs sites, blogs)
- [x] 13.2 Test cache hit/miss scenarios
- [ ] 13.3 Test TTL expiration and cache refresh
- [x] 13.4 Test error handling (404, timeout, invalid URLs)
- [ ] 13.5 Test placeholder icon display for URLs without logos
- [ ] 13.6 Test all layout variants (card, inline, grid)
- [ ] 13.7 Test responsive behavior on mobile and desktop
- [ ] 13.8 Test keyboard navigation and accessibility
- [ ] 13.9 Test with screen reader (VoiceOver or NVDA)
- [ ] 13.10 Validate color contrast with accessibility tools
- [x] 13.11 Test build performance with ~100 links
- [x] 13.12 Test SKIP_METADATA environment variable

## 14. Performance Optimization

- [x] 14.1 Measure build time impact with metadata fetching
- [x] 14.2 Optimize concurrent request limits if needed
- [x] 14.3 Verify cache is preventing redundant fetches
- [x] 14.4 Optimize image loading (lazy loading if needed)
- [x] 14.5 Minimize component bundle size
- [x] 14.6 Test production build size impact

## 15. Documentation and Cleanup

- [x] 15.1 Add JSDoc comments to all functions and components
- [x] 15.2 Create README.md in `.vitepress/plugins/metadata/` explaining the system
- [x] 15.3 Document configuration options (TTL, concurrency limits, etc.)
- [x] 15.4 Add inline code comments for complex logic
- [x] 15.5 Update main project README with new feature description
- [x] 15.6 Create CHANGELOG entry for the new feature

## 16. Final Review and Polish

- [x] 16.1 Review all code for consistency and best practices
- [x] 16.2 Ensure TypeScript types are properly defined
- [x] 16.3 Test full build and preview process
- [x] 16.4 Verify no console errors or warnings
- [ ] 16.5 Review accessibility compliance
- [ ] 16.6 Get feedback from team members
- [ ] 16.7 Address any final issues or improvements
