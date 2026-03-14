## ADDED Requirements

### Requirement: AI top-level nav item exists in VitePress config
The VitePress config SHALL include a top-level nav item labelled "AI" with sub-items linking to `/ai/writing`, `/ai/review`, and `/ai/mcp-servers`.

#### Scenario: AI nav item is present with sub-items
- **WHEN** a user views any page on the site
- **THEN** the top navigation bar contains an "AI" item that expands to show "AI Writing", "AI Review", and "MCP Servers" links

### Requirement: AI sidebar group exists in VitePress config
The VitePress config SHALL include a sidebar group labelled "AI" containing links to `/ai/`, `/ai/writing`, `/ai/review`, and `/ai/mcp-servers`.

#### Scenario: AI sidebar group is present
- **WHEN** a user views any page on the site
- **THEN** the sidebar contains an "AI" group with four entries: Overview, Writing, Review, and MCP Servers

### Requirement: docs/index.md Categories Overview includes AI section
The `docs/index.md` Categories Overview section SHALL include a reference to the new AI section with a link to `/ai/`.

#### Scenario: AI section appears in index categories
- **WHEN** a user views the home page
- **THEN** the Categories Overview section lists the AI section with a link

### Requirement: docs/writing.md cross-references AI writing page
The `docs/writing.md` page SHALL include a "See also" or equivalent cross-reference linking to `/ai/writing` for AI-specific writing tools.

#### Scenario: Cross-reference to AI writing is present in writing.md
- **WHEN** a user views the Writing Tools page
- **THEN** they see a reference directing them to the AI Writing page for AI-specific tools

### Requirement: docs/quality.md cross-references AI review page
The `docs/quality.md` page SHALL include a "See also" or equivalent cross-reference linking to `/ai/review` for AI-specific review tools.

#### Scenario: Cross-reference to AI review is present in quality.md
- **WHEN** a user views the Quality Assurance page
- **THEN** they see a reference directing them to the AI Review page for AI-specific review tools
