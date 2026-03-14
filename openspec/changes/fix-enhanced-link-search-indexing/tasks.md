## 1. Audit EnhancedLink usages

- [x] 1.1 Identify all `<EnhancedLink>` usages without a `title` prop in `docs/style-guides.md`
- [x] 1.2 Identify all `<EnhancedLink>` usages without a `title` prop in `docs/tools.md`
- [x] 1.3 Cross-reference each URL against `docs/.vitepress/cache/link-metadata.json` to get the canonical title

## 2. Update docs/style-guides.md

- [x] 2.1 Add `title` prop to `<EnhancedLink url="https://github.com/18F/guides" />` (Government & Standards section)
- [x] 2.2 Add `title` prop to `<EnhancedLink url="https://plainlanguage.gov/guidelines" />` (Government & Standards section)
- [x] 2.3 Add `title` prop to `<EnhancedLink url="https://www.un.org/dgacm/content/editorial-manual" />` (Government & Standards section)
- [x] 2.4 Add `title` prop to `<EnhancedLink url="https://developer.mozilla.org/en-US/docs/Web/Accessibility" />` (Web Standards & Accessibility section)
- [x] 2.5 Add `title` prop to `<EnhancedLink url="https://www.w3.org/TR/WCAG21/" />` (Web Standards & Accessibility section)
- [x] 2.6 Add `title` prop to `<EnhancedLink url="https://www.accessible-social.com/quick-guide" />` (Web Standards & Accessibility section)
- [x] 2.7 Add `title` prop to `<EnhancedLink url="https://developers.google.com/style/" />` (Developer-Focused section)
- [x] 2.8 Add `title` prop to `<EnhancedLink url="https://docs.microsoft.com/en-us/style-guide/welcome/" />` (Developer-Focused section)
- [x] 2.9 Add `title` prop to `<EnhancedLink url="https://redhat-documentation.github.io/" />` (Developer-Focused section)
- [x] 2.10 Add `title` prop to `<EnhancedLink url="https://stylepedia.net/" />` (Developer-Focused section)
- [x] 2.11 Add `title` prop to `<EnhancedLink url="https://www.digitalocean.com/community/tutorials/digitalocean-s-technical-writing-guidelines" />` (Cloud & Infrastructure section)
- [x] 2.12 Add `title` prop to `<EnhancedLink url="https://www.linode.com/docs/linode-writers-formatting-guide/" />` (Cloud & Infrastructure section)
- [x] 2.13 Add `title` prop to `<EnhancedLink url="https://github.com/rackerlabs/docs-style-guide/tree/master/style-guide" />` (Cloud & Infrastructure section)
- [x] 2.14 Add `title` prop to `<EnhancedLink url="https://developer.salesforce.com/docs/atlas.en-us.salesforce_pubs_style_guide.meta/salesforce_pubs_style_guide/overview.htm" />` (Cloud & Infrastructure section)
- [x] 2.15 Add `title` prop to `<EnhancedLink url="https://clig.dev/" />` (Technical Writing section)
- [x] 2.16 Add `title` prop to `<EnhancedLink url="https://github.com/lornajane/developer-style-guide" />` (Technical Writing section)
- [x] 2.17 Add `title` prop to `<EnhancedLink url="https://www.markdownguide.org/" />` (Technical Writing section)

## 3. Update docs/tools.md

- [x] 3.1 Add `title` prop to `<EnhancedLink url="https://nightwatchjs.org/" />` (Testing section)
- [x] 3.2 Add `title` prop to `<EnhancedLink url="https://playwright.dev/" />` (Testing section)
- [x] 3.3 Add `title` prop to `<EnhancedLink url="https://github.com/GoogleChrome/puppeteer" />` (Testing section)
- [x] 3.4 Add `title` prop to `<EnhancedLink url="https://www.selenium.dev/" />` (Testing section)
- [x] 3.5 Add `title` prop to `<EnhancedLink url="https://github.com/dequelabs/axe-cli" />` (Accessibility section)
- [x] 3.6 Add `title` prop to `<EnhancedLink url="https://webaim.org/resources/contrastchecker/" />` (Accessibility section)
- [x] 3.7 Add `title` prop to `<EnhancedLink url="https://support.siteimprove.com/hc/en-gb/articles/115000013031-Accessibility-Image-Alt-text-best-practices" />` (Accessibility section)
- [x] 3.8 Add `title` prop to `<EnhancedLink url="https://github.com/JakePartusch/lumberjack" />` (Accessibility section)
- [x] 3.9 Add `title` prop to `<EnhancedLink url="https://pa11y.org/" />` (Accessibility section)
- [x] 3.10 Add `title` prop to `<EnhancedLink url="https://www.doctave.com/" />` (Hosting section)
- [x] 3.11 Add `title` prop to `<EnhancedLink url="https://www.gitbook.com/" />` (Hosting section)
- [x] 3.12 Add `title` prop to `<EnhancedLink url="https://www.mintlify.com/" />` (Hosting section)
- [x] 3.13 Add `title` prop to `<EnhancedLink url="https://www.netlify.com/" />` (Hosting section)
- [x] 3.14 Add `title` prop to `<EnhancedLink url="https://readthedocs.org/" />` (Hosting section)

## 4. Verify

- [x] 4.1 Confirm no `<EnhancedLink>` without `title` remains in `docs/style-guides.md` (excluding contributing docs)
- [x] 4.2 Confirm no `<EnhancedLink>` without `title` remains in `docs/tools.md`
- [x] 4.3 Run a local VitePress build (`npm run docs:build`) and verify search returns results for "GitLab Style Guide", "Google Developer Documentation Style Guide", and "Playwright"
- [x] 4.4 Confirm `docs/contributing/enhanced-links.md` examples are unchanged
