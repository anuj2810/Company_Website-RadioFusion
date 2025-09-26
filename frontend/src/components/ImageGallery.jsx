import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import OptimizedImage from './OptimizedImage';
import { useBatchOptimizedImages } from '../hooks/useOptimizedImage';
import './ImageGallery.css';

/**
 * ImageGallery Component
 * 
 * A responsive image gallery with optimized loading, lazy loading,
 * and WebP support. Includes lightbox functionality and loading states.
 */
const ImageGallery = ({
  images = [],
  columns = 3,
  gap = 16,
  showLoadingProgress = true,
  enableLightbox = true,
  className = '',
  ...props
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Use batch optimization hook for progress tracking
  const batchState = useBatchOptimizedImages(images);

  /**
   * Generate responsive grid styles
   */
  const gridStyles = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${300 / columns}px, 1fr))`,
    gap: `${gap}px`,
    width: '100%'
  }), [columns, gap]);

  /**
   * Handle image click for lightbox
   */
  const handleImageClick = (image, index) => {
    if (enableLightbox) {
      setSelectedImage({ ...image, index });
      setLightboxOpen(true);
    }
  };

  /**
   * Close lightbox
   */
  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  /**
   * Navigate to previous image in lightbox
   */
  const navigatePrevious = () => {
    if (selectedImage && selectedImage.index > 0) {
      const prevImage = images[selectedImage.index - 1];
      setSelectedImage({ ...prevImage, index: selectedImage.index - 1 });
    }
  };

  /**
   * Navigate to next image in lightbox
   */
  const navigateNext = () => {
    if (selectedImage && selectedImage.index < images.length - 1) {
      const nextImage = images[selectedImage.index + 1];
      setSelectedImage({ ...nextImage, index: selectedImage.index + 1 });
    }
  };

  /**
   * Handle keyboard navigation in lightbox
   */
  const handleKeyDown = (event) => {
    if (!lightboxOpen) return;

    switch (event.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigatePrevious();
        break;
      case 'ArrowRight':
        navigateNext();
        break;
      default:
        break;
    }
  };

  // Add keyboard event listener
  React.useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen, selectedImage]);

  if (!images || images.length === 0) {
    return (
      <div className={`image-gallery-empty ${className}`}>
        <p>No images to display</p>
      </div>
    );
  }

  return (
    <div className={`image-gallery ${className}`} {...props}>
      {/* Loading Progress */}
      {showLoadingProgress && batchState.isLoading && (
        <div className="image-gallery-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${batchState.progress}%` }}
            />
          </div>
          <span className="progress-text">
            Loading images... {batchState.loaded}/{batchState.total}
          </span>
        </div>
      )}

      {/* Image Grid */}
      <div className="image-gallery-grid" style={gridStyles}>
        {images.map((image, index) => {
          const imageSrc = typeof image === 'string' ? image : image.src;
          const imageAlt = typeof image === 'string' ? `Image ${index + 1}` : (image.alt || `Image ${index + 1}`);
          const imageTitle = typeof image === 'string' ? '' : (image.title || '');

          return (
            <div
              key={index}
              className={`image-gallery-item ${enableLightbox ? 'clickable' : ''}`}
              onClick={() => handleImageClick(image, index)}
            >
              <OptimizedImage
                src={imageSrc}
                alt={imageAlt}
                className="gallery-image"
                lazy={true}
                placeholder="Loading..."
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: enableLightbox ? 'pointer' : 'default'
                }}
              />
              {imageTitle && (
                <div className="image-gallery-caption">
                  {imageTitle}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {enableLightbox && lightboxOpen && selectedImage && (
        <div className="image-lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ×
            </button>

            {/* Navigation Buttons */}
            {selectedImage.index > 0 && (
              <button
                className="lightbox-nav lightbox-prev"
                onClick={navigatePrevious}
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {selectedImage.index < images.length - 1 && (
              <button
                className="lightbox-nav lightbox-next"
                onClick={navigateNext}
                aria-label="Next image"
              >
                ›
              </button>
            )}

            {/* Main Image */}
            <OptimizedImage
              src={typeof selectedImage === 'string' ? selectedImage : selectedImage.src}
              alt={typeof selectedImage === 'string' ? `Image ${selectedImage.index + 1}` : (selectedImage.alt || `Image ${selectedImage.index + 1}`)}
              className="lightbox-image"
              lazy={false}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain'
              }}
            />

            {/* Image Info */}
            <div className="lightbox-info">
              <span className="image-counter">
                {selectedImage.index + 1} / {images.length}
              </span>
              {typeof selectedImage !== 'string' && selectedImage.title && (
                <h3 className="image-title">{selectedImage.title}</h3>
              )}
              {typeof selectedImage !== 'string' && selectedImage.description && (
                <p className="image-description">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
      })
    ])
  ).isRequired,
  columns: PropTypes.number,
  gap: PropTypes.number,
  showLoadingProgress: PropTypes.bool,
  enableLightbox: PropTypes.bool,
  className: PropTypes.string
};

export default ImageGallery;