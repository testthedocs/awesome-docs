import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Awesome Docs',
  description: 'A VitePress Site',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide' },
          { text: 'Installation', link: '/guide/installation' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/testthedocs/awesome-docs' }
    ]
  }
})