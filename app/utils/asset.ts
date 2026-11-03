/**
 * Resolves static asset paths with support for GitHub Pages subfolder (basePath).
 * If deployed to https://<user>.github.io/tag_website, it prepends /tag_website
 * so images and icons never 404.
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  // If it's an external URL (http:// or https://) or data uri, return as is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

  if (basePath) {
    // Avoid double slashes if basePath has trailing slash
    const normalizedBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
    return `${normalizedBase}${cleanPath}`;
  }

  // Client-side fallback if running under /tag_website on GitHub Pages
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/tag_website')) {
    return `/tag_website${cleanPath}`;
  }

  return cleanPath;
}
