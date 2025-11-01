# API Reference

This page contains the API reference for our documentation system.

## Configuration

### Basic Configuration

The basic configuration includes:

- **Title**: Set the main title of your documentation
- **Description**: Provide a brief description
- **Theme**: Configure the appearance and behavior

### Advanced Configuration

For advanced users, you can customize:

- **Navigation**: Custom navigation menus
- **Sidebar**: Dynamic sidebar generation
- **Search**: Local search configuration
- **Plugins**: Additional functionality

## Methods

### `configure(options)`

Configure the documentation system with the provided options.

**Parameters:**
- `options` (Object): Configuration options
  - `title` (String): Documentation title
  - `description` (String): Site description
  - `theme` (Object): Theme configuration

**Example:**
```javascript
configure({
  title: 'My Docs',
  description: 'Comprehensive documentation',
  theme: {
    nav: [...],
    sidebar: [...]
  }
})
```

### `search(query)`

Perform a search across all documentation content.

**Parameters:**
- `query` (String): Search query string

**Returns:**
- Array of search results with matches

## Examples

Here are some common usage examples:

### Setting up Navigation

```javascript
nav: [
  { text: 'Home', link: '/' },
  { text: 'Guide', link: '/guide' },
  { text: 'API', link: '/api' }
]
```

### Configuring Search

```javascript
search: {
  provider: 'local',
  options: {
    // Search configuration
  }
}
```