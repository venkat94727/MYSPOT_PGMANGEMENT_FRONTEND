import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth token to requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
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

class AuthService {
  async login({ emailAddress, password, rememberMe = false }) {
    const response = await apiClient.post('/pg-auth/login', { emailAddress, password, rememberMe });
    return response.data.data;
  }

  async verifyLoginOtp({ emailAddress, otp }) {
    const response = await apiClient.post('/pg-auth/verify-otp', {
      emailAddress,
      otp,
      otpType: 'LOGIN_VERIFICATION'
    });
    const data = response.data.data;
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }

  // ✅ FIXED: Correctly maps to PGRegistrationRequest structure (not CustomerRegistrationRequest)
  async register(userData) {
    console.log('🔍 PG Registration data received:', userData);
    
    // Create payload matching EXACT PGRegistrationRequest structure from backend
    const payload = {
      // Owner Details (Required)
      pgName: userData.pgName?.trim(),
      ownerName: userData.ownerName?.trim(),
      pgProfilePicture: userData.pgProfilePicture?.trim() || null,
      
      // Contact Information (Required)
      emailAddress: userData.emailAddress?.trim(),
      phoneNumber: userData.phoneNumber?.trim(),
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      
      // Location Details (Required)
      city: userData.city?.trim(),
      state: userData.state?.trim(),
      country: userData.country?.trim() || 'India',
      pincode: userData.pincode?.trim(),
      
      // Coordinates (Optional - converted to BigDecimal compatible format)
      ...(userData.latitude && { latitude: parseFloat(userData.latitude) }),
      ...(userData.longitude && { longitude: parseFloat(userData.longitude) }),
    };
    
    console.log('🚀 Final payload for PGRegistrationRequest:', payload);
    console.log('📋 JSON payload:', JSON.stringify(payload, null, 2));
    
    const response = await apiClient.post('/pg-auth/register', payload);
    return response.data.data;
  }

  async verifyEmailOtp({ emailAddress, otp }) {
    const response = await apiClient.post('/pg-auth/verify-otp', {
      emailAddress,
      otp,
      otpType: 'EMAIL_VERIFICATION'
    });
    return response.data.data;
  }

  async resendOtp(emailAddress, otpType) {
    const response = await apiClient.post('/pg-auth/resend-otp', { emailAddress, otpType });
    return response.data.data;
  }

  async forgotPassword({ emailAddress }) {
    const response = await apiClient.post('/pg-auth/forgot-password', { emailAddress });
    return response.data;
  }

  async getCurrentUser() {
    const response = await apiClient.get('/pg-auth/profile');
    return response.data.data;
  }

  async logout() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      await apiClient.post('/pg-auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');
    const response = await apiClient.post('/pg-auth/refresh-token', { refreshToken });
    const data = response.data.data;
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  }

  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }
}

export const authService = new AuthService();