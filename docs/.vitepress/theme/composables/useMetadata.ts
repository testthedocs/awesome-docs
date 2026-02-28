import { ref, Ref } from 'vue';

/**
 * Link metadata interface — must stay in sync with the build-side
 * LinkMetadata in plugins/metadata/fetchMetadata.ts
 */
export interface LinkMetadata {
  title: string | null;
  description: string | null;
  image: string | null;
  favicon: string | null;
  /** The original URL as provided by the author */
  url: string;
  /** The final URL after following redirects (may differ from url) */
  finalUrl: string;
}

/**
 * Cache data structure
 */
interface CacheData {
  [url: string]: {
    metadata: LinkMetadata;
    fetchedAt: string;
  };
}

// Global cache — loaded once and shared across all component instances
let metadataCache: CacheData | null = null;
let loadPromise: Promise<CacheData> | null = null;

/**
 * Load metadata cache.
 * - During SSR (import.meta.env.SSR === true): reads the JSON file from disk
 *   using Node.js fs to avoid invalid-URL errors in the Node fetch() polyfill.
 * - In the browser: fetches the JSON file via HTTP relative to the site root.
 */
async function loadMetadataCache(): Promise<CacheData> {
  if (metadataCache !== null) {
    return metadataCache;
  }

  // Deduplicate concurrent calls
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async (): Promise<CacheData> => {
    try {
      if (import.meta.env.SSR) {
        // SSR / Node.js build — read directly from disk
        // These imports are tree-shaken out of the browser bundle by Vite
        // because they are inside the `import.meta.env.SSR` branch.
        const fs = await import('node:fs');
        const path = await import('node:path');
        const filePath = path.resolve(
          process.cwd(),
          'docs/.vitepress/cache/link-metadata.json'
        );
        try {
          const raw = fs.readFileSync(filePath, 'utf-8');
          const data: CacheData = JSON.parse(raw);
          metadataCache = data;
          return metadataCache;
        } catch {
          // Cache file doesn't exist yet (e.g. SKIP_METADATA build)
          metadataCache = {};
          return metadataCache;
        }
      }

      // Browser — fetch via HTTP (path relative to the deployed site root)
      const response = await fetch('/cache/link-metadata.json');
      if (response.ok) {
        const data: CacheData = await response.json();
        metadataCache = data;
        return metadataCache;
      }
    } catch (error) {
      console.warn('[useMetadata] Failed to load metadata cache:', error);
    }

    metadataCache = {};
    return metadataCache;
  })();

  return loadPromise;
}

/**
 * Composable for accessing link metadata
 *
 * @param url - The URL to get metadata for
 * @returns Reactive metadata state
 */
export function useMetadata(url: string): {
  metadata: Ref<LinkMetadata | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
} {
  const metadata = ref<LinkMetadata | null>(null);
  const loading = ref(true);
  const error = ref<Error | null>(null);

  loadMetadataCache()
    .then((cache) => {
      const entry = cache[url];
      if (entry) {
        metadata.value = entry.metadata;
      }
      loading.value = false;
    })
    .catch((err) => {
      error.value = err instanceof Error ? err : new Error(String(err));
      loading.value = false;
    });

  return {
    metadata,
    loading,
    error,
  };
}

/**
 * Get metadata synchronously (if cache is already loaded)
 *
 * @param url - The URL to get metadata for
 * @returns Metadata or null
 */
export function getMetadata(url: string): LinkMetadata | null {
  if (!metadataCache) {
    return null;
  }
  const entry = metadataCache[url];
  return entry ? entry.metadata : null;
}
