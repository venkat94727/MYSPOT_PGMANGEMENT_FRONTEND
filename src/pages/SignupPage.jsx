import React, { useState, useEffect } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button, Grid, MenuItem,
  FormControlLabel, Checkbox, Alert, CircularProgress,
  IconButton, InputAdornment, Stepper, Step, StepLabel, Divider
} from '@mui/material';
import {
  Visibility, VisibilityOff, Person, Email, Phone, Lock, Business, LocationOn
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema, otpSchema } from '@/utils/validation';
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import ProfilePictureUpload from '@/components/ProfilePictureUpload';

const steps = ['Registration', 'OTP Verification', 'Complete'];

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
  'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh'
];

const SignupPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');
  const [registeredUserId, setRegisteredUserId] = useState(null);

  const registrationForm = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      pgName: '',
      ownerName: '',
      emailAddress: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      city: '',
      state: '',
      country: 'India',
      pincode: '',
      latitude: '',
      longitude: '',
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

  const handleProfilePictureSelected = (file, previewUrl) => {
    setSelectedProfileFile(file);
    setProfilePreview(previewUrl);
    console.log('📸 Profile picture selected:', file.name);
  };

  const handleProfilePictureDeleted = () => {
    setSelectedProfileFile(null);
    setProfilePreview('');
  };

  // 🔄 UPDATED handleRegistration function with FormData
  const handleRegistration = async (data) => {
    console.log('🎉 HANDLE REGISTRATION CALLED!');
    
    try {
      setIsLoading(true);
      setError('');

      // Create FormData object for file upload support
      const formData = new FormData();
      
      // Add all form fields to FormData (matching your backend @RequestParam names)
      formData.append('pgName', data.pgName?.trim() || '');
      formData.append('ownerName', data.ownerName?.trim() || '');
      formData.append('emailAddress', data.emailAddress?.trim() || '');
      formData.append('phoneNumber', data.phoneNumber?.trim() || '');
      formData.append('password', data.password || '');
      formData.append('confirmPassword', data.confirmPassword || '');
      formData.append('city', data.city?.trim() || '');
      formData.append('state', data.state?.trim() || '');
      formData.append('country', data.country?.trim() || 'India');
      formData.append('pincode', data.pincode?.trim() || '');
      
      // Handle optional numeric fields
      if (data.latitude && !isNaN(parseFloat(data.latitude))) {
        formData.append('latitude', parseFloat(data.latitude).toString());
      }
      if (data.longitude && !isNaN(parseFloat(data.longitude))) {
        formData.append('longitude', parseFloat(data.longitude).toString());
      }

      // Add profile picture file if selected
      if (selectedProfileFile) {
        formData.append('profilePicture', selectedProfileFile);
        console.log('📸 Including profile picture:', selectedProfileFile.name, selectedProfileFile.size, 'bytes');
      }

      // Debug: Log FormData contents (for debugging)
      console.log('🚀 FormData contents:');
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key + ': File(' + value.name + ', ' + value.size + ' bytes, ' + value.type + ')');
        } else {
          console.log(key + ': ' + value);
        }
      }

      console.log('🚀 Registering user with FormData...');
      const response = await authService.registerWithFile(formData);
      console.log('✅ Registration successful:', response);

      // Extract data from response structure
      const responseData = response.data || response;
      
      setRegisteredUserId(responseData.pgId);
      setUserEmail(data.emailAddress);
      setActiveStep(1);
      setCountdown(60);
      
      if (selectedProfileFile) {
        toast.success('Registration and profile picture upload successful!');
      } else {
        toast.success('Registration successful! Please check your email for OTP.');
      }

      // Log profile picture URL if available
      if (responseData.profilePictureUrl) {
        console.log('📸 Profile picture URL:', responseData.profilePictureUrl);
      }
      
    } catch (err) {
      console.error('❌ Registration failed:', err);
      
      if (err.response?.status === 400) {
        const responseData = err.response.data;
        if (responseData?.message) {
          setError(responseData.message);
        } else {
          setError('Please check your form data and try again.');
        }
      } else if (err.response?.status === 409) {
        const errorMessage = err.response.data?.message || '';
        if (errorMessage.toLowerCase().includes('email')) {
          setError('Email address already exists');
        } else if (errorMessage.toLowerCase().includes('mobile') || errorMessage.toLowerCase().includes('phone')) {
          setError('Phone number already exists');
        } else {
          setError('Email or phone number already exists');
        }
      } else {
        setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await authService.verifyEmailOtp({ emailAddress: userEmail, otp: data.otp });
      console.log('✅ OTP verified, user authenticated:', response);
      
      setActiveStep(2);
      toast.success('Email verified successfully!');

      setTimeout(() => {
        navigate('/login');
        toast.success('Please login with your credentials');
      }, 2000);
      
    } catch(err) {
      console.error('❌ OTP verification failed:', err);
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

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Profile Picture (Optional)
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ProfilePictureUpload
            currentImageUrl={profilePreview}
            onFileSelected={handleProfilePictureSelected}
            onImageDeleted={handleProfilePictureDeleted}
            mode="signup"
            size={120}
            disabled={isLoading}
            showActions={true}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
          Your profile picture will be uploaded during registration
        </Typography>
        <Divider sx={{ my: 3 }} />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="pgName"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="PG Name *" 
                error={!!registrationForm.formState.errors.pgName} 
                helperText={registrationForm.formState.errors.pgName?.message}
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business color="primary" />
                    </InputAdornment>
                  ) 
                }} 
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Controller
            name="ownerName"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Owner Name *" 
                error={!!registrationForm.formState.errors.ownerName} 
                helperText={registrationForm.formState.errors.ownerName?.message}
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ) 
                }} 
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="emailAddress"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Email Address *" 
                type="email" 
                error={!!registrationForm.formState.errors.emailAddress} 
                helperText={registrationForm.formState.errors.emailAddress?.message}
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ) 
                }} 
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="phoneNumber"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Phone Number *" 
                placeholder="+91XXXXXXXXXX"
                error={!!registrationForm.formState.errors.phoneNumber} 
                helperText={registrationForm.formState.errors.phoneNumber?.message}
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ) 
                }} 
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="password"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Password *" 
                type={showPassword ? 'text' : 'password'} 
                error={!!registrationForm.formState.errors.password} 
                helperText={registrationForm.formState.errors.password?.message}
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
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="confirmPassword"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Confirm Password *" 
                type={showConfirmPassword ? 'text' : 'password'} 
                error={!!registrationForm.formState.errors.confirmPassword} 
                helperText={registrationForm.formState.errors.confirmPassword?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }} 
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="City *" 
                error={!!registrationForm.formState.errors.city} 
                helperText={registrationForm.formState.errors.city?.message}
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="primary" />
                    </InputAdornment>
                  ) 
                }} 
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="state"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                select
                fullWidth 
                label="State *" 
                error={!!registrationForm.formState.errors.state} 
                helperText={registrationForm.formState.errors.state?.message}
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="primary" />
                    </InputAdornment>
                  ) 
                }} 
              >
                {indianStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="country"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Country *" 
                disabled
                error={!!registrationForm.formState.errors.country} 
                helperText={registrationForm.formState.errors.country?.message}
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="primary" />
                    </InputAdornment>
                  ) 
                }} 
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="pincode"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Pincode *" 
                error={!!registrationForm.formState.errors.pincode} 
                helperText={registrationForm.formState.errors.pincode?.message}
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="primary" />
                    </InputAdornment>
                  ) 
                }} 
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="latitude"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Latitude" 
                type="number" 
                placeholder="-90 to 90"
                error={!!registrationForm.formState.errors.latitude} 
                helperText={registrationForm.formState.errors.latitude?.message}
                inputProps={{ step: "any", min: -90, max: 90 }} 
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Controller
            name="longitude"
            control={registrationForm.control}
            render={({ field }) => (
              <TextField 
                {...field} 
                fullWidth 
                label="Longitude" 
                type="number" 
                placeholder="-180 to 180"
                error={!!registrationForm.formState.errors.longitude} 
                helperText={registrationForm.formState.errors.longitude?.message}
                inputProps={{ step: "any", min: -180, max: 180 }} 
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Controller
          name="acceptTerms"
          control={registrationForm.control}
          render={({ field }) => (
            <FormControlLabel 
              control={<Checkbox {...field} checked={field.value} />} 
              label="I agree to the Terms of Service and Privacy Policy *" 
            />
          )}
        />
        {registrationForm.formState.errors.acceptTerms && (
          <Typography variant="caption" color="error" sx={{ ml: 4 }}>
            {registrationForm.formState.errors.acceptTerms.message}
          </Typography>
        )}
      </Box>

      <Button 
        type="submit" 
        fullWidth 
        variant="contained" 
        size="large" 
        disabled={isLoading} 
        sx={{ mt: 3 }}
      >
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
            inputProps={{ 
              maxLength: 6, 
              style: { 
                textAlign: 'center', 
                fontSize: '1.5rem', 
                letterSpacing: '0.5rem' 
              } 
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
        {isLoading ? <CircularProgress size={24} /> : 'Verify Email'}
      </Button>

      <Box textAlign="center">
        {countdown > 0 ? (
          <Typography variant="body2" color="text.secondary">
            Resend OTP in {countdown}s
          </Typography>
        ) : (
          <Button variant="text" onClick={handleResendOtp}>
            Resend OTP
          </Button>
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
        {selectedProfileFile 
          ? "Your email has been verified and profile picture uploaded successfully!"
          : "Your email has been verified successfully!"
        }
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Redirecting to login...
      </Typography>
      <CircularProgress sx={{ mt: 2 }} />
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      py: 4 
    }}>
      <Container maxWidth="md">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={24} sx={{ p: 4, borderRadius: 3 }}>
            <Box textAlign="center" sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                background: 'linear-gradient(45deg, #2196F3, #21CBF3)', 
                backgroundClip: 'text', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                mb: 1 
              }}>
                🏠 MySpot
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                Create Your PG Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Register your PG with MySpot
              </Typography>
            </Box>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && renderRegistrationStep()}
            {activeStep === 1 && renderOtpStep()}
            {activeStep === 2 && renderCompletionStep()}

            {activeStep === 0 && (
              <Box textAlign="center" sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Button 
                    variant="text" 
                    onClick={() => navigate('/login')} 
                    sx={{ fontWeight: 600 }}
                  >
                    Sign In
                  </Button>
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