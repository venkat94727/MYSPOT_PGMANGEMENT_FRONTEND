// src/services/imageService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

class ImageService {

  /**
   * Upload PG Profile Picture
   * @param {File} file - The image file to upload
   * @param {string} pgId - The PG ID
   * @returns {Promise} - Promise with upload response
   */
  async uploadPGProfilePicture(file, pgId) {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      formData.append('pgId', pgId);

      const response = await axios.post(
        `${API_BASE_URL}/pg/profile-picture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Profile picture upload failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Upload multiple PG pictures
   * @param {FileList} files - Array of image files
   * @param {string} pgId - The PG ID
   * @returns {Promise} - Promise with upload response
   */
  async uploadPGPictures(files, pgId) {
    try {
      const formData = new FormData();

      // Append each file to FormData
      Array.from(files).forEach((file, index) => {
        formData.append(`pgPictures`, file);
      });

      formData.append('pgId', pgId);

      const response = await axios.post(
        `${API_BASE_URL}/pg/pictures`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`PG pictures upload failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Update PG picture description
   * @param {string} pgId - The PG ID
   * @param {string} pictureId - The picture ID
   * @param {string} description - New description
   * @returns {Promise} - Promise with update response
   */
  async updatePGPictureDescription(pgId, pictureId, description) {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/pg/${pgId}/pictures/${pictureId}`,
        { description }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Description update failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Delete PG picture
   * @param {string} pgId - The PG ID
   * @param {string} pictureId - The picture ID to delete
   * @returns {Promise} - Promise with delete response
   */
  async deletePGPicture(pgId, pictureId) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/pg/${pgId}/pictures/${pictureId}`
      );

      return response.data;
    } catch (error) {
      throw new Error(`Picture deletion failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Delete PG profile picture
   * @param {string} pgId - The PG ID
   * @returns {Promise} - Promise with delete response
   */
  async deletePGProfilePicture(pgId) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/pg/${pgId}/profile-picture`
      );

      return response.data;
    } catch (error) {
      throw new Error(`Profile picture deletion failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get all PG pictures
   * @param {string} pgId - The PG ID
   * @returns {Promise} - Promise with pictures data
   */
  async getPGPictures(pgId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/pg/${pgId}/pictures`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch PG pictures: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Validate image file
   * @param {File} file - File to validate
   * @returns {Object} - Validation result
   */
  validateImageFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Please select a valid image file (JPEG, PNG, GIF)'
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size should be less than 5MB'
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
}

export default new ImageService();