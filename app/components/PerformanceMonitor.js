"use client";

import { useEffect } from 'react';

// Performance monitoring component for development
export default function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure') {
          console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    // Monitor long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          console.warn(`Long Task detected: ${entry.duration}ms`);
        }
      });
    });

    if ('PerformanceLongTaskTiming' in window) {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    }

    // Monitor layout shifts
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.value > 0.1) {
          console.warn(`Layout Shift detected: ${entry.value}`);
        }
      });
    });

    if ('LayoutShift' in window) {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    return () => {
      observer.disconnect();
      longTaskObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  // This component doesn't render anything
  return null;
}

// FPS Monitor for development
export function FPSMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    let frames = 0;
    let lastTime = performance.now();

    function countFrames() {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps}fps`);
        }
        
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(countFrames);
    }

    requestAnimationFrame(countFrames);
  }, []);

  return null;
}
