/**
 * Utility to generate localized image URLs.
 * This ensures all images are served from the project's public directory.
 */
export const getImageUrl = (src: string) => {
  // If it's already an external URL, return it as is.
  if (src.startsWith('http')) return src;
  
  // Return the path relative to the public folder.
  return src.startsWith('/') ? src : `/${src}`;
};
