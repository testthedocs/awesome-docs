/**
 * Icon selection logic based on domain
 */

export type IconType = 'code' | 'book' | 'video' | 'link';

/**
 * Select appropriate icon based on URL domain
 * 
 * @param url - The URL to analyze
 * @returns Icon type identifier
 */
export function selectIconForUrl(url: string): IconType {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.toLowerCase();

    // Code/GitHub domains
    if (
      domain.includes('github.com') ||
      domain.includes('gitlab.com') ||
      domain.includes('bitbucket.org') ||
      domain.includes('codeberg.org')
    ) {
      return 'code';
    }

    // Documentation domains
    if (
      domain.includes('readthedocs.org') ||
      domain.includes('readthedocs.io') ||
      domain.startsWith('docs.') ||
      domain.endsWith('.docs.io') ||
      domain.includes('documentation')
    ) {
      return 'book';
    }

    // Video domains
    if (
      domain.includes('youtube.com') ||
      domain.includes('youtu.be') ||
      domain.includes('vimeo.com') ||
      domain.includes('twitch.tv')
    ) {
      return 'video';
    }

    // Default
    return 'link';
  } catch {
    return 'link';
  }
}
