
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

class ImageService {
  
  /**
   * Upload PG Profile Picture using the new backend endpoint
   * @param {File} file - The image file to upload
   * @param {string|number} pgId - The PG ID
   * @returns {Promise} - Promise with upload response
   */
  async uploadPGProfilePicture(file, pgId) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pgId', pgId);

      const token = localStorage.getItem('accessToken');
      
      const response = await axios.post(
        `${API_BASE_URL}/pg-auth/upload-profile-picture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Profile picture upload failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Update existing profile picture
   * @param {string|number} pgId - The PG ID
   * @param {File} file - The new image file
   * @returns {Promise} - Promise with update response
   */
  async updatePGProfilePicture(pgId, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('accessToken');
      
      const response = await axios.put(
        `${API_BASE_URL}/pg-auth/update-profile-picture/${pgId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Profile picture update failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Delete PG profile picture
   * @param {string|number} pgId - The PG ID
   * @returns {Promise} - Promise with delete response
   */
  async deletePGProfilePicture(pgId) {
    try {
      const token = localStorage.getItem('accessToken');
      
      const response = await axios.delete(
        `${API_BASE_URL}/pg-auth/delete-profile-picture/${pgId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Profile picture deletion failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get PG profile data including picture URL
   * @param {string|number} pgId - The PG ID
   * @returns {Promise} - Promise with profile data
   */
  async getPGProfile(pgId) {
    try {
      const token = localStorage.getItem('accessToken');
      
      const response = await axios.get(
        `${API_BASE_URL}/pg-auth/profile/${pgId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch PG profile: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Validate image file
   * @param {File} file - File to validate
   * @returns {Object} - Validation result
   */
  validateImageFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Please select a valid image file (JPEG, PNG, GIF)'
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size should be less than 10MB'
      };
    }

    return { isValid: true };
  }

  /**
   * Create image preview URL
   * @param {File} file - Image file
   * @returns {Promise} - Promise with preview URL
   */
  createImagePreview(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Check if image URL is accessible
   * @param {string} imageUrl - Image URL to check
   * @returns {Promise<boolean>} - Promise resolving to true if accessible
   */
  async checkImageAccessibility(imageUrl) {
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate optimized image URL with query parameters
   * @param {string} imageUrl - Base image URL
   * @param {Object} options - Optimization options
   * @returns {string} - Optimized image URL
   */
  getOptimizedImageUrl(imageUrl, options = {}) {
    if (!imageUrl) return null;
    
    const {
      width = null,
      height = null,
      quality = 80,
      format = null
    } = options;

    const url = new URL(imageUrl);
    
    if (width) url.searchParams.set('w', width);
    if (height) url.searchParams.set('h', height);
    if (quality !== 80) url.searchParams.set('q', quality);
    if (format) url.searchParams.set('format', format);

    return url.toString();
  }
}

export default new ImageService();