import { defineConfig } from 'vitepress'
import { linkMetadataPlugin } from './plugins/linkMetadataPlugin'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Inject EnhancedLink metadata as plain text into markdown before rendering
 * so VitePress local search indexes card titles and descriptions.
 *
 * VitePress's local search _render hook receives the raw markdown source.
 * <EnhancedLink> is a Vue component — markdown-it passes it through as a
 * raw HTML block, so the title prop value never appears as a text node in
 * the indexed content.
 *
 * This function rewrites each <EnhancedLink ...> tag to emit resolved text:
 * title priority is manual prop > fetched metadata > URL hostname.
 * Description is indexed when available.
 *
 * @param {string} src - Raw markdown source of the page
 * @param {object} env - VitePress page environment
 * @param {object} md - markdown-it instance
 * @returns {string} Rendered HTML with EnhancedLink titles as indexed text
 */
let metadataCacheForIndex = null

function getMetadataCacheForIndex() {
  if (metadataCacheForIndex !== null) {
    return metadataCacheForIndex
  }

  try {
    const cachePath = resolve(process.cwd(), 'docs/.vitepress/cache/link-metadata.json')
    const raw = readFileSync(cachePath, 'utf-8')
    metadataCacheForIndex = JSON.parse(raw)
  } catch {
    metadataCacheForIndex = {}
  }

  return metadataCacheForIndex
}

function getAttr(tag, attrName) {
  const regex = new RegExp(`${attrName}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i')
  const match = tag.match(regex)
  if (!match) {
    return null
  }

  return match[1] ?? match[2] ?? null
}

function resolveTitle(tag, cache) {
  const manualTitle = getAttr(tag, 'title')
  if (manualTitle) {
    return manualTitle
  }

  const url = getAttr(tag, 'url')
  if (!url) {
    return null
  }

  const fromCache = cache?.[url]?.metadata?.title
  if (fromCache) {
    return fromCache
  }

  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

function resolveDescription(tag, cache) {
  const manualDescription = getAttr(tag, 'description')
  if (manualDescription) {
    return manualDescription
  }

  const url = getAttr(tag, 'url')
  if (!url) {
    return null
  }

  return cache?.[url]?.metadata?.description ?? null
}

function renderWithEnhancedLinkTitles(src, env, md) {
  const cache = getMetadataCacheForIndex()
  const enhancedLinkRegex = /<EnhancedLink\b[\s\S]*?(?:\/>|>[\s\S]*?<\/EnhancedLink>)/g

  const patched = src.replace(enhancedLinkRegex, (tag) => {
    const title = resolveTitle(tag, cache)
    const description = resolveDescription(tag, cache)

    if (!title && !description) {
      return tag
    }

    const titleText = title ? `\n\n#### ${title}\n` : '\n'
    const descriptionText = description ? `\n${description}\n` : '\n'

    return `${titleText}${descriptionText}\n${tag}\n\n`
  })

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
          { text: 'Site Generators', link: '/generators/' },
          { text: 'API Documentation', link: '/api/' },
          { text: 'Quality Assurance', link: '/quality/' },
          { text: 'Writing Tools', link: '/writing/' },
          { text: 'Additional Tools', link: '/tools/' }
        ]
      },
      { text: 'Resources',
        items: [
          { text: 'Style Guides', link: '/style-guides/' },
          { text: 'Reading List', link: '/reading/' },
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
          { text: 'Site Generators', link: '/generators/' },
          { text: 'API Documentation', link: '/api/' }
        ]
      },
      {
        text: 'Content & Quality',
        items: [
          { text: 'Writing Tools', link: '/writing/' },
          { text: 'Quality Assurance', link: '/quality/' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Style Guides', link: '/style-guides/' },
          { text: 'Reading List', link: '/reading/' },
          { text: 'GitHub Actions', link: '/github-actions' },
          { text: 'Additional Tools', link: '/tools/' }
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
