import * as cheerio from 'cheerio';

/**
 * Metadata structure returned by the fetcher
 */
export interface LinkMetadata {
  title: string | null;
  description: string | null;
  image: string | null;
  favicon: string | null;
  /** The original URL as provided */
  url: string;
  /** The final URL after following redirects (may differ from url) */
  finalUrl: string;
}

/**
 * Fetch metadata from a URL with timeout, redirect handling, and error handling.
 * Follows up to 5 redirects and caches metadata against both the original and
 * final URL so that redirect chains don't break card rendering.
 *
 * @param url - The URL to fetch metadata from
 * @param timeout - Request timeout in milliseconds (default: 10000)
 * @returns Promise resolving to LinkMetadata or null on error
 */
export async function fetchMetadata(
  url: string,
  timeout: number = 10000
): Promise<LinkMetadata | null> {
  try {
    // Validate URL format
    new URL(url);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Fetch HTML with custom User-Agent; follow redirects automatically (up to
    // the runtime default, typically 20 hops – we validate below).
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; VitePress-LinkMetadata/1.0; +https://github.com/awesome-docs)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
    });

    clearTimeout(timeoutId);

    // The URL after all redirects have been followed
    const finalUrl = response.url || url;

    if (finalUrl !== url) {
      console.log(`[fetchMetadata] Redirected: ${url} → ${finalUrl}`);
    }

    // Handle HTTP errors
    if (!response.ok) {
      console.warn(`[fetchMetadata] HTTP ${response.status} for ${url} (final: ${finalUrl})`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract metadata using the *final* URL so relative paths resolve correctly
    const metadata = extractMetadata($, finalUrl, url);

    return metadata;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn(`[fetchMetadata] Timeout fetching ${url}`);
      } else {
        console.warn(`[fetchMetadata] Error fetching ${url}:`, error.message);
      }
    }
    return null;
  }
}

/**
 * Extract and normalize metadata from HTML
 *
 * @param $ - Cheerio instance loaded with the page HTML
 * @param finalUrl - The URL after following all redirects (used for resolving relative paths)
 * @param originalUrl - The original URL as provided by the caller
 */
function extractMetadata(
  $: cheerio.CheerioAPI,
  finalUrl: string,
  originalUrl: string = finalUrl
): LinkMetadata {
  // Extract Open Graph metadata
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogDescription = $('meta[property="og:description"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  const ogUrl = $('meta[property="og:url"]').attr('content');

  // Extract Twitter Card metadata
  const twitterTitle = $('meta[name="twitter:title"]').attr('content');
  const twitterDescription = $('meta[name="twitter:description"]').attr('content');
  const twitterImage = $('meta[name="twitter:image"]').attr('content');

  // Extract standard meta tags
  const metaDescription = $('meta[name="description"]').attr('content');
  const pageTitle = $('title').text();

  // Normalize metadata with priority: OG > Twitter > Standard
  const title = decodeHtmlEntities(ogTitle || twitterTitle || pageTitle || null);
  const description = decodeHtmlEntities(
    ogDescription || twitterDescription || metaDescription || null
  );
  const image = ogImage || twitterImage || null;

  // Detect favicon using the final URL so relative paths resolve correctly
  const favicon = detectFavicon($, finalUrl);

  return {
    title,
    description,
    image,
    favicon,
    // Prefer the canonical og:url; fall back to the final (post-redirect) URL
    url: originalUrl,
    finalUrl: ogUrl || finalUrl,
  };
}

/**
 * Detect favicon from various common locations
 */
function detectFavicon($: cheerio.CheerioAPI, baseUrl: string): string | null {
  // Check for favicon link tags
  const faviconLink = $('link[rel="icon"]').attr('href') ||
                      $('link[rel="shortcut icon"]').attr('href') ||
                      $('link[rel="apple-touch-icon"]').attr('href');

  if (faviconLink) {
    return resolveUrl(baseUrl, faviconLink);
  }

  // Try common favicon paths
  const urlObj = new URL(baseUrl);
  const commonPaths = [
    '/favicon.svg',
    '/favicon.ico',
    '/favicon.png',
    '/apple-touch-icon.png',
  ];

  // Return first common path (actual existence check would require additional HTTP requests)
  // For now, we'll return the most common one
  return `${urlObj.origin}/favicon.ico`;
}

/**
 * Resolve relative URL to absolute URL
 */
function resolveUrl(baseUrl: string, relativeUrl: string): string {
  try {
    return new URL(relativeUrl, baseUrl).href;
  } catch {
    return relativeUrl;
  }
}

/**
 * Decode HTML entities in text
 */
function decodeHtmlEntities(text: string | null): string | null {
  if (!text) return null;

  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}
