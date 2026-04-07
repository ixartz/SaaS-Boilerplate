'use client';

/* eslint-disable ts/consistent-type-definitions */
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, unknown>
    ) => void;
  }
}

export function GlobalClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Track clicks on buttons and links
      const button = target.closest('button, [role="button"], a');
      if (button) {
        const elementText
          = button.getAttribute('aria-label')
          || button.textContent?.trim()
          || 'Unknown';

        // Send custom event to GA4
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'element_click', {
            element_text: elementText.substring(0, 100), // Limit length
            element_type: button.tagName.toLowerCase(),
            element_id: button.id || undefined,
            element_class: button.className || undefined,
          });
        }
      }
    };

    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}

export default GlobalClickTracker;
