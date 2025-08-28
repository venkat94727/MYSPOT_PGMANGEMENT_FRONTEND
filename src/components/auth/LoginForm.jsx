// src/components/auth/LoginForm.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
  Divider,
  Alert,
  CircularProgress,
  Typography
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Facebook
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { OtpVerificationForm } from './OtpVerificationForm'; // ← FIXED: Named import

// Validation schema matching CustomerLoginRequest DTO
const loginSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email address is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean()
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, completeLogin, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');

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

  useEffect(() => {
    clearError();
  }, [clearError]);

  const onSubmit = async (data) => {
    try {
      // Step 1: login to send OTP
      await login({
        emailAddress: data.emailAddress,
        password: data.password,
        rememberMe: data.rememberMe
      });
      setUserEmail(data.emailAddress);
      setShowOtpForm(true);
    } catch {
      // handled by context
    }
  };

  const handleOtpVerification = async (authResponse) => {
  await completeLogin(authResponse);
  
  // UPDATED: Navigate to dashboard instead of dashboard
  navigate('/dashboard/overview');
};
  const handleBack = () => {
    setShowOtpForm(false);
    setUserEmail('');
  };

  if (showOtpForm) {
    return (
      <OtpVerificationForm
        email={userEmail}
        otpType="LOGIN_VERIFICATION"
        onVerificationSuccess={handleOtpVerification}
        onBack={handleBack}
      />
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Remember me" />
          )}
        />
        <Link component="button" variant="body2" onClick={() => navigate('/forgot-password')}>
          Forgot Password?
        </Link>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{ mb: 2, py: 1.5 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>

      <Divider sx={{ mb: 2 }}>
        <Box component="span" sx={{ px: 2, color: 'text.secondary' }}>
          or continue with
        </Box>
      </Divider>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button fullWidth variant="outlined" startIcon={<Google />}>
          Google
        </Button>
        <Button fullWidth variant="outlined" startIcon={<Facebook />}>
          Facebook
        </Button>
      </Box>

      <Box textAlign="center">
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{' '}
        </Typography>
        <Link component="button" variant="body1" onClick={() => navigate('/signup')} sx={{ fontWeight: 600 }}>
          Sign up
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
