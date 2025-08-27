import React, { useState, useEffect } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button, Grid, MenuItem,
  FormControlLabel, Checkbox, Alert, CircularProgress,
  IconButton, InputAdornment, Stepper, Step, StepLabel
} from '@mui/material';
import {
  Visibility, VisibilityOff, Person, Email, Phone, Lock, Cake
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema, otpSchema } from '@/utils/validation';
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const steps = ['Registration', 'OTP Verification', 'Complete'];

const SignupPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [countdown, setCountdown] = useState(0);

  const registrationForm = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      gender: 'MALE',
      acceptTerms: false,
    },
  });

  const otpForm = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  useEffect(() => {
    if(countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleRegistration = async (data) => {
    try {
      setIsLoading(true);
      setError('');

      const registrationData = {
        fullName: data.fullName,
        emailAddress: data.email,
        mobileNumber: data.mobile,
        password: data.password,
        confirmPassword: data.confirmPassword,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        acceptTerms: data.acceptTerms,
        country: 'India',
        preferredLanguage: 'en',
        marketingConsent: false,
      };

      await authService.register(registrationData);

      setUserEmail(data.email);
      setActiveStep(1);
      setCountdown(60);
      toast.success('Registration successful! Please check your email for OTP.');
    } catch (err) {
      if(err.response?.status === 409) {
        const errors = err.response.data?.errors || {};
        const messages = [];
        if(errors.emailAddress || (err.response.data?.message && err.response.data.message.toLowerCase().includes('email'))) {
          messages.push('Email');
        }
        if(errors.mobileNumber || (err.response.data?.message && err.response.data.message.toLowerCase().includes('mobile'))) {
          messages.push('Phone number');
        }
        if(messages.length === 2) {
          setError('Email and Phone number already existed');
        } else if(messages.length === 1) {
          setError(`${messages[0]} already exists`);
        } else {
          setError(err.response.data?.message || 'Email and Phone number already existed');
        }
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      
      await authService.verifyEmailOtp({ emailAddress: userEmail, otp: data.otp });
      
      setActiveStep(2);
      toast.success('Email verified successfully!');

      setTimeout(() => {
        navigate('/login');
        toast.success('Please login with your credentials');
      }, 2000);
    } catch(err) {
      if(err.response?.status === 400) {
        setError('Invalid OTP. Please try again.');
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setError('');
      await authService.resendOtp(userEmail, 'EMAIL_VERIFICATION');
      setCountdown(60);
      toast.success('OTP resent successfully!');
    } catch(err) {
      setError(err.message);
    }
  };

  const renderRegistrationStep = () => (
    <Box component="form" onSubmit={registrationForm.handleSubmit(handleRegistration)}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="fullName"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Full Name *" error={!!registrationForm.formState.errors.fullName} helperText={registrationForm.formState.errors.fullName?.message}
                InputProps={{ startAdornment: (<InputAdornment position="start"><Person color="primary" /></InputAdornment>) }} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Email Address *" type="email" error={!!registrationForm.formState.errors.email} helperText={registrationForm.formState.errors.email?.message}
                InputProps={{ startAdornment: (<InputAdornment position="start"><Email color="primary" /></InputAdornment>) }} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="mobile"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Mobile Number *" error={!!registrationForm.formState.errors.mobile} helperText={registrationForm.formState.errors.mobile?.message}
                InputProps={{ startAdornment: (<InputAdornment position="start"><Phone color="primary" /></InputAdornment>) }} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="dateOfBirth"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Date of Birth *" type="date" error={!!registrationForm.formState.errors.dateOfBirth} helperText={registrationForm.formState.errors.dateOfBirth?.message}
                InputLabelProps={{ shrink: true }} InputProps={{ startAdornment: (<InputAdornment position="start"><Cake color="primary" /></InputAdornment>) }} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="gender"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField {...field} fullWidth select label="Gender *" error={!!registrationForm.formState.errors.gender} helperText={registrationForm.formState.errors.gender?.message}>
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="password"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Password *" type={showPassword ? 'text' : 'password'} error={!!registrationForm.formState.errors.password} helperText={registrationForm.formState.errors.password?.message}
                InputProps={{
                  startAdornment: (<InputAdornment position="start"><Lock color="primary" /></InputAdornment>),
                  endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)
                }} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="confirmPassword"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Confirm Password *" type={showConfirmPassword ? 'text' : 'password'} error={!!registrationForm.formState.errors.confirmPassword} helperText={registrationForm.formState.errors.confirmPassword?.message}
                InputProps={{
                  startAdornment: (<InputAdornment position="start"><Lock color="primary" /></InputAdornment>),
                  endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">{showConfirmPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>)
                }} />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Controller
          name="acceptTerms"
          control={registrationForm.control}
          render={({ field }) => (
            <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="I agree to the Terms of Service and Privacy Policy *" />
          )}
        />
        {registrationForm.formState.errors.acceptTerms && (
          <Typography variant="caption" color="error" sx={{ ml: 4 }}>
            {registrationForm.formState.errors.acceptTerms.message}
          </Typography>
        )}
      </Box>

      <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading} sx={{ mt: 3 }}>
        {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
      </Button>
    </Box>
  );

  const renderOtpStep = () => (
    <Box component="form" onSubmit={otpForm.handleSubmit(handleOtpVerification)}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box textAlign="center" sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Verify Your Email
        </Typography>
        <Typography variant="body2" color="text.secondary">
          We've sent a 6-digit code to
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {userEmail}
        </Typography>
      </Box>

      <Controller
        name="otp"
        control={otpForm.control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Enter 6-digit OTP"
            error={!!otpForm.formState.errors.otp}
            helperText={otpForm.formState.errors.otp?.message}
            inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' } }}
            sx={{ mb: 3 }}
            autoFocus
          />
        )}
      />

      <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading} sx={{ mb: 2 }}>
        {isLoading ? <CircularProgress size={24} /> : 'Verify Email'}
      </Button>

      <Box textAlign="center">
        {countdown > 0 ? (
          <Typography variant="body2" color="text.secondary">Resend OTP in {countdown}s</Typography>
        ) : (
          <Button variant="text" onClick={handleResendOtp}>Resend OTP</Button>
        )}
      </Box>
    </Box>
  );

  const renderCompletionStep = () => (
    <Box textAlign="center">
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
        🎉 Registration Complete!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Your email has been verified successfully. Redirecting to login...
      </Typography>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', py: 4 }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Paper elevation={24} sx={{ p: 4, borderRadius: 3 }}>
            <Box textAlign="center" sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, background: 'linear-gradient(45deg, #2196F3, #21CBF3)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 1 }}>
                🏠 MySpot
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>Create Your Account</Typography>
              <Typography variant="body1" color="text.secondary">Join MySpot and find your perfect PG</Typography>
            </Box>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>

            {activeStep === 0 && renderRegistrationStep()}
            {activeStep === 1 && renderOtpStep()}
            {activeStep === 2 && renderCompletionStep()}

            {activeStep === 0 && (
              <Box textAlign="center" sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Button variant="text" onClick={() => navigate('/login')} sx={{ fontWeight: 600 }}>Sign In</Button>
                </Typography>
              </Box>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SignupPage;
