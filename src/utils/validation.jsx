import * as yup from 'yup';

// Login validation - matches backend
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .required('Password is required'),
});

// Registration validation - matches backend exactly
export const signupSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, 'Full name must be between 2 and 100 characters')
    .max(100, 'Full name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s.'-]+$/, 'Full name contains invalid characters')
    .required('Full name is required'),
  
  email: yup
    .string()
    .email('Please provide a valid email address')
    .max(150, 'Email address must not exceed 150 characters')
    .required('Email address is required'),
  
  mobile: yup
    .string()
    .matches(/^[+]?[0-9]{10,15}$/, 'Please provide a valid mobile number')
    .required('Mobile number is required'),
  
  password: yup
    .string()
    .min(8, 'Password must be between 8 and 128 characters')
    .max(128, 'Password must be between 8 and 128 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    )
    .required('Password is required'),
  
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password and confirm password must match')
    .required('Password confirmation is required'),
  
  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .test('age', 'You must be at least 18 years old to register', function(value) {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),
  
  gender: yup
    .string()
    .oneOf(['MALE', 'FEMALE', 'OTHER'], 'Gender is required')
    .required('Gender is required'),
  
  city: yup
    .string()
    .max(50, 'City name must not exceed 50 characters')
    .optional(),
  
  state: yup
    .string()
    .max(50, 'State name must not exceed 50 characters')
    .optional(),
  
  emergencyContactName: yup
    .string()
    .max(100, 'Emergency contact name must not exceed 100 characters')
    .optional(),
  
  emergencyContactNumber: yup
    .string()
    .matches(/^[+]?[0-9]{10,15}$|^$/, 'Please provide a valid emergency contact number')
    .optional(),
  
  marketingConsent: yup
    .boolean()
    .default(false),
  
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

export const validateMobile = (mobile) => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};