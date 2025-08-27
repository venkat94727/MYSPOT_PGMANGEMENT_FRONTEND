
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';

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

  // Step 1: Login (sends OTP)
  const login = async (credentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const response = await authService.login(credentials);
      dispatch({ type: 'OTP_SENT', payload: response });
      toast.success('OTP sent to your email!');
      return response;
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL', payload: error.message });
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

  const logout = () => {
    authService.logout();
    dispatch({ type: 'AUTH_LOGOUT' });
    toast.success('Logged out successfully!');
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