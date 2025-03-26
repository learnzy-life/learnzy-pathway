
// Google Analytics utility functions

/**
 * Tracks a page view in Google Analytics
 * @param path - The path of the page (e.g., '/subjects')
 * @param title - The title of the page (e.g., 'Subject Selection')
 */
export const trackPageView = (path: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
    console.log(`📊 Analytics: Tracked page view - ${title} (${path})`);
  }
};

/**
 * Tracks a user event in Google Analytics
 * @param eventName - The name of the event (e.g., 'button_click')
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log(`📊 Analytics: Tracked event - ${eventName}`, eventParams);
  }
};

// Pre-defined event tracking functions for common actions
export const trackTestStarted = (subject: string) => {
  trackEvent('test_started', { subject });
};

export const trackTestCompleted = (subject: string, score: number) => {
  trackEvent('test_completed', { subject, score });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', { button_name: buttonName, location });
};

export const trackSignUp = (method: string) => {
  trackEvent('sign_up', { method });
};

export const trackSignIn = (method: string) => {
  trackEvent('sign_in', { method });
};
