# VitePress Documentation Setup

This branch contains a complete VitePress documentation setup for the Awesome Docs project.

## Structure

```
docs/
├── .vitepress/
│   └── config.mjs          # VitePress configuration
├── guide/
│   └── installation.md     # Installation guide
├── guide.md                # Main guide
└── index.md                # Home page
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
- ✅ Hot reload during development

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