## ADDED Requirements

### Requirement: AI writing page exists at /ai/writing
The system SHALL provide a page at `docs/ai/writing.md` that is accessible via the URL `/ai/writing` in the VitePress site.

#### Scenario: Page is accessible
- **WHEN** a user navigates to `/ai/writing`
- **THEN** the page renders without error and displays the AI writing content

### Requirement: AI writing page contains AI writing assistants section
The page SHALL include a section listing AI-powered writing assistant tools relevant to technical writing, with each entry containing a name, link, and one-line description.

#### Scenario: Writing assistants section is present
- **WHEN** a user views the AI writing page
- **THEN** they see a section titled "AI Writing Assistants" with at least one tool entry

### Requirement: AI writing page contains agent skills and prompts section
The page SHALL include a section covering agent skills, system prompts, and prompt templates for technical writing workflows.

#### Scenario: Agent skills section is present
- **WHEN** a user views the AI writing page
- **THEN** they see a section covering AI agent skills or prompt resources for technical writing

### Requirement: AI writing page cross-references existing writing tools
The page SHALL include a note or link directing readers to the main Writing Tools page for non-AI writing tools.

#### Scenario: Cross-reference to writing tools is present
- **WHEN** a user views the AI writing page
- **THEN** they see a reference or link to `/writing` for broader writing tool coverage
