// src/components/auth/OtpVerificationForm.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';

// Validation schema for OTP
const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits')
    .required('OTP is required'),
});

export function OtpVerificationForm({
  email,
  otpType,
  onVerificationSuccess,
  onBack
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: '' }
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      if (otpType === 'LOGIN_VERIFICATION') {
        const response = await authService.verifyLoginOtp({
          emailAddress: email,
          otp: data.otp
        });
        onVerificationSuccess(response);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      setError(null);

      await authService.resendOtp(email, otpType);
      setCountdown(60);
      toast.success('OTP resent successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Box>
      <Box textAlign="center" sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Enter Verification Code
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We've sent a 6-digit code to
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {email}
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Enter 6-digit OTP"
              error={!!errors.otp}
              helperText={errors.otp?.message}
              inputProps={{
                maxLength: 6,
                style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }
              }}
              sx={{ mb: 3 }}
              autoFocus
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{ mb: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Verify OTP'}
        </Button>
      </form>

      <Box textAlign="center" sx={{ mb: 2 }}>
        {countdown > 0 ? (
          <Typography variant="body2" color="text.secondary">
            Resend OTP in {countdown}s
          </Typography>
        ) : (
          <Link component="button" variant="body2" onClick={handleResendOtp} disabled={isResending}>
            {isResending ? 'Sending...' : 'Resend OTP'}
          </Link>
        )}
      </Box>

      <Box textAlign="center">
        <Link component="button" variant="body2" onClick={onBack}>
          ← Back to Login
        </Link>
      </Box>
    </Box>
  );
}
