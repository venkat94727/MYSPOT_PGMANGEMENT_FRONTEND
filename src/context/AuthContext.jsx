import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        otpResponse: null,
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
        otpResponse: null,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        otpResponse: null,
      };
    case 'OTP_SENT':
      return {
        ...state,
        isLoading: false,
        error: null,
        otpResponse: action.payload,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  otpResponse: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          dispatch({ type: 'AUTH_START' });
          const user = await authService.getCurrentUser();
          dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } catch (error) {
          dispatch({ type: 'AUTH_FAIL', payload: 'Session expired' });
          authService.logout();
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.login(credentials);
      
      if (response && response.accessToken) {
        dispatch({ type: 'AUTH_SUCCESS', payload: response });
        toast.success('Login successful!');
        return response;
      }
    } catch (error) {
      let errorMessage = 'Gmail and Password are wrong';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      dispatch({ type: 'AUTH_FAIL', payload: errorMessage });
      throw error;
    }
  };

  // Step 2: Complete login after OTP verification
  const completeLogin = async (authResponse) => {
    try {
      dispatch({ type: 'AUTH_SUCCESS', payload: authResponse.user });
      toast.success('Login successful!');
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL', payload: error.message });
      throw error;
    }
  };

  // Register new user
  const register = async (userData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.register(userData);
      dispatch({ type: 'AUTH_SUCCESS', payload: response.user });
      toast.success('Registration successful! Welcome to MySpot!');
      return response;
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL', payload: error.message });
      throw error;
    }
  };

  // FIXED LOGOUT FUNCTION
// FIND this existing logout function and REPLACE it with:
const logout = async () => {
  try {
    // Call the logout service to invalidate tokens on server
    await authService.logout();
  } catch (error) {
    console.error('Logout service error:', error);
    // Continue with logout even if service fails
  } finally {
    // Always clear local state and tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch({ type: 'AUTH_LOGOUT' });
    toast.success('Logged out successfully!');
    
    // CHANGE THIS LINE: Navigate to logout page instead of login
    window.location.href = '/logout'; // Changed from '/login' to '/logout'
  }
};


  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    completeLogin,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};