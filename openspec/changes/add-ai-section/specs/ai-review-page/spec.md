## ADDED Requirements

### Requirement: AI review page exists at /ai/review
The system SHALL provide a page at `docs/ai/review.md` that is accessible via the URL `/ai/review` in the VitePress site.

#### Scenario: Page is accessible
- **WHEN** a user navigates to `/ai/review`
- **THEN** the page renders without error and displays the AI review content

### Requirement: AI review page contains AI review tools section
The page SHALL include a section listing AI-powered tools for reviewing documentation, with each entry containing a name, link, and one-line description.

#### Scenario: Review tools section is present
- **WHEN** a user views the AI review page
- **THEN** they see a section titled "AI Review Tools" with at least one tool entry

### Requirement: AI review page contains agent skills and prompts section for review
The page SHALL include a section covering agent skills, system prompts, and prompt templates for documentation review workflows.

#### Scenario: Agent skills for review section is present
- **WHEN** a user views the AI review page
- **THEN** they see a section covering AI agent skills or prompt resources for documentation review

### Requirement: AI review page cross-references quality assurance tools
The page SHALL include a note or link directing readers to the Quality Assurance page for non-AI review and linting tools.

#### Scenario: Cross-reference to quality assurance is present
- **WHEN** a user views the AI review page
- **THEN** they see a reference or link to `/quality` for broader quality assurance tool coverage
