/**
 * ImageKit Loader for Next.js Image component
 * Automatically adds optimization parameters like width and quality.
 */
export const imagekitLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  // If src is already a full URL, use it as is
  if (src.startsWith('http')) return src;
  
  // Remove leading slash if present
  const path = src.startsWith('/') ? src.substring(1) : src;
  
  // ImageKit ID from user instructions
  const IMAGEKIT_ID = "FocusOpticals"; 
  const urlEndpoint = `https://ik.imagekit.io/${IMAGEKIT_ID}`;
  
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  
  const paramsString = params.join(',');
  return `${urlEndpoint}/${path}?tr=${paramsString}`;
};
