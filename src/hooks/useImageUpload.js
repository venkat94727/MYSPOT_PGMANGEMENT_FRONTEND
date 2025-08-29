// src/hooks/useImageUpload.js
import { useState, useCallback } from 'react';
import imageService from '../services/imageService';

/**
 * Custom hook for handling image uploads
 * @param {string} pgId - The PG ID
 * @returns {Object} - Hook utilities and state
 */
export const useImageUpload = (pgId) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Handle profile picture upload
   */
  const uploadProfilePicture = useCallback(async (file) => {
    try {
      setIsUploading(true);
      setError(null);

      // Validate file
      const validation = imageService.validateImageFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Upload file
      const response = await imageService.uploadPGProfilePicture(file, pgId);

      setIsUploading(false);
      return response;

    } catch (err) {
      setError(err.message);
      setIsUploading(false);
      throw err;
    }
  }, [pgId]);

  /**
   * Handle multiple pictures upload
   */
  const uploadPGPictures = useCallback(async (files) => {
    try {
      setIsUploading(true);
      setError(null);

      // Validate all files
      const fileArray = Array.from(files);
      for (let file of fileArray) {
        const validation = imageService.validateImageFile(file);
        if (!validation.isValid) {
          throw new Error(`${file.name}: ${validation.error}`);
        }
      }

      // Upload files
      const response = await imageService.uploadPGPictures(files, pgId);

      setIsUploading(false);
      return response;

    } catch (err) {
      setError(err.message);
      setIsUploading(false);
      throw err;
    }
  }, [pgId]);

  /**
   * Update picture description
   */
  const updateDescription = useCallback(async (pictureId, description) => {
    try {
      setError(null);
      const response = await imageService.updatePGPictureDescription(pgId, pictureId, description);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [pgId]);

  /**
   * Delete picture
   */
  const deletePicture = useCallback(async (pictureId) => {
    try {
      setError(null);
      const response = await imageService.deletePGPicture(pgId, pictureId);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [pgId]);

  /**
   * Delete profile picture
   */
  const deleteProfilePicture = useCallback(async () => {
    try {
      setError(null);
      const response = await imageService.deletePGProfilePicture(pgId);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [pgId]);

  /**
   * Create image preview
   */
  const createPreview = useCallback(async (file) => {
    try {
      const preview = await imageService.createImagePreview(file);
      return preview;
    } catch (err) {
      setError('Failed to create image preview');
      throw err;
    }
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    isUploading,
    uploadProgress,
    error,

    // Actions
    uploadProfilePicture,
    uploadPGPictures,
    updateDescription,
    deletePicture,
    deleteProfilePicture,
    createPreview,
    clearError
  };
};

/**
 * Custom hook for managing image state locally
 */
export const useImageState = () => {
  const [images, setImages] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

  const addImages = useCallback((newImages) => {
    const imagesArray = Array.isArray(newImages) ? newImages : [newImages];
    setImages(prev => [...prev, ...imagesArray]);
  }, []);

  const removeImage = useCallback((imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  }, []);

  const updateImageDescription = useCallback((imageId, description) => {
    setImages(prev => prev.map(img => 
      img.id === imageId ? { ...img, description } : img
    ));
  }, []);

  const setProfilePic = useCallback((picture) => {
    setProfilePicture(picture);
  }, []);

  const removeProfilePic = useCallback(() => {
    setProfilePicture(null);
  }, []);

  const clearAll = useCallback(() => {
    setImages([]);
    setProfilePicture(null);
  }, []);

  return {
    // State
    images,
    profilePicture,

    // Actions
    addImages,
    removeImage,
    updateImageDescription,
    setProfilePic,
    removeProfilePic,
    clearAll
  };
};

export default { useImageUpload, useImageState };