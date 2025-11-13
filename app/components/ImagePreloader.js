// Performance-optimized image preloader for critical images
import { useEffect } from 'react';

const ImagePreloader = ({ images, priority = false }) => {
  useEffect(() => {
    if (priority && images?.length) {
      // Preload only the first few critical images
      const criticalImages = images.slice(0, 3);
      
      criticalImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });

      // Cleanup function
      return () => {
        const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
        preloadLinks.forEach(link => {
          if (criticalImages.includes(link.href)) {
            document.head.removeChild(link);
          }
        });
      };
    }
  }, [images, priority]);

  return null; // This component doesn't render anything
};

// Utility function to generate optimized image URLs
export const getOptimizedImageUrl = (src, width, quality = 75) => {
  // For Next.js Image component automatic optimization
  return src;
};

// Utility function for responsive image sizes
export const getResponsiveImageSizes = (breakpoints = {}) => {
  const defaultBreakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    ...breakpoints
  };

  return `(max-width: ${defaultBreakpoints.sm}) 100vw, (max-width: ${defaultBreakpoints.md}) 50vw, (max-width: ${defaultBreakpoints.lg}) 33vw, 25vw`;
};

export default ImagePreloader;
