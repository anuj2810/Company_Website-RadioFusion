import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * OptimizedImage Component
 * 
 * A React component that automatically loads WebP images when available,
 * with fallback to original formats. Includes lazy loading, error handling,
 * and loading states for better user experience.
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  style = {},
  width,
  height,
  lazy = true,
  quality = 85,
  placeholder = null,
  onLoad = () => {},
  onError = () => {},
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  /**
   * Generate WebP version of the image path
   */
  const getWebPPath = (originalPath) => {
    if (!originalPath) return null;
    
    // Check if it's already a WebP image
    if (originalPath.toLowerCase().endsWith('.webp')) {
      return originalPath;
    }
    
    // Handle public assets paths
    if (originalPath.startsWith('/assets/')) {
      const relativePath = originalPath.substring('/assets/'.length);
      const nameWithoutExt = relativePath.substring(0, relativePath.lastIndexOf('.'));
      return `/assets/webp/frontend/src/assets/${nameWithoutExt}.webp`;
    }
    
    // Extract directory and filename for other paths
    const lastSlashIndex = originalPath.lastIndexOf('/');
    const directory = originalPath.substring(0, lastSlashIndex + 1);
    const filename = originalPath.substring(lastSlashIndex + 1);
    
    // Remove extension and add .webp
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    
    // Try different WebP path patterns
    const webpPaths = [
      `${directory}webp/${nameWithoutExt}.webp`,
      `${directory}${nameWithoutExt}.webp`,
      originalPath.replace(/\.[^/.]+$/, '.webp')
    ];
    
    return webpPaths;
  };

  /**
   * Check if WebP is supported by the browser
   */
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  /**
   * Check if an image URL exists
   */
  const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  /**
   * Load the optimal image format
   */
  const loadOptimalImage = async () => {
    if (!src || !isInView) return;

    setIsLoading(true);
    setHasError(false);

    try {
      // If WebP is supported, try WebP versions first
      if (supportsWebP()) {
        const webpPaths = getWebPPath(src);
        
        if (Array.isArray(webpPaths)) {
          // Try each WebP path
          for (const webpPath of webpPaths) {
            const exists = await checkImageExists(webpPath);
            if (exists) {
              setImageSrc(webpPath);
              setIsLoading(false);
              return;
            }
          }
        }
      }

      // Fallback to original image
      const originalExists = await checkImageExists(src);
      if (originalExists) {
        setImageSrc(src);
      } else {
        throw new Error('Image not found');
      }
    } catch (error) {
      console.warn(`Failed to load image: ${src}`, error);
      setHasError(true);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Set up intersection observer for lazy loading
   */
  useEffect(() => {
    if (!lazy || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy]);

  /**
   * Load image when in view or src changes
   */
  useEffect(() => {
    if (isInView) {
      loadOptimalImage();
    }
  }, [src, isInView]);

  /**
   * Handle image load event
   */
  const handleImageLoad = (event) => {
    setIsLoading(false);
    onLoad(event);
  };

  /**
   * Handle image error event
   */
  const handleImageError = (event) => {
    setHasError(true);
    setIsLoading(false);
    onError(event);
  };

  /**
   * Generate responsive srcSet for different screen densities
   */
  const generateSrcSet = () => {
    if (!imageSrc || hasError) return '';
    
    const basePath = imageSrc.substring(0, imageSrc.lastIndexOf('.'));
    const extension = imageSrc.substring(imageSrc.lastIndexOf('.'));
    
    // Generate different density versions
    return [
      `${imageSrc} 1x`,
      `${basePath}@2x${extension} 2x`,
      `${basePath}@3x${extension} 3x`
    ].join(', ');
  };

  // Render loading placeholder
  if (isLoading && placeholder) {
    return (
      <div
        ref={imgRef}
        className={`optimized-image-placeholder ${className}`}
        style={{
          ...style,
          width: width || style.width || 'auto',
          height: height || style.height || 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          color: '#666'
        }}
      >
        {typeof placeholder === 'string' ? (
          <span>{placeholder}</span>
        ) : (
          placeholder
        )}
      </div>
    );
  }

  // Render error state
  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={`optimized-image-error ${className}`}
        style={{
          ...style,
          width: width || style.width || 'auto',
          height: height || style.height || 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f8f8',
          color: '#999',
          border: '1px dashed #ddd'
        }}
      >
        <span>Image not available</span>
      </div>
    );
  }

  // Render the optimized image
  return (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={generateSrcSet()}
      alt={alt}
      className={`optimized-image ${isLoading ? 'loading' : 'loaded'} ${className}`}
      style={{
        ...style,
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.3s ease-in-out'
      }}
      width={width}
      height={height}
      onLoad={handleImageLoad}
      onError={handleImageError}
      loading={lazy ? 'lazy' : 'eager'}
      {...props}
    />
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lazy: PropTypes.bool,
  quality: PropTypes.number,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default OptimizedImage;