"use client";

import { useEffect } from 'react';

export default function SiteProtection() {
    useEffect(() => {
        // Disable right-click
        const handleContextMenu = (e) => {
            e.preventDefault();
        };

        // Disable specific keyboard shortcuts
        const handleKeyDown = (e) => {
            // Prevent F12 (DevTools)
            if (e.key === 'F12') {
                e.preventDefault();
            }

            // Prevent Ctrl+Shift+I (DevTools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
            }

            // Prevent Ctrl+Shift+J (DevTools Console)
            if (e.ctrlKey && e.shiftKey && e.key === 'J') {
                e.preventDefault();
            }

            // Prevent Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
            }

            // Prevent Ctrl+S (Save Page)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return null;
}
