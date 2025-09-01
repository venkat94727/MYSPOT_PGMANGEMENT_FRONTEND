
import { useState, useCallback } from 'react';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';

/**
 * Custom hook for handling file uploads specifically for profile pictures
 * @param {string|number} pgId - The PG ID (optional, will be fetched from auth if not provided)
 * @returns {Object} - Hook utilities and state
 */
export const useFileUpload = (pgId = null) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  /**
   * Validate image file before upload
   */
  const validateFile = useCallback((file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!file) {
      throw new Error('No file selected');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Please select a valid image file (JPEG, PNG, GIF)');
    }

    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }

    return true;
  }, []);

  /**
   * Create image preview URL
   */
  const createPreview = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }, []);

  /**
   * Upload profile picture
   */
  const uploadProfilePicture = useCallback(async (file, targetPgId = null) => {
    try {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      // Validate file
      validateFile(file);

      // Get pgId from parameter, hook parameter, or auth service
      const effectivePgId = targetPgId || pgId || authService.getUserId();
      if (!effectivePgId) {
        throw new Error('User ID not found. Please login again.');
      }

      // Upload file
      const response = await authService.uploadProfilePicture(file, effectivePgId);

      if (response.success) {
        setUploadProgress(100);
        toast.success('Profile picture uploaded successfully!');
        return response.data;
      } else {
        throw new Error(response.message || 'Upload failed');
      }

    } catch (err) {
      const errorMessage = err.message || 'Failed to upload profile picture';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [pgId, validateFile]);

  /**
   * Update existing profile picture
   */
  const updateProfilePicture = useCallback(async (file, targetPgId = null) => {
    try {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      // Validate file
      validateFile(file);

      // Get pgId
      const effectivePgId = targetPgId || pgId || authService.getUserId();
      if (!effectivePgId) {
        throw new Error('User ID not found. Please login again.');
      }

      // Update file
      const response = await authService.updateProfilePicture(effectivePgId, file);

      if (response.success) {
        setUploadProgress(100);
        toast.success('Profile picture updated successfully!');
        return response.data;
      } else {
        throw new Error(response.message || 'Update failed');
      }

    } catch (err) {
      const errorMessage = err.message || 'Failed to update profile picture';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [pgId, validateFile]);

  /**
   * Delete profile picture
   */
  const deleteProfilePicture = useCallback(async (targetPgId = null) => {
    try {
      setIsUploading(true);
      setError(null);

      // Get pgId
      const effectivePgId = targetPgId || pgId || authService.getUserId();
      if (!effectivePgId) {
        throw new Error('User ID not found. Please login again.');
      }

      // Delete file
      const response = await authService.deleteProfilePicture(effectivePgId);

      if (response.success) {
        toast.success('Profile picture deleted successfully!');
        return true;
      } else {
        throw new Error(response.message || 'Delete failed');
      }

    } catch (err) {
      const errorMessage = err.message || 'Failed to delete profile picture';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [pgId]);

  /**
   * Handle file selection and automatic upload
   */
  const handleFileSelect = useCallback(async (event, autoUpload = true) => {
    const file = event.target.files?.[0];
    if (!file) return null;

    try {
      // Create preview
      const preview = await createPreview(file);

      if (autoUpload) {
        // Auto upload the file
        const result = await uploadProfilePicture(file);
        return {
          file,
          preview,
          uploadResult: result
        };
      } else {
        // Just return file and preview for manual upload later
        return {
          file,
          preview,
          uploadResult: null
        };
      }

    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [createPreview, uploadProfilePicture]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Reset all states
   */
  const reset = useCallback(() => {
    setIsUploading(false);
    setUploadProgress(0);
    setError(null);
  }, []);

  return {
    // State
    isUploading,
    uploadProgress,
    error,

    // Actions
    uploadProfilePicture,
    updateProfilePicture,
    deleteProfilePicture,
    handleFileSelect,
    validateFile,
    createPreview,
    clearError,
    reset
  };
};

/**
 * Custom hook for managing profile picture state
 */
export const useProfilePictureState = (initialUrl = null) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(initialUrl);
  const [preview, setPreview] = useState(null);

  const updateProfilePicture = useCallback((url) => {
    setProfilePictureUrl(url);
    setPreview(null);
  }, []);

  const setPreviewImage = useCallback((previewUrl) => {
    setPreview(previewUrl);
  }, []);

  const clearProfilePicture = useCallback(() => {
    setProfilePictureUrl(null);
    setPreview(null);
  }, []);

  const getCurrentImageUrl = useCallback(() => {
    return preview || profilePictureUrl;
  }, [preview, profilePictureUrl]);

  return {
    // State
    profilePictureUrl,
    preview,

    // Actions
    updateProfilePicture,
    setPreviewImage,
    clearProfilePicture,
    getCurrentImageUrl
  };
};

export default { useFileUpload, useProfilePictureState };