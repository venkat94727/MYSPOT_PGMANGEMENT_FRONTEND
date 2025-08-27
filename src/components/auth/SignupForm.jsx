
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
  Grid,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Person,
  Email,
  Phone,
  Lock,
  LocationCity,
  Public,
  Cake,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/utils/validation';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { toast } from 'react-toastify';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

const SignupForm = () => {
  const navigate = useNavigate();
  const { register: authRegister, isLoading: contextLoading, error: contextError, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      gender: 'MALE',
      city: '',
      state: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      marketingConsent: false,
      acceptTerms: false,
    },
  });

  useEffect(() => {
    if (clearError) clearError();
  }, [clearError]);

  // ✅ UPDATED: Direct customer registration (no PG mapping needed)
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      
      console.log('📝 Customer registration form data:', data);

      // Prepare data for CustomerRegistrationRequest (direct mapping)
      const registrationData = {
        fullName: data.fullName?.trim(),
        emailAddress: data.email?.trim(),
        mobileNumber: data.mobile?.trim(),
        password: data.password,
        confirmPassword: data.confirmPassword,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        acceptTerms: data.acceptTerms,
        country: 'India',
        preferredLanguage: 'en',
        marketingConsent: data.marketingConsent || false,
        
        // Optional fields
        ...(data.city?.trim() && { city: data.city.trim() }),
        ...(data.state && { state: data.state }),
        ...(data.emergencyContactName?.trim() && {
          emergencyContactName: data.emergencyContactName.trim(),
        }),
        ...(data.emergencyContactNumber?.trim() && {
          emergencyContactNumber: data.emergencyContactNumber.trim(),
        }),
      };

      console.log('🚀 Customer registration payload:', registrationData);

      // For customer registration, we need a different method or endpoint
      // Option 1: Use context-based registration if available
      if (authRegister) {
        await authRegister(registrationData);
        navigate('/dashboard');
      } else {
        // Option 2: Use direct API call for customer registration
        // Note: You'll need a /customer-auth/register endpoint or modify the existing one
        const response = await authService.register(registrationData);
        console.log('✅ Customer registration successful:', response);
        toast.success('Registration successful! Please verify your email.');
        navigate('/verify-email');
      }
      
    } catch (err) {
      console.error('❌ Customer registration failed:', err);
      console.error('Error response:', err.response?.data);
      
      // Enhanced error handling
      if (err.response?.status === 400) {
        const responseData = err.response.data;
        
        if (responseData?.data && typeof responseData.data === 'object') {
          const errorMessages = Object.values(responseData.data);
          setError(`Validation errors: ${errorMessages.join(', ')}`);
        } else if (responseData?.message) {
          setError(responseData.message);
        } else {
          setError('Please check your form data and try again.');
        }
      } else if (err.response?.status === 409) {
        const errorMessage = err.response.data?.message || '';
        if (errorMessage.toLowerCase().includes('email')) {
          setError('Email address already exists');
        } else if (errorMessage.toLowerCase().includes('mobile') || errorMessage.toLowerCase().includes('phone')) {
          setError('Mobile number already exists');
        } else {
          setError('Email or mobile number already exists');
        }
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.code === 'NETWORK_ERROR' || !err.response) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const displayError = error || contextError;
  const displayLoading = isLoading || contextLoading;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {displayError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {displayError}
        </Alert>
      )}

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
        Required Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Full Name *"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email Address *"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Mobile Number *"
                placeholder="e.g., 9876543210"
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Date of Birth *"
                type="date"
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake color="primary" />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  max: new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18)
                  )
                    .toISOString()
                    .split('T')[0],
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="Gender *"
                error={!!errors.gender}
                helperText={errors.gender?.message}
              >
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
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password *"
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
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Confirm Password *"
                type={showConfirmPassword ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Additional Information (Optional)
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="City"
                error={!!errors.city}
                helperText={errors.city?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCity color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="State"
                error={!!errors.state}
                helperText={errors.state?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Public color="primary" />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">Select State</MenuItem>
                {indianStates.map((st) => (
                  <MenuItem key={st} value={st}>
                    {st}
                  </MenuItem>
                ))}
              </TextField>
            )} 
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="emergencyContactName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Emergency Contact Name"
                error={!!errors.emergencyContactName}
                helperText={errors.emergencyContactName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="emergencyContactNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Emergency Contact Number"
                placeholder="e.g., 9876543210"
                error={!!errors.emergencyContactNumber}
                helperText={errors.emergencyContactNumber?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Controller
          name="marketingConsent"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="I want to receive updates and promotional emails from MySpot"
            />
          )}
        />

        <Controller
          name="acceptTerms"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label={
                <Box>
                  I agree to the{' '}
                  <Link href="#" underline="hover">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" underline="hover">
                    Privacy Policy
                  </Link>{' '}
                  *
                </Box>
              }
            />
          )}
        />
        {errors.acceptTerms && (
          <Typography variant="caption" color="error" sx={{ ml: 4 }}>
            {errors.acceptTerms.message}
          </Typography>
        )}
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={displayLoading}
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        {displayLoading ? <CircularProgress size={24} /> : 'Create Account'}
      </Button>

      <Divider sx={{ mb: 2 }}>
        <Box component="span" sx={{ px: 2, color: 'text.secondary' }}>
          or sign up with
        </Box>
      </Divider>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          onClick={() => console.log('Google signup')}
        >
          Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Facebook />}
          onClick={() => console.log('Facebook signup')}
        >
          Facebook
        </Button>
      </Box>

      <Box textAlign="center">
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
        </Typography>
        <Link
          component="button"
          variant="body1"
          onClick={() => navigate('/login')}
          sx={{ fontWeight: 600 }}
        >
          Sign in
        </Link>
      </Box>
    </Box>
  );
};

export default SignupForm;
