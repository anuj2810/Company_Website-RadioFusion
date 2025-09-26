import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for optimized image loading with WebP support
 * 
 * @param {string} src - Original image source
 * @param {Object} options - Configuration options
 * @returns {Object} - Image loading state and utilities
 */
export const useOptimizedImage = (src, options = {}) => {
  const {
    quality = 85,
    enableWebP = true,
    lazy = true,
    preload = false
  } = options;

  const [state, setState] = useState({
    src: null,
    isLoading: true,
    hasError: false,
    format: null,
    size: null
  });

  /**
   * Check if WebP is supported by the browser
   */
  const supportsWebP = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }, []);

  /**
   * Generate WebP version paths
   */
  const getWebPPaths = useCallback((originalPath) => {
    if (!originalPath) return [];
    
    if (originalPath.toLowerCase().endsWith('.webp')) {
      return [originalPath];
    }
    
    const lastSlashIndex = originalPath.lastIndexOf('/');
    const directory = originalPath.substring(0, lastSlashIndex + 1);
    const filename = originalPath.substring(lastSlashIndex + 1);
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    
    return [
      `${directory}webp/${nameWithoutExt}.webp`,
      `${directory}${nameWithoutExt}.webp`,
      originalPath.replace(/\.[^/.]+$/, '.webp')
    ];
  }, []);

  /**
   * Check if an image exists and get its metadata
   */
  const checkImage = useCallback((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({
          exists: true,
          width: img.naturalWidth,
          height: img.naturalHeight,
          size: img.naturalWidth * img.naturalHeight
        });
      };
      
      img.onerror = () => {
        resolve({ exists: false });
      };
      
      img.src = url;
    });
  }, []);

  /**
   * Load the optimal image format
   */
  const loadOptimalImage = useCallback(async () => {
    if (!src) {
      setState(prev => ({ ...prev, hasError: true, isLoading: false }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, hasError: false }));

    try {
      let selectedSrc = src;
      let selectedFormat = 'original';

      // Try WebP versions if supported
      if (enableWebP && supportsWebP()) {
        const webpPaths = getWebPPaths(src);
        
        for (const webpPath of webpPaths) {
          const result = await checkImage(webpPath);
          if (result.exists) {
            selectedSrc = webpPath;
            selectedFormat = 'webp';
            setState(prev => ({
              ...prev,
              src: selectedSrc,
              format: selectedFormat,
              size: result.size,
              isLoading: false,
              hasError: false
            }));
            return;
          }
        }
      }

      // Fallback to original image
      const originalResult = await checkImage(src);
      if (originalResult.exists) {
        setState(prev => ({
          ...prev,
          src: selectedSrc,
          format: selectedFormat,
          size: originalResult.size,
          isLoading: false,
          hasError: false
        }));
      } else {
        throw new Error('Image not found');
      }
    } catch (error) {
      console.warn(`Failed to load optimized image: ${src}`, error);
      setState(prev => ({
        ...prev,
        hasError: true,
        isLoading: false
      }));
    }
  }, [src, enableWebP, supportsWebP, getWebPPaths, checkImage]);

  /**
   * Preload image
   */
  const preloadImage = useCallback(() => {
    if (state.src && !state.hasError) {
      const img = new Image();
      img.src = state.src;
    }
  }, [state.src, state.hasError]);

  /**
   * Retry loading the image
   */
  const retry = useCallback(() => {
    loadOptimalImage();
  }, [loadOptimalImage]);

  // Load image when src changes
  useEffect(() => {
    if (src) {
      loadOptimalImage();
    }
  }, [src, loadOptimalImage]);

  // Preload if enabled
  useEffect(() => {
    if (preload && state.src && !state.hasError) {
      preloadImage();
    }
  }, [preload, preloadImage, state.src, state.hasError]);

  return {
    ...state,
    retry,
    preload: preloadImage,
    supportsWebP: supportsWebP()
  };
};

/**
 * Hook for batch image optimization
 */
export const useBatchOptimizedImages = (images = []) => {
  const [batchState, setBatchState] = useState({
    loaded: 0,
    total: images.length,
    isLoading: true,
    errors: []
  });

  const imageStates = images.map(img => 
    useOptimizedImage(typeof img === 'string' ? img : img.src, img.options)
  );

  useEffect(() => {
    const loaded = imageStates.filter(state => !state.isLoading && !state.hasError).length;
    const errors = imageStates
      .map((state, index) => ({ index, hasError: state.hasError }))
      .filter(item => item.hasError);

    setBatchState({
      loaded,
      total: images.length,
      isLoading: loaded < images.length && errors.length < images.length,
      errors: errors.map(item => item.index)
    });
  }, [imageStates, images.length]);

  return {
    ...batchState,
    progress: batchState.total > 0 ? (batchState.loaded / batchState.total) * 100 : 0,
    imageStates
  };
};

/**
 * Hook for responsive image loading
 */
export const useResponsiveImage = (src, breakpoints = {}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  
  const defaultBreakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
    ...breakpoints
  };

  useEffect(() => {
    const updateImageSrc = () => {
      const width = window.innerWidth;
      
      if (width <= defaultBreakpoints.mobile && src.mobile) {
        setCurrentSrc(src.mobile);
      } else if (width <= defaultBreakpoints.tablet && src.tablet) {
        setCurrentSrc(src.tablet);
      } else if (width <= defaultBreakpoints.desktop && src.desktop) {
        setCurrentSrc(src.desktop);
      } else {
        setCurrentSrc(src.default || src);
      }
    };

    updateImageSrc();
    window.addEventListener('resize', updateImageSrc);
    
    return () => window.removeEventListener('resize', updateImageSrc);
  }, [src, defaultBreakpoints]);

  return useOptimizedImage(currentSrc);
};

export default useOptimizedImage;