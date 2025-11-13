// Performance utilities for monitoring and optimization

// Web Vitals measurement
export const measureWebVitals = (metric) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      custom_parameter_1: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_parameter_2: metric.id,
    });
  }
};

// Image loading performance tracker
export const trackImageLoad = (imageSrc, loadTime) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Image loaded: ${imageSrc} in ${loadTime}ms`);
  }
};

// Lazy loading intersection observer options
export const lazyLoadOptions = {
  root: null,
  rootMargin: '50px', // Start loading 50px before entering viewport
  threshold: 0.1
};

// Debounce function for scroll events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Preload critical resources
export const preloadCriticalImages = (imageUrls) => {
  if (typeof window === 'undefined') return;

  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

// Performance budget checker
export const checkPerformanceBudget = () => {
  if (typeof window === 'undefined') return;

  // Check if Performance API is available
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0];
    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    
    if (loadTime > 3000) {
      console.warn('Page load time exceeds 3 seconds:', loadTime + 'ms');
    }
  }
};
