## ADDED Requirements

### Requirement: Cache fetched metadata to disk
The system SHALL persist fetched metadata to disk to avoid redundant network requests across builds.

#### Scenario: Save metadata to cache file
- **WHEN** metadata is successfully fetched for a URL
- **THEN** the system saves the metadata to a JSON cache file in .vitepress/cache/

#### Scenario: Read metadata from cache
- **WHEN** metadata is requested for a previously cached URL
- **THEN** the system returns the cached metadata without making a network request

### Requirement: Implement cache invalidation with TTL
The system SHALL implement time-to-live (TTL) based cache invalidation to ensure metadata freshness.

#### Scenario: Cache hit within TTL
- **WHEN** cached metadata is requested and the cache entry is within the TTL period
- **THEN** the system returns the cached metadata without refetching

#### Scenario: Cache miss after TTL expiration
- **WHEN** cached metadata is requested but the cache entry has exceeded the TTL period
- **THEN** the system refetches the metadata and updates the cache

#### Scenario: Configurable TTL duration
- **WHEN** the cache system is initialized
- **THEN** the TTL duration is configurable (default: 7 days)

### Requirement: Store cache with metadata timestamps
The system SHALL store timestamps with each cache entry to enable TTL-based invalidation.

#### Scenario: Cache entry with timestamp
- **WHEN** metadata is cached
- **THEN** the cache entry includes a fetchedAt timestamp in ISO 8601 format

#### Scenario: Timestamp comparison for TTL
- **WHEN** checking cache validity
- **THEN** the system compares current time against fetchedAt plus TTL duration

### Requirement: Provide cache management commands
The system SHALL provide commands for manual cache management including clear and refresh operations.

#### Scenario: Clear entire cache
- **WHEN** a cache clear command is executed
- **THEN** the system deletes all cached metadata entries

#### Scenario: Clear specific URL cache
- **WHEN** a cache clear command is executed with a specific URL
- **THEN** the system deletes only the cache entry for that URL

#### Scenario: Force refresh cache
- **WHEN** a force refresh command is executed
- **THEN** the system refetches metadata for all URLs regardless of TTL

### Requirement: Handle cache file corruption
The system SHALL handle corrupted or invalid cache files gracefully without breaking the build.

#### Scenario: Invalid JSON in cache file
- **WHEN** the cache file contains invalid JSON
- **THEN** the system logs a warning, deletes the corrupted cache, and creates a new empty cache

#### Scenario: Missing cache file
- **WHEN** the cache file does not exist
- **THEN** the system creates a new cache file without errors

### Requirement: Organize cache by URL hash
The system SHALL organize cache entries using URL hashing to handle special characters and long URLs.

#### Scenario: URL to cache key conversion
- **WHEN** caching metadata for a URL
- **THEN** the system generates a hash-based cache key from the URL

#### Scenario: Cache key collision handling
- **WHEN** two different URLs generate the same hash (collision)
- **THEN** the system stores the full URL in the cache entry for verification

### Requirement: Support cache statistics and reporting
The system SHALL provide statistics about cache usage and performance.

#### Scenario: Cache hit rate reporting
- **WHEN** a build completes
- **THEN** the system reports the cache hit rate (cached vs fetched)

#### Scenario: Cache size reporting
- **WHEN** cache statistics are requested
- **THEN** the system reports the number of cached entries and total cache file size

### Requirement: Implement atomic cache writes
The system SHALL use atomic write operations to prevent cache corruption during concurrent builds.

#### Scenario: Concurrent cache updates
- **WHEN** multiple metadata fetches complete simultaneously
- **THEN** the system serializes cache writes to prevent data corruption

#### Scenario: Write failure rollback
- **WHEN** a cache write operation fails
- **THEN** the system preserves the previous valid cache state
