import { promises as fs } from 'fs';
import { dirname } from 'path';
import { createHash } from 'crypto';
import type { LinkMetadata } from './fetchMetadata';

/**
 * Cache entry structure with timestamp
 */
interface CacheEntry {
  metadata: LinkMetadata;
  fetchedAt: string;
}

/**
 * Cache file structure
 */
interface CacheData {
  [url: string]: CacheEntry;
}

/**
 * Cache statistics
 */
export interface CacheStats {
  totalEntries: number;
  cacheHits: number;
  cacheMisses: number;
  fileSizeBytes: number;
}

/**
 * Metadata cache system with TTL support
 */
export class MetadataCache {
  private cachePath: string;
  private ttlDays: number;
  private cache: CacheData = {};
  private stats: CacheStats = {
    totalEntries: 0,
    cacheHits: 0,
    cacheMisses: 0,
    fileSizeBytes: 0,
  };
  private writeQueue: Promise<void> = Promise.resolve();

  /**
   * Create a new metadata cache
   * 
   * @param cachePath - Path to the cache file
   * @param ttlDays - Time-to-live in days (default: 7)
   */
  constructor(cachePath: string, ttlDays: number = 7) {
    this.cachePath = cachePath;
    this.ttlDays = ttlDays;
  }

  /**
   * Initialize cache by loading from disk
   */
  async initialize(): Promise<void> {
    try {
      await this.ensureCacheDirectory();
      await this.loadCache();
    } catch (error) {
      console.warn('[MetadataCache] Failed to initialize cache:', error);
      this.cache = {};
    }
  }

  /**
   * Ensure cache directory exists
   */
  private async ensureCacheDirectory(): Promise<void> {
    const dir = dirname(this.cachePath);
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
  }

  /**
   * Load cache from disk
   */
  private async loadCache(): Promise<void> {
    try {
      const data = await fs.readFile(this.cachePath, 'utf-8');
      this.cache = JSON.parse(data);
      this.stats.totalEntries = Object.keys(this.cache).length;
      
      // Get file size
      const stat = await fs.stat(this.cachePath);
      this.stats.fileSizeBytes = stat.size;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // Cache file doesn't exist yet, start with empty cache
        this.cache = {};
      } else if (error instanceof SyntaxError) {
        // Corrupted JSON, log warning and start fresh
        console.warn('[MetadataCache] Corrupted cache file, starting fresh');
        this.cache = {};
        await this.saveCache();
      } else {
        throw error;
      }
    }
  }

  /**
   * Get metadata from cache if valid.
   * Checks both the original URL and the final (post-redirect) URL stored in
   * the metadata so that redirect chains are transparent to callers.
   *
   * @param url - The URL to look up (original or final)
   * @returns Cached metadata or null if not found or expired
   */
  get(url: string): LinkMetadata | null {
    // Direct lookup first
    const entry = this.cache[url] ?? this.findByFinalUrl(url);

    if (!entry) {
      this.stats.cacheMisses++;
      return null;
    }

    // Check if entry is still valid (within TTL)
    const fetchedAt = new Date(entry.fetchedAt);
    const now = new Date();
    const ageInDays = (now.getTime() - fetchedAt.getTime()) / (1000 * 60 * 60 * 24);

    if (ageInDays > this.ttlDays) {
      // Entry expired
      this.stats.cacheMisses++;
      return null;
    }

    this.stats.cacheHits++;
    return entry.metadata;
  }

  /**
   * Find a cache entry by its finalUrl field (handles redirect chains).
   */
  private findByFinalUrl(finalUrl: string): CacheEntry | undefined {
    for (const entry of Object.values(this.cache)) {
      if (entry.metadata.finalUrl === finalUrl) {
        return entry;
      }
    }
    return undefined;
  }

  /**
   * Set metadata in cache.
   * Stores the entry under the original URL and, if different, also adds an
   * alias entry under the final URL so both keys resolve to the same metadata.
   *
   * @param url - The original URL (as provided by the author)
   * @param metadata - The metadata to cache
   */
  async set(url: string, metadata: LinkMetadata): Promise<void> {
    const entry: CacheEntry = {
      metadata,
      fetchedAt: new Date().toISOString(),
    };

    // Store under original URL
    this.cache[url] = entry;

    // Also store under final URL if it differs (redirect alias)
    if (metadata.finalUrl && metadata.finalUrl !== url) {
      this.cache[metadata.finalUrl] = entry;
    }

    this.stats.totalEntries = Object.keys(this.cache).length;

    // Queue atomic write
    await this.queueWrite();
  }

  /**
   * Queue an atomic write operation
   */
  private async queueWrite(): Promise<void> {
    // Chain writes to ensure atomicity
    this.writeQueue = this.writeQueue.then(() => this.saveCache());
    await this.writeQueue;
  }

  /**
   * Save cache to disk atomically
   */
  private async saveCache(): Promise<void> {
    try {
      const tempPath = `${this.cachePath}.tmp`;
      const data = JSON.stringify(this.cache, null, 2);

      // Write to temp file first
      await fs.writeFile(tempPath, data, 'utf-8');

      // Atomic rename
      await fs.rename(tempPath, this.cachePath);

      // Update file size stat
      this.stats.fileSizeBytes = Buffer.byteLength(data, 'utf-8');
    } catch (error) {
      console.error('[MetadataCache] Failed to save cache:', error);
      throw error;
    }
  }

  /**
   * Clear entire cache
   */
  async clear(): Promise<void> {
    this.cache = {};
    this.stats.totalEntries = 0;
    await this.saveCache();
  }

  /**
   * Clear cache entry for specific URL
   * 
   * @param url - The URL to remove from cache
   */
  async clearUrl(url: string): Promise<void> {
    delete this.cache[url];
    this.stats.totalEntries = Object.keys(this.cache).length;
    await this.saveCache();
  }

  /**
   * Force refresh cache by clearing all entries
   */
  async refresh(): Promise<void> {
    await this.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Get cache hit rate as percentage
   */
  getHitRate(): number {
    const total = this.stats.cacheHits + this.stats.cacheMisses;
    if (total === 0) return 0;
    return (this.stats.cacheHits / total) * 100;
  }

  /**
   * Generate hash for URL (for potential future use)
   */
  private hashUrl(url: string): string {
    return createHash('sha256').update(url).digest('hex').substring(0, 16);
  }

  /**
   * Remove expired entries from cache
   */
  async cleanExpired(): Promise<number> {
    let removedCount = 0;
    const now = new Date();

    for (const [url, entry] of Object.entries(this.cache)) {
      const fetchedAt = new Date(entry.fetchedAt);
      const ageInDays = (now.getTime() - fetchedAt.getTime()) / (1000 * 60 * 60 * 24);

      if (ageInDays > this.ttlDays) {
        delete this.cache[url];
        removedCount++;
      }
    }

    if (removedCount > 0) {
      this.stats.totalEntries = Object.keys(this.cache).length;
      await this.saveCache();
    }

    return removedCount;
  }

  /**
   * Get all cached URLs
   */
  getCachedUrls(): string[] {
    return Object.keys(this.cache);
  }

  /**
   * Check if URL is cached and valid
   */
  has(url: string): boolean {
    return this.get(url) !== null;
  }
}
