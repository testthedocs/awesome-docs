import { defineConfig } from 'vitepress'
import { linkMetadataPlugin } from './plugins/linkMetadataPlugin'

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