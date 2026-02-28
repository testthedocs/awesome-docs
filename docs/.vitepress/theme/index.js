// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './style.css'
import EnhancedLink from './components/EnhancedLink.vue'
import ResourceGrid from './components/ResourceGrid.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register global components
    app.component('EnhancedLink', EnhancedLink)
    app.component('ResourceGrid', ResourceGrid)
  }
}