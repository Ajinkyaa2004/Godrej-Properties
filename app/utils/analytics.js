// Google Analytics 4 Event Tracking Utility

// Standardized event names for Real Estate
export const GA_EVENTS = {
    FORM_SUBMIT: 'form_submit',
    BUTTON_CLICK: 'button_click',
    CONTACT_CLICK: 'contact_click',
    DOWNLOAD: 'file_download',
    SCROLL_DEPTH: 'scroll_depth',
    SECTION_VIEW: 'section_view',
};

export const GA_CATEGORIES = {
    ENGAGEMENT: 'Engagement',
    CONVERSION: 'Conversion',
    NAVIGATION: 'Navigation',
};

/**
 * Sends a custom event to Google Analytics 4
 * @param {string} action - The event name (e.g., 'generate_lead', 'click')
 * @param {object} params - Additional parameters (e.g., { category: 'Form', label: 'Contact Us' })
 */
export const trackEvent = (action, params = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, params);
    } else {
        console.log('GA Event (Dev):', action, params);
    }
};

/**
 * Track specific conversion events
 */
export const trackConversion = (type, label) => {
    trackEvent('generate_lead', {
        event_category: GA_CATEGORIES.CONVERSION,
        event_label: label,
        conversion_type: type, // 'form', 'whatsapp', 'call'
    });
};
