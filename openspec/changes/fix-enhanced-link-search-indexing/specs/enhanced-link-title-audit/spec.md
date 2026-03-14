## ADDED Requirements

### Requirement: All EnhancedLink usages in content pages have an explicit title prop
Every `<EnhancedLink>` component used in documentation content pages (i.e., pages under `docs/` that are not the contributing/enhanced-links.md documentation page) SHALL include a `title` prop with a human-readable name for the linked resource.

#### Scenario: EnhancedLink with title is indexed by search
- **WHEN** a user searches for the title of a linked resource (e.g., "GitLab Style Guide")
- **THEN** the search results SHALL include the page containing the `<EnhancedLink>` for that resource

#### Scenario: EnhancedLink without title is not present in content pages
- **WHEN** a content page under `docs/` (excluding `docs/contributing/enhanced-links.md`) contains a `<EnhancedLink>` component
- **THEN** the component SHALL have a non-empty `title` prop

### Requirement: Titles are sourced from the metadata cache
When populating missing `title` props, the title value SHALL be derived from the `title` field in `docs/.vitepress/cache/link-metadata.json` for the corresponding URL.

#### Scenario: Title matches cached metadata
- **WHEN** a `title` prop is added to an `<EnhancedLink>` for a URL that exists in the metadata cache
- **THEN** the title SHALL match the cached `metadata.title` value (or a human-readable shortened form of it, e.g., stripping ` | Site Name` suffixes)

#### Scenario: URL not in cache falls back to hostname
- **WHEN** a `title` prop is added to an `<EnhancedLink>` for a URL that does NOT exist in the metadata cache
- **THEN** the title SHALL use the URL's hostname as a fallback (e.g., `"stylepedia.net"`)

### Requirement: Contributing documentation examples are exempt
The `<EnhancedLink>` usages in `docs/contributing/enhanced-links.md` are intentional API examples and SHALL NOT be required to have a `title` prop.

#### Scenario: Contributing page examples remain unchanged
- **WHEN** reviewing `docs/contributing/enhanced-links.md`
- **THEN** `<EnhancedLink>` usages without `title` props SHALL be left as-is to preserve their illustrative purpose
