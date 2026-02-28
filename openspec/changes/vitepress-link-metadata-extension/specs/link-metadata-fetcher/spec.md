## ADDED Requirements

### Requirement: Fetch Open Graph metadata from URLs
The system SHALL fetch Open Graph metadata tags from external URLs including og:title, og:description, og:image, and og:url.

#### Scenario: Successful Open Graph metadata retrieval
- **WHEN** a valid URL with Open Graph tags is provided
- **THEN** the system returns an object containing title, description, image URL, and canonical URL

#### Scenario: Missing Open Graph tags
- **WHEN** a URL lacks Open Graph tags
- **THEN** the system falls back to standard HTML meta tags and page title

### Requirement: Fetch Twitter Card metadata from URLs
The system SHALL fetch Twitter Card metadata tags from external URLs including twitter:title, twitter:description, and twitter:image.

#### Scenario: Successful Twitter Card metadata retrieval
- **WHEN** a valid URL with Twitter Card tags is provided
- **THEN** the system returns an object containing title, description, and image URL from Twitter Card tags

#### Scenario: Twitter Card tags as fallback
- **WHEN** Open Graph tags are missing but Twitter Card tags exist
- **THEN** the system uses Twitter Card metadata as the primary source

### Requirement: Extract favicon from URLs
The system SHALL attempt to extract favicons from external URLs by checking multiple common locations and formats.

#### Scenario: Standard favicon retrieval
- **WHEN** a URL has a favicon at /favicon.ico
- **THEN** the system returns the favicon URL

#### Scenario: SVG favicon preference
- **WHEN** both /favicon.svg and /favicon.ico exist
- **THEN** the system prioritizes the SVG format for better scalability

#### Scenario: Apple touch icon fallback
- **WHEN** standard favicons are not found
- **THEN** the system checks for /apple-touch-icon.png and other common variants

### Requirement: Handle HTTP errors gracefully
The system SHALL handle HTTP errors and network failures without breaking the build process.

#### Scenario: URL returns 404 error
- **WHEN** a URL returns a 404 status code
- **THEN** the system logs a warning and returns null metadata without failing the build

#### Scenario: Network timeout
- **WHEN** a URL request times out after the configured timeout period
- **THEN** the system logs a warning and continues with null metadata

#### Scenario: Invalid URL format
- **WHEN** an invalid URL format is provided
- **THEN** the system logs an error and returns null metadata

### Requirement: Implement rate limiting for metadata fetching
The system SHALL implement rate limiting to avoid overwhelming external servers during bulk metadata fetching.

#### Scenario: Concurrent request limiting
- **WHEN** fetching metadata for multiple URLs
- **THEN** the system limits concurrent requests to a configurable maximum (default: 5)

#### Scenario: Delay between requests to same domain
- **WHEN** multiple URLs from the same domain are queued
- **THEN** the system adds a configurable delay between requests to that domain (default: 500ms)

### Requirement: Parse and normalize metadata
The system SHALL parse HTML content and normalize metadata into a consistent format regardless of source.

#### Scenario: Metadata normalization
- **WHEN** metadata is fetched from various tag sources (Open Graph, Twitter Card, standard meta)
- **THEN** the system returns a normalized object with consistent field names (title, description, image, favicon)

#### Scenario: HTML entity decoding
- **WHEN** metadata contains HTML entities
- **THEN** the system decodes entities to plain text (e.g., &amp; becomes &)
