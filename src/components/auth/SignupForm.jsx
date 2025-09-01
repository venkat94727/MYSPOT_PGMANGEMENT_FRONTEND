/* -------------------------------------------------------------------
   PG-OWNER SIGN-UP PAGE
   ------------------------------------------------------------------- */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Typography,
  MenuItem
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Business,
  Lock,
  LocationCity,
  Public,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/utils/validation';          // ← PG schema
import { authService } from '@/services/authService';      // ← PG mapping
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
  'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh'
];

export default function SignupPage() {
  const navigate  = useNavigate();
  const [showPw, setShowPw]                 = useState(false);
  const [showConf, setShowConf]             = useState(false);
  const [loading, setLoading]               = useState(false);
  const [errorMsg, setErrorMsg]             = useState('');

  /* ------------------------------------------------------------------
     React-Hook-Form setup
  ------------------------------------------------------------------ */
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      pgName: '',
      ownerName: '',
      pgProfilePicture: '',
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
      acceptTerms: false
    }
  });

  /* ------------------------------------------------------------------
     Submit handler
  ------------------------------------------------------------------ */
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorMsg('');

      /* Parse numeric fields so Spring accepts them as BigDecimal -------- */
      const payload = {
        ...data,
        latitude : data.latitude  ? parseFloat(data.latitude)  : undefined,
        longitude: data.longitude ? parseFloat(data.longitude) : undefined
      };
      /* ----------------------------------------------------------------- */

      await authService.register(payload);
      toast.success('Registration successful! Check your email for OTP.');
      reset();                    // clear the form
      navigate('/verify-email');  // adjust if your route is different
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Registration failed – please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------
     Render helpers
  ------------------------------------------------------------------ */
  const adorn = (icon) => (
    <InputAdornment position="start">{icon}</InputAdornment>
  );

  /* ------------------------------------------------------------------
     JSX
  ------------------------------------------------------------------ */
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 650, mx: 'auto', p: 3 }}
      noValidate
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Register Your PG
      </Typography>

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}

      <Grid container spacing={2}>
        {/* PG Name ------------------------------------------------------ */}
        <Grid item xs={12}>
          <Controller
            name="pgName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="PG / Property Name *"
                error={!!errors.pgName}
                helperText={errors.pgName?.message}
                InputProps={ { startAdornment: adorn(<Business />) } }
              />
            )}
          />
        </Grid>

        {/* Owner Name --------------------------------------------------- */}
        <Grid item xs={12}>
          <Controller
            name="ownerName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Owner Name *"
                error={!!errors.ownerName}
                helperText={errors.ownerName?.message}
                InputProps={ { startAdornment: adorn(<Person />) } }
              />
            )}
          />
        </Grid>

        {/* Email + Phone ---------------------------------------------- */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="emailAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email Address *"
                type="email"
                error={!!errors.emailAddress}
                helperText={errors.emailAddress?.message}
                InputProps={ { startAdornment: adorn(<Email />) } }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone Number *"
                placeholder="+91XXXXXXXXXX"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                InputProps={ { startAdornment: adorn(<Phone />) } }
              />
            )}
          />
        </Grid>

        {/* Password ----------------------------------------------------- */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password *"
                type={showPw ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: adorn(<Lock />),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPw(!showPw)}>
                        {showPw ? <VisibilityOff /> : <Visibility />}
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
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Confirm Password *"
                type={showConf ? 'text' : 'password'}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  startAdornment: adorn(<Lock />),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConf(!showConf)}>
                        {showConf ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>

        {/* Location ----------------------------------------------------- */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="City *"
                error={!!errors.city}
                helperText={errors.city?.message}
                InputProps={ { startAdornment: adorn(<LocationCity />) } }
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
                select
                fullWidth
                label="State *"
                error={!!errors.state}
                helperText={errors.state?.message}
                InputProps={ { startAdornment: adorn(<Public />) } }
              >
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
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Country *"
                disabled          // always India, adjust if needed
                InputProps={ { startAdornment: adorn(<Public />) } }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="pincode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Pincode *"
                error={!!errors.pincode}
                helperText={errors.pincode?.message}
              />
            )}
          />
        </Grid>

        {/* Co-ordinates (optional) ------------------------------------- */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Latitude"
                placeholder="-90 to 90"
                error={!!errors.latitude}
                helperText={errors.latitude?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Longitude"
                placeholder="-180 to 180"
                error={!!errors.longitude}
                helperText={errors.longitude?.message}
              />
            )}
          />
        </Grid>

        {/* Terms -------------------------------------------------------- */}
        <Grid item xs={12}>
          <Controller
            name="acceptTerms"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="I agree to the Terms of Service and Privacy Policy *"
              />
            )}
          />
          {errors.acceptTerms && (
            <Typography variant="caption" color="error">
              {errors.acceptTerms.message}
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Submit Button -------------------------------------------------- */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={22} /> : 'Create Account'}
      </Button>
    </Box>
  );
}