import { Plugin } from 'vite';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { MetadataCache } from './metadata/cache';
import { fetchMetadata } from './metadata/fetchMetadata';
import { RateLimiter } from './metadata/rateLimiter';

/**
 * VitePress plugin for fetching and caching link metadata at build time.
 *
 * After fetching, the cache file is copied to docs/public/cache/ so that
 * VitePress includes it in the build output and the browser can fetch it
 * at /cache/link-metadata.json.
 */
export function linkMetadataPlugin(): Plugin {
  const cacheFilePath = join(process.cwd(), 'docs/.vitepress/cache/link-metadata.json');
  // Public copy — served by VitePress at /cache/link-metadata.json
  const publicCachePath = join(process.cwd(), 'docs/public/cache/link-metadata.json');

  const cache = new MetadataCache(cacheFilePath, 7); // 7-day TTL
  const rateLimiter = new RateLimiter(5, 500); // 5 concurrent, 500ms delay

  let urlsToFetch: Set<string> = new Set();
  let buildStartTime: number = 0;

  return {
    name: 'vitepress-link-metadata',

    async buildStart() {
      // Check if metadata fetching should be skipped
      if (process.env.SKIP_METADATA === 'true') {
        console.log('[LinkMetadata] Skipping metadata fetch (SKIP_METADATA=true)');
        // Still copy existing cache to public so the browser can read it
        await copyCacheToPublic();
        return;
      }

      buildStartTime = Date.now();
      console.log('[LinkMetadata] Initializing metadata cache...');

      // Initialize cache
      await cache.initialize();

      // Scan markdown files for EnhancedLink components
      console.log('[LinkMetadata] Scanning markdown files for links...');
      urlsToFetch = await scanMarkdownFiles();

      console.log(`[LinkMetadata] Found ${urlsToFetch.size} unique URLs`);

      // Fetch metadata for all URLs
      await fetchAllMetadata();

      // Copy updated cache to public directory for browser access
      await copyCacheToPublic();

      // Report statistics
      const stats = cache.getStats();
      const hitRate = cache.getHitRate();
      const duration = ((Date.now() - buildStartTime) / 1000).toFixed(2);

      console.log('[LinkMetadata] Build complete:');
      console.log(`  - Total URLs: ${urlsToFetch.size}`);
      console.log(`  - Cache hits: ${stats.cacheHits}`);
      console.log(`  - Cache misses: ${stats.cacheMisses}`);
      console.log(`  - Hit rate: ${hitRate.toFixed(1)}%`);
      console.log(`  - Duration: ${duration}s`);
      console.log(`  - Cache entries: ${stats.totalEntries}`);
      console.log(`  - Cache size: ${(stats.fileSizeBytes / 1024).toFixed(2)} KB`);
    },
  };

  /**
   * Copy the cache file to docs/public/cache/ so VitePress includes it in
   * the build output and the browser can fetch it at /cache/link-metadata.json.
   */
  async function copyCacheToPublic(): Promise<void> {
    try {
      // Ensure the source cache file exists
      await fs.access(cacheFilePath);
      // Ensure the public/cache directory exists
      await fs.mkdir(dirname(publicCachePath), { recursive: true });
      // Copy
      await fs.copyFile(cacheFilePath, publicCachePath);
    } catch {
      // Source cache doesn't exist yet — create an empty one in public
      try {
        await fs.mkdir(dirname(publicCachePath), { recursive: true });
        await fs.writeFile(publicCachePath, '{}', 'utf-8');
      } catch (err) {
        console.warn('[LinkMetadata] Could not create public cache file:', err);
      }
    }
  }

  /**
   * Scan markdown files for EnhancedLink component usage
   */
  async function scanMarkdownFiles(): Promise<Set<string>> {
    const urls = new Set<string>();
    const docsDir = join(process.cwd(), 'docs');

    try {
      const files = await findMarkdownFiles(docsDir);

      for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        const foundUrls = extractUrlsFromMarkdown(content);
        foundUrls.forEach(url => urls.add(url));
      }
    } catch (error) {
      console.warn('[LinkMetadata] Error scanning markdown files:', error);
    }

    return urls;
  }

  /**
   * Recursively find all markdown files
   */
  async function findMarkdownFiles(dir: string): Promise<string[]> {
    const files: string[] = [];

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        // Skip node_modules and hidden directories
        if (entry.name.startsWith('.') || entry.name === 'node_modules') {
          continue;
        }

        if (entry.isDirectory()) {
          const subFiles = await findMarkdownFiles(fullPath);
          files.push(...subFiles);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory might not exist or be accessible
    }

    return files;
  }

  /**
   * Extract URLs from EnhancedLink components in markdown
   */
  function extractUrlsFromMarkdown(content: string): string[] {
    const urls: string[] = [];

    // Match <EnhancedLink url="..." /> or <EnhancedLink url='...' />
    const regex = /<EnhancedLink\s+url=["']([^"']+)["']/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const url = match[1];
      if (url && url.startsWith('http')) {
        urls.push(url);
      }
    }

    return urls;
  }

  /**
   * Fetch metadata for all URLs
   */
  async function fetchAllMetadata(): Promise<void> {
    const urlsArray = Array.from(urlsToFetch);
    const fetchPromises: Promise<void>[] = [];

    for (const url of urlsArray) {
      // Check cache first
      const cached = cache.get(url);
      if (cached) {
        // Already in cache and valid
        continue;
      }

      // Queue fetch with rate limiting
      const promise = rateLimiter.execute(url, async () => {
        try {
          const metadata = await fetchMetadata(url);
          
          if (metadata) {
            await cache.set(url, metadata);
            console.log(`[LinkMetadata] ✓ Fetched: ${url}`);
          } else {
            console.warn(`[LinkMetadata] ✗ Failed: ${url}`);
          }
        } catch (error) {
          console.warn(`[LinkMetadata] ✗ Error fetching ${url}:`, error);
        }
      });

      fetchPromises.push(promise);
    }

    // Wait for all fetches to complete
    await Promise.all(fetchPromises);
  }
}
