import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Login validation schema
const loginSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email address is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean()
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, clearError, completeLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // ← Error under button

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
      rememberMe: false
    }
  });

  React.useEffect(() => {
    if (clearError) clearError();
    setErrorMessage(''); // Clear error when component loads
  }, [clearError]);

  const onSubmit = async (data) => {
    try {
      setErrorMessage(''); // Clear previous error

      const authResponse = await login({
        emailAddress: data.emailAddress,
        password: data.password,
        rememberMe: data.rememberMe
      });

      localStorage.setItem('accessToken', authResponse.accessToken);
      localStorage.setItem('refreshToken', authResponse.refreshToken);

      await completeLogin(authResponse);
      navigate('/dashboard/overview');
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error response:', err.response);

      if (err.response?.status === 401) {
        setErrorMessage('Email and password are wrong');
        console.log('Error message set:', 'Email and password are wrong');
      } else if (err.response?.status === 403) {
        setErrorMessage('Access forbidden. Please check your credentials or contact support.');
        console.log('Error message set:', 'Access forbidden. Please check your credentials or contact support.');
      } else if (err.response?.status === 404) {
        setErrorMessage('Account not found');
        console.log('Error message set:', 'Account not found');
      } else {
        setErrorMessage('Login failed. Please try again.');
        console.log('Error message set:', 'Login failed. Please try again.');
      }
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={24} sx={{ p: 4, borderRadius: 3 }}>
            {/* Header */}
            <Box textAlign="center" sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                🏠 MySpot
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to your MySpot account
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <Controller
                name="emailAddress"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    error={!!errors.emailAddress}
                    helperText={errors.emailAddress?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 2 }}
                  />
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 2 }}
                  />
                )}
              />

              {/* Remember Me & Forgot Password */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Remember me"
                    />
                  )}
                />
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleForgotPassword}
                  type="button"
                >
                  Forgot Password?
                </Link>
              </Box>

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mb: 1, py: 1.5 }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>

              {/* ✅ ERROR MESSAGE UNDER LOGIN BUTTON */}
              {errorMessage && (
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'error.main',
                      fontWeight: 500,
                      mt: 1
                    }}
                  >
                    {errorMessage}
                  </Typography>
                </Box>
              )}

              {/* Signup Link */}
              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Button
                    variant="text"
                    onClick={() => navigate('/signup')}
                    sx={{ fontWeight: 600 }}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;