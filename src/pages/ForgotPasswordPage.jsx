// src/pages/ForgotPasswordPage.jsx

import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { Email, ArrowBack } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// Validation schema matching ForgotPasswordRequest DTO
const forgotPasswordSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email address is required')
});

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      emailAddress: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      await authService.forgotPassword(data);
      setSuccess(true);
      toast.success('Password reset instructions sent to your email!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 4
        }}
      >
        <Container maxWidth="sm">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Paper elevation={24} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontSize: 48, mb: 1, color: 'primary.main' }}>
                📧
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Check Your Email
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We've sent password reset instructions to your email. Please check your inbox.
              </Typography>
              <Button variant="contained" onClick={() => navigate('/login')} sx={{ mr: 2 }}>
                Back to Login
              </Button>
              <Button variant="outlined" onClick={() => setSuccess(false)}>
                Resend Email
              </Button>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Paper elevation={24} sx={{ p: 4, borderRadius: 3 }}>
            <Box textAlign="center" sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                🏠 MySpot
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Forgot Password?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter your email and we'll send reset instructions.
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

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
                    sx={{ mb: 3 }}
                  />
                )}
              />

              <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading} sx={{ mb: 2, py: 1.5 }}>
                {isLoading ? <CircularProgress size={24} /> : 'Send Reset Instructions'}
              </Button>

              <Button fullWidth variant="text" startIcon={<ArrowBack />} onClick={() => navigate('/login')}>
                Back to Login
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
