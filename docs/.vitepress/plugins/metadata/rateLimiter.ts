/**
 * Rate limiter for managing concurrent requests and per-domain delays
 */

interface QueuedRequest {
  url: string;
  domain: string;
  execute: () => Promise<void>;
  resolve: (value: void) => void;
  reject: (error: Error) => void;
}

export class RateLimiter {
  private maxConcurrent: number;
  private perDomainDelay: number;
  private activeRequests: number = 0;
  private queue: QueuedRequest[] = [];
  private lastRequestByDomain: Map<string, number> = new Map();
  private processing: boolean = false;

  /**
   * Create a new rate limiter
   * 
   * @param maxConcurrent - Maximum number of simultaneous requests (default: 5)
   * @param perDomainDelay - Delay in ms between requests to same domain (default: 500)
   */
  constructor(maxConcurrent: number = 5, perDomainDelay: number = 500) {
    this.maxConcurrent = maxConcurrent;
    this.perDomainDelay = perDomainDelay;
  }

  /**
   * Execute a request with rate limiting
   * 
   * @param url - The URL being requested
   * @param fn - The async function to execute
   * @returns Promise that resolves when the request completes
   */
  async execute<T>(url: string, fn: () => Promise<T>): Promise<T> {
    const domain = this.extractDomain(url);

    return new Promise<T>((resolve, reject) => {
      const request: QueuedRequest = {
        url,
        domain,
        execute: async () => {
          try {
            const result = await fn();
            resolve(result);
          } catch (error) {
            reject(error instanceof Error ? error : new Error(String(error)));
          }
        },
        resolve: () => resolve(undefined as T),
        reject,
      };

      this.queue.push(request);
      this.processQueue();
    });
  }

  /**
   * Extract domain from URL
   */
  private extractDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return 'unknown';
    }
  }

  /**
   * Process the request queue
   */
  private async processQueue(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      // Check if we can start a new request
      if (this.activeRequests >= this.maxConcurrent) {
        // Wait a bit before checking again
        await this.sleep(100);
        continue;
      }

      // Find next request that respects domain delay
      const now = Date.now();
      const requestIndex = this.queue.findIndex((req) => {
        const lastRequest = this.lastRequestByDomain.get(req.domain) || 0;
        const timeSinceLastRequest = now - lastRequest;
        return timeSinceLastRequest >= this.perDomainDelay;
      });

      if (requestIndex === -1) {
        // No requests ready yet, wait for the shortest delay
        const shortestDelay = this.calculateShortestDelay(now);
        if (shortestDelay > 0) {
          await this.sleep(shortestDelay);
        }
        continue;
      }

      // Execute the request
      const request = this.queue.splice(requestIndex, 1)[0];
      this.executeRequest(request);
    }

    this.processing = false;
  }

  /**
   * Calculate the shortest delay until next request can be made
   */
  private calculateShortestDelay(now: number): number {
    let shortestDelay = this.perDomainDelay;

    for (const req of this.queue) {
      const lastRequest = this.lastRequestByDomain.get(req.domain) || 0;
      const timeSinceLastRequest = now - lastRequest;
      const remainingDelay = this.perDomainDelay - timeSinceLastRequest;

      if (remainingDelay > 0 && remainingDelay < shortestDelay) {
        shortestDelay = remainingDelay;
      }
    }

    return Math.max(0, shortestDelay);
  }

  /**
   * Execute a single request
   */
  private async executeRequest(request: QueuedRequest): Promise<void> {
    this.activeRequests++;
    this.lastRequestByDomain.set(request.domain, Date.now());

    try {
      await request.execute();
    } finally {
      this.activeRequests--;
      // Continue processing queue
      this.processQueue();
    }
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get current queue statistics
   */
  getStats(): {
    activeRequests: number;
    queuedRequests: number;
    domainsTracked: number;
  } {
    return {
      activeRequests: this.activeRequests,
      queuedRequests: this.queue.length,
      domainsTracked: this.lastRequestByDomain.size,
    };
  }

  /**
   * Clear all queued requests and reset state
   */
  clear(): void {
    this.queue = [];
    this.lastRequestByDomain.clear();
    this.activeRequests = 0;
  }
}
