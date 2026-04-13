# VitePress Documentation Setup

This branch contains a complete VitePress documentation setup for the Awesome Docs project.

## Structure

```
docs/
├── .vitepress/
│   ├── config.mjs                      # VitePress config and local search setup
│   ├── plugins/                        # Build-time link metadata fetch/cache
│   └── theme/                          # EnhancedLink components and theme overrides
├── index.md                            # Landing page
├── guide.md                            # Getting started guide
├── generators/index.md                 # Static site generators
├── api/index.md                        # API documentation tools
├── quality/index.md                    # QA and linting tools
├── writing/index.md                    # Writing and editing tools
├── style-guides/index.md               # Style guide collections
├── reading/index.md                    # Reading and learning resources
├── tools/index.md                      # Additional utilities
└── ai/                                 # AI-focused docs pages
```

## Quick Start

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start development server**
   ```bash
   pnpm docs:dev
   ```
   
   The site will be available at `http://localhost:5173/`

3. **Build for production**
   ```bash
   pnpm docs:build
   ```

4. **Preview production build**
   ```bash
   pnpm docs:preview
   ```

## Features Included

- ✅ Modern VitePress setup with ES modules
- ✅ Navigation and sidebar configuration
- ✅ Example pages with proper structure
- ✅ GitHub social link integration
- ✅ Responsive design
- ✅ Built-in search functionality
- ✅ Search indexing for `EnhancedLink` cards
- ✅ Hot reload during development
- ✅ Build-time metadata cache for rich link cards

## Configuration

The main configuration is in `docs/.vitepress/config.mjs`. You can customize:

- Site title and description
- Navigation menu
- Sidebar structure
- Theme settings
- Social links

## Adding Content

To add new pages:

1. Create a new `.md` file in the `docs/` directory or subdirectories
2. Update the sidebar configuration in `config.mjs` if needed
3. The page will be automatically available at the corresponding route

## Deployment

This setup is ready for deployment to platforms like:

- Netlify
- Vercel
- GitHub Pages
- Azure Static Web Apps

The build output will be in `docs/.vitepress/dist/` after running `pnpm docs:build`.
