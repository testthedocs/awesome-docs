export interface LinkMetadata {
  title: string | null
  description: string | null
  image: string | null
  favicon: string | null
  url: string
  finalUrl: string
}

export interface CacheEntry {
  metadata: LinkMetadata
  fetchedAt: string
}

export interface CacheData {
  [url: string]: CacheEntry
}
