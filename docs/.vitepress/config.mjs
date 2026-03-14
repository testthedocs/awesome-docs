import { defineConfig } from 'vitepress'
import { linkMetadataPlugin } from './plugins/linkMetadataPlugin'

/**
 * Inject EnhancedLink title props as plain text into the markdown source
 * before rendering, so VitePress local search can index link card titles.
 *
 * VitePress's local search _render hook receives the raw markdown source.
 * <EnhancedLink> is a Vue component — markdown-it passes it through as a
 * raw HTML block, so the title prop value never appears as a text node in
 * the indexed content.
 *
 * This function rewrites each <EnhancedLink title="..."> tag to also emit
 * the title as a plain markdown text token immediately after the tag, so
 * the search indexer associates the title with the correct page section.
 *
 * @param {string} src - Raw markdown source of the page
 * @param {object} env - VitePress page environment
 * @param {object} md - markdown-it instance
 * @returns {string} Rendered HTML with EnhancedLink titles as indexed text
 */
function renderWithEnhancedLinkTitles(src, env, md) {
  // Replace each <EnhancedLink ... title="Foo" ... /> with a level-4 heading
  // containing the title text, followed by the original tag.
  //
  // Using a heading (####) rather than a paragraph means:
  // 1. The title appears as the matched section in search results (better UX)
  // 2. The term is indexed in the `titles` field (higher relevance weight)
  // 3. Clicking the result navigates to the correct section anchor
  const patched = src.replace(
    /(<EnhancedLink\b[^>]*\btitle="([^"]+)"[^>]*\/>)/g,
    (match, tag, title) => `\n\n#### ${title}\n\n${tag}\n\n`
  )

  return md.render(patched, env)
}

export default defineConfig({
  vite: {
    plugins: [linkMetadataPlugin()]
  },
  title: 'Awesome Docs',
  description: 'A VitePress Site',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        _render: renderWithEnhancedLinkTitles,
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search docs'
          },
          modal: {
            noResultsText: 'No results for',
            resetButtonTitle: 'Clear search query',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close'
            }
          }
        }
      }
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tools',
        items: [
          { text: 'Site Generators', link: '/generators' },
          { text: 'API Documentation', link: '/api' },
          { text: 'Quality Assurance', link: '/quality' },
          { text: 'Writing Tools', link: '/writing' },
          { text: 'Additional Tools', link: '/tools' }
        ]
      },
      { text: 'Resources',
        items: [
          { text: 'Style Guides', link: '/style-guides' },
          { text: 'Reading List', link: '/reading' },
          { text: 'GitHub Actions', link: '/github-actions' }
        ]
      },
      { text: 'AI',
        items: [
          { text: 'AI Writing', link: '/ai/writing' },
          { text: 'AI Review', link: '/ai/review' },
          { text: 'MCP Servers', link: '/ai/mcp-servers' }
        ]
      },
      { text: 'Guide', link: '/guide' },
      { text: 'Contributing', link: '/contributing/' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide' }
        ]
      },
      {
        text: 'Core Tools',
        items: [
          { text: 'Site Generators', link: '/generators' },
          { text: 'API Documentation', link: '/api' }
        ]
      },
      {
        text: 'Content & Quality',
        items: [
          { text: 'Writing Tools', link: '/writing' },
          { text: 'Quality Assurance', link: '/quality' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Style Guides', link: '/style-guides' },
          { text: 'Reading List', link: '/reading' },
          { text: 'GitHub Actions', link: '/github-actions' },
          { text: 'Additional Tools', link: '/tools' }
        ]
      },
      {
        text: 'AI',
        items: [
          { text: 'Overview', link: '/ai/' },
          { text: 'Writing', link: '/ai/writing' },
          { text: 'Review', link: '/ai/review' },
          { text: 'MCP Servers', link: '/ai/mcp-servers' }
        ]
      },
      {
        text: 'Contributing',
        items: [
          { text: 'Getting Started', link: '/contributing/' },
          { text: 'Enhanced Links', link: '/contributing/enhanced-links' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/testthedocs/awesome-docs' }
    ]
  }
})