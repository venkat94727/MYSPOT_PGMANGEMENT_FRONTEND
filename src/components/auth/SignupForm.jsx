
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

const SignupForm = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    clearError();
  }, [clearError]);

  // FIXED: Transform form data to match backend DTO exactly
  const onSubmit = async (data) => {
    const registrationData = {
      // Required fields - exactly matching backend DTO
      fullName: data.fullName,
      emailAddress: data.email,              // Frontend uses 'email', backend expects 'emailAddress'
      mobileNumber: data.mobile,             // Frontend uses 'mobile', backend expects 'mobileNumber'
      password: data.password,
      confirmPassword: data.confirmPassword,
      dateOfBirth: data.dateOfBirth,         // Already in YYYY-MM-DD format for LocalDate
      gender: data.gender,                   // MALE/FEMALE/OTHER - matches enum
      acceptTerms: data.acceptTerms,         // Must be true for validation
      
      // Optional fields - only send if they have values
      ...(data.city && data.city.trim() && { city: data.city.trim() }),
      ...(data.state && data.state.trim() && { state: data.state.trim() }),
      
      // Default values for backend
      country: "India",                      // Default country
      preferredLanguage: "en",               // Default language
      marketingConsent: data.marketingConsent || false,
      
      // Emergency contact - only send if provided
      ...(data.emergencyContactName && data.emergencyContactName.trim() && { 
        emergencyContactName: data.emergencyContactName.trim() 
      }),
      ...(data.emergencyContactNumber && data.emergencyContactNumber.trim() && { 
        emergencyContactNumber: data.emergencyContactNumber.trim() 
      }),
    };

    // Debug: Log the data being sent
    console.log('Form data from user:', data);
    console.log('Transformed registration data for backend:', JSON.stringify(registrationData, null, 2));

    try {
      await register(registrationData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // Error is handled by AuthContext
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Required Information */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
        Required Information
      </Typography>

      <Grid container spacing={2}>
        {/* Full Name */}
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

        {/* Email */}
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

        {/* Mobile */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Mobile Number *"
                placeholder="e.g., 9876543210 or +919876543210"
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

        {/* Date of Birth */}
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
                helperText={errors.dateOfBirth?.message || "You must be at least 18 years old"}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake color="primary" />
                    </InputAdornment>
                  ),
                }}
                // Set max date to 18 years ago
                inputProps={{
                  max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]
                }}
              />
            )}
          />
        </Grid>

        {/* Gender */}
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

        {/* Password */}
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
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Confirm Password */}
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
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

      {/* Optional Information */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Additional Information (Optional)
      </Typography>

      <Grid container spacing={2}>
        {/* City */}
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

        {/* State */}
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
                {indianStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {/* Emergency Contact Name */}
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

        {/* Emergency Contact Number */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="emergencyContactNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Emergency Contact Number"
                placeholder="e.g., 9876543210 or +919876543210"
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

      {/* Checkboxes */}
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

      {/* Sign Up Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
      </Button>

      <Divider sx={{ mb: 2 }}>
        <Box component="span" sx={{ px: 2, color: 'text.secondary' }}>
          or sign up with
        </Box>
      </Divider>

      {/* Social Signup Buttons */}
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

      {/* Sign In Link */}
      <Box textAlign="center">
        <Box component="span" sx={{ color: 'text.secondary' }}>
          Already have an account?{' '}
        </Box>
        <Link
          component="button"
          type="button"
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