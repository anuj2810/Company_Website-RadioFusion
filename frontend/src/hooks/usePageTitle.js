import { useEffect } from 'react';

/**
 * Custom hook to dynamically update the page title
 * @param {string} title - The title to set for the page
 * @param {string} suffix - Optional suffix to append (defaults to company name)
 */
const usePageTitle = (title, suffix = 'RadioFusion Global India') => {
  useEffect(() => {
    const previousTitle = document.title;
    
    // Set the new title
    document.title = title ? `${title} | ${suffix}` : suffix;
    
    // Cleanup function to restore previous title if needed
    return () => {
      // Optional: restore previous title on unmount
      // document.title = previousTitle;
    };
  }, [title, suffix]);
};

export default usePageTitle;