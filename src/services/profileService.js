import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

// Create axios instance for profile operations
const profileApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth token to requests
profileApiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
profileApiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Profile API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

class ProfileService {
  
  /**
   * Get current user profile
   */
  async getCurrentProfile() {
    try {
      console.log('🔍 ProfileService: Getting current profile...');
      
      const response = await profileApiClient.get('/pg-auth/profile');
      
      console.log('✅ ProfileService: Profile loaded successfully:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ ProfileService: Failed to get profile:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    try {
      console.log('🚀 ProfileService: Updating profile...', profileData);
      
      const response = await profileApiClient.put('/pg-auth/profile', profileData);
      
      console.log('✅ ProfileService: Profile updated successfully:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ ProfileService: Failed to update profile:', error);
      throw error;
    }
  }

  /**
   * Update profile picture
   */
  async updateProfilePicture(profilePictureFile) {
    try {
      console.log('📸 ProfileService: Updating profile picture...', profilePictureFile.name);
      
      const formData = new FormData();
      formData.append('profilePicture', profilePictureFile);
      
      // Get current user ID (you might need to adjust this based on your token structure)
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      // Decode token to get pgId (basic JWT decode - you might want to use a proper JWT library)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const pgId = payload.pgId || payload.sub || payload.userId;
      
      if (pgId) {
        formData.append('pgId', pgId.toString());
      }

      const response = await axios.post(`${API_BASE_URL}/pg-auth/update-profile-picture`, formData, {
        timeout: 60000, // 60 seconds for file upload
        headers: {
          Authorization: `Bearer ${token}`
          // Don't set Content-Type for multipart/form-data
        }
      });

      console.log('✅ ProfileService: Profile picture updated successfully:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ ProfileService: Failed to update profile picture:', error);
      throw error;
    }
  }

  /**
   * Change password
   */
  async changePassword(passwordData) {
    try {
      console.log('🔐 ProfileService: Changing password...');
      
      const response = await profileApiClient.put('/pg-auth/change-password', passwordData);
      
      console.log('✅ ProfileService: Password changed successfully');
      return response.data;
    } catch (error) {
      console.error('❌ ProfileService: Failed to change password:', error);
      throw error;
    }
  }

  /**
   * Get profile statistics (optional - for dashboard)
   */
  async getProfileStats() {
    try {
      console.log('📊 ProfileService: Getting profile statistics...');
      
      const response = await profileApiClient.get('/pg-auth/profile/stats');
      
      console.log('✅ ProfileService: Profile stats loaded:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ ProfileService: Failed to get profile stats:', error);
      throw error;
    }
  }

  /**
   * Update notification preferences
   */
  async updateNotificationPreferences(preferences) {
    try {
      console.log('🔔 ProfileService: Updating notification preferences...', preferences);
      
      const response = await profileApiClient.put('/pg-auth/profile/notifications', preferences);
      
      console.log('✅ ProfileService: Notification preferences updated:', response.data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('❌ ProfileService: Failed to update notification preferences:', error);
      throw error;
    }
  }

  /**
   * Deactivate account
   */
  async deactivateAccount(reason) {
    try {
      console.log('⚠️ ProfileService: Deactivating account...');
      
      const response = await profileApiClient.put('/pg-auth/profile/deactivate', { reason });
      
      console.log('✅ ProfileService: Account deactivated');
      return response.data;
    } catch (error) {
      console.error('❌ ProfileService: Failed to deactivate account:', error);
      throw error;
    }
  }

  /**
 * Update profile picture
 */
async updateProfilePicture(profilePictureFile) {
  try {
    console.log('📸 ProfileService: Updating profile picture...', profilePictureFile.name);
    
    const formData = new FormData();
    formData.append('profilePicture', profilePictureFile);
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(`${API_BASE_URL}/pg-auth/update-profile-picture`, formData, {
      timeout: 60000, // 60 seconds for file upload
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('✅ ProfileService: Profile picture updated successfully:', response.data);
    
    // Return the correct data structure based on your ApiResponse
    if (response.data.success) {
      return response.data.data || response.data;
    } else {
      throw new Error(response.data.message || 'Failed to update profile picture');
    }
  } catch (error) {
    console.error('❌ ProfileService: Failed to update profile picture:', error);
    throw error;
  }
}

}

export const profileService = new ProfileService();