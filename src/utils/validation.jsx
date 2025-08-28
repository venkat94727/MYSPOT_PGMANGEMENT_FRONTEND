import * as yup from 'yup';

// Login validation - matches backend
export const loginSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .required('Password is required'),
});

// ✅ EXACT MATCH: PG Registration validation - matches PGRegistrationRequest exactly
export const signupSchema = yup.object().shape({
  // Owner Details
  pgName: yup
    .string()
    .max(200, 'PG name must not exceed 200 characters')
    .required('PG name is required'),
  
  ownerName: yup
    .string()
    .max(100, 'Owner name must not exceed 100 characters')
    .required('Owner name is required'),
  
  pgProfilePicture: yup
    .string()
    .max(500, 'Profile picture URL must not exceed 500 characters')
    .optional(),

  // Contact Information
  emailAddress: yup
    .string()
    .email('Please provide a valid email address')
    .max(150, 'Email must not exceed 150 characters')
    .required('Email address is required'),
  
  phoneNumber: yup
    .string()
    .matches(/^[\+]?[0-9]{10,15}$/, 'Please provide a valid phone number')
    .required('Phone number is required'),

  // ✅ EXACT BACKEND MATCH: Only allows @$!%*?& special characters
  password: yup
    .string()
    .min(8, 'Password must be 8–50 characters')
    .max(50, 'Password must be 8–50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
      'Password must contain uppercase, lowercase, digit, special character (@$!%*?&)'
    )
    .required('Password is required'),
  
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password and confirm password must match')
    .required('Password confirmation is required'),

  // Location Details
  city: yup
    .string()
    .max(50, 'City must not exceed 50 characters')
    .required('City is required'),
  
  state: yup
    .string()
    .max(50, 'State must not exceed 50 characters')
    .required('State is required'),
  
  country: yup
    .string()
    .max(50, 'Country must not exceed 50 characters')
    .required('Country is required'),
  
  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
    .required('Pincode is required'),
  
  latitude: yup
    .number()
    .min(-90, 'Latitude must be ≥ -90')
    .max(90, 'Latitude must be ≤ 90')
    .optional(),
  
  longitude: yup
    .number()
    .min(-180, 'Longitude must be ≥ -180')
    .max(180, 'Longitude must be ≤ 180')
    .optional(),

  // Terms acceptance
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions to register')
    .required('You must accept the terms and conditions to register'),
});

// OTP validation
export const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits')
    .required('OTP is required'),
});

// Validation helper functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/;
  return passwordRegex.test(password);
};