'use client';

import { useState, useEffect } from 'react';

const useScrollTrigger = (triggerPoint = 300, delay = 2000) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if form has been shown before (localStorage)
    const formShown = localStorage.getItem('contactFormShown');
    const formSubmitted = localStorage.getItem('contactFormSubmitted');
    
    // Don't show if already submitted
    if (formSubmitted === 'true') {
      return;
    }

    let scrollTimeout;
    let hasScrolled = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Check if user has scrolled past trigger point
      if (scrollY > triggerPoint && !hasScrolled && !hasTriggered) {
        hasScrolled = true;
        
        // Clear any existing timeout
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        
        // Set timeout to show form after delay
        scrollTimeout = setTimeout(() => {
          // Only show if form hasn't been shown today
          const today = new Date().toDateString();
          const lastShown = localStorage.getItem('contactFormLastShown');
          
          if (lastShown !== today || !formShown) {
            setShouldShow(true);
            setHasTriggered(true);
            localStorage.setItem('contactFormShown', 'true');
            localStorage.setItem('contactFormLastShown', today);
          }
        }, delay);
      }
    };

    // Throttled scroll event
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [triggerPoint, delay, hasTriggered]);

  const hideForm = () => {
    setShouldShow(false);
  };

  const markAsSubmitted = () => {
    localStorage.setItem('contactFormSubmitted', 'true');
    setShouldShow(false);
  };

  return {
    shouldShow,
    hideForm,
    markAsSubmitted,
    hasTriggered
  };
};

export default useScrollTrigger;
