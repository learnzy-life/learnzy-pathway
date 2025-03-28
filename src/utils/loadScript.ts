
/**
 * Dynamically load a script into the document
 * @param src Script URL
 * @returns Promise that resolves when script is loaded
 */
export const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    document.head.appendChild(script);
  });
};

/**
 * Load the Razorpay script
 */
export const loadRazorpayScript = (): Promise<void> => {
  return loadScript('https://checkout.razorpay.com/v1/checkout.js');
};
