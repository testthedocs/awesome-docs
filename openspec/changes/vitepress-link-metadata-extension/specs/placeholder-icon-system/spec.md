## ADDED Requirements

### Requirement: Provide generic placeholder SVG icons
The system SHALL provide generic SVG placeholder icons for links without logos or favicons.

#### Scenario: Default placeholder icon
- **WHEN** a link has no logo or favicon available
- **THEN** the system displays a default generic link icon in SVG format

#### Scenario: SVG icon scalability
- **WHEN** a placeholder icon is rendered at different sizes
- **THEN** the SVG scales without quality loss or pixelation

### Requirement: Support category-based placeholder icons
The system SHALL provide different placeholder icons based on URL domain or category.

#### Scenario: GitHub domain icon
- **WHEN** a URL is from github.com domain
- **THEN** the system uses a code/repository themed placeholder icon

#### Scenario: Documentation domain icon
- **WHEN** a URL is from common documentation domains (readthedocs.org, docs.*, etc.)
- **THEN** the system uses a documentation/book themed placeholder icon

#### Scenario: Video domain icon
- **WHEN** a URL is from video platforms (youtube.com, vimeo.com, etc.)
- **THEN** the system uses a video/play themed placeholder icon

#### Scenario: Unknown domain fallback
- **WHEN** a URL domain does not match any category
- **THEN** the system uses the default generic link icon

### Requirement: Allow custom placeholder icon configuration
The system SHALL allow users to configure custom placeholder icons per domain or globally.

#### Scenario: Custom domain icon mapping
- **WHEN** a custom icon is configured for a specific domain
- **THEN** the system uses the custom icon instead of the default placeholder

#### Scenario: Custom global placeholder
- **WHEN** a custom global placeholder icon path is configured
- **THEN** the system uses it as the default for all uncategorized links

### Requirement: Ensure placeholder icons match theme
The system SHALL provide placeholder icons that adapt to light and dark themes.

#### Scenario: Light theme placeholder
- **WHEN** the documentation is in light theme mode
- **THEN** placeholder icons use appropriate colors for light backgrounds

#### Scenario: Dark theme placeholder
- **WHEN** the documentation is in dark theme mode
- **THEN** placeholder icons use appropriate colors for dark backgrounds

#### Scenario: CSS variable integration
- **WHEN** placeholder icons are rendered
- **THEN** the system uses CSS variables for colors to automatically adapt to theme changes

### Requirement: Optimize placeholder icon file size
The system SHALL ensure placeholder SVG icons are optimized for minimal file size and fast loading.

#### Scenario: Minified SVG output
- **WHEN** placeholder icons are included in the build
- **THEN** the SVG files are minified and optimized

#### Scenario: Inline SVG rendering
- **WHEN** a placeholder icon is displayed
- **THEN** the system inlines the SVG code to avoid additional HTTP requests

### Requirement: Provide accessible placeholder icons
The system SHALL ensure placeholder icons meet accessibility standards.

#### Scenario: ARIA labels for placeholders
- **WHEN** a placeholder icon is rendered
- **THEN** the system includes appropriate ARIA labels describing the icon purpose

#### Scenario: Decorative icon marking
- **WHEN** a placeholder icon is purely decorative
- **THEN** the system marks it with aria-hidden="true" to hide from screen readers

### Requirement: Support placeholder icon customization via props
The system SHALL allow component-level customization of placeholder icons.

#### Scenario: Custom placeholder via prop
- **WHEN** a custom placeholder prop is provided to the component
- **THEN** the system uses the specified icon instead of the default

#### Scenario: Disable placeholder icon
- **WHEN** the placeholder prop is set to null or false
- **THEN** the system renders the link without any icon
