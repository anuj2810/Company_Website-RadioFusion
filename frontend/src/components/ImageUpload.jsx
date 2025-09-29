import React, { useState, useRef } from 'react';

const ImageUpload = ({ 
  currentImage, 
  onImageChange, 
  className = "", 
  containerClassName = "",
  fallbackGradient = "from-blue-600 to-purple-600",
  shape = "rectangle",
  aspectRatio = "aspect-video",
  showUploadButton = true,
  overlayContent = null,
  alt = "Uploaded image",
  mobileImage = null
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(currentImage);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreviewImage(imageUrl);
        if (onImageChange) {
          onImageChange(imageUrl, file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewImage(null);
    if (onImageChange) {
      onImageChange(null, null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const shapeClasses = shape === "circle" ? "rounded-full" : "rounded-xl";
  const containerClasses = `relative ${aspectRatio} ${containerClassName}`;
  const shadowClasses = "shadow-lg hover:shadow-xl transition-shadow duration-300";

  return (
    <div className={containerClasses}>
      <div
        className={`
          relative w-full h-full overflow-hidden ${shapeClasses} ${shadowClasses}
          ${dragActive ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
          ${className}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {previewImage ? (
          <>
            <picture>
              <source media="(max-width: 768px)" srcSet={mobileImage || previewImage || currentImage} />
              <img
                src={previewImage}
                alt={alt}
                className={`w-full h-full object-cover object-center ${shapeClasses}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
            </picture>
            {overlayContent && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                {overlayContent}
              </div>
            )}
            {showUploadButton && (
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="flex space-x-2">
                  <button
                    onClick={openFileDialog}
                    className="px-3 py-2 bg-white text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
                  >
                    Change
                  </button>
                  <button
                    onClick={removeImage}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            className={`
              w-full h-full bg-gradient-to-br ${fallbackGradient} 
              flex items-center justify-center cursor-pointer
              hover:opacity-80 transition-opacity duration-300
              ${shapeClasses}
            `}
            onClick={openFileDialog}
          >
            <div className="text-center text-white">
              <svg
                className="mx-auto h-12 w-12 mb-4 opacity-75"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm font-medium">
                {dragActive ? "Drop image here" : "Click to upload image"}
              </p>
              <p className="text-xs opacity-75 mt-1">
                or drag and drop
              </p>
            </div>
            {overlayContent && (
              <div className="absolute inset-0 flex items-center justify-center">
                {overlayContent}
              </div>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;