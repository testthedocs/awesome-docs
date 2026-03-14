## ADDED Requirements

### Requirement: AI MCP servers page exists at /ai/mcp-servers
The system SHALL provide a page at `docs/ai/mcp-servers.md` that is accessible via the URL `/ai/mcp-servers` in the VitePress site.

#### Scenario: Page is accessible
- **WHEN** a user navigates to `/ai/mcp-servers`
- **THEN** the page renders without error and displays the MCP servers content

### Requirement: MCP servers page includes a brief MCP introduction
The page SHALL include a short introductory paragraph explaining what MCP (Model Context Protocol) is and why it is relevant to documentation workflows.

#### Scenario: MCP introduction is present
- **WHEN** a user views the MCP servers page
- **THEN** they see an introductory section explaining MCP before any server listings

### Requirement: MCP servers page lists the Vale MCP server
The page SHALL include an entry for the Vale MCP server with a name, link to its repository or documentation, and a one-line description of what it enables.

#### Scenario: Vale MCP server entry is present
- **WHEN** a user views the MCP servers page
- **THEN** they see an entry for the Vale MCP server with a working link and description

### Requirement: MCP servers page signals openness for contributions
The page SHALL include a note inviting contributors to add additional documentation-relevant MCP servers.

#### Scenario: Contribution invitation is present
- **WHEN** a user views the MCP servers page
- **THEN** they see a note or call-to-action encouraging them to contribute additional MCP server entries
