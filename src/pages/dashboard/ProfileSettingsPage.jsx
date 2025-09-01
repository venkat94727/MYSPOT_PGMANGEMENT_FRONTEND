import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Grid, TextField, Button, Avatar, Divider, 
  Alert, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, 
  DialogActions, InputAdornment
} from '@mui/material';
import { 
  Settings, Person, Security, Notifications, Edit, Save, Cancel, 
  Phone, Business, Email, PhotoCamera
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { profileService } from '@/services/profileService';
import ProfilePictureUpload from '@/components/ProfilePictureUpload';

// Validation schema
const profileSchema = yup.object({
  ownerName: yup.string()
    .required('Owner name is required')
    .min(2, 'Owner name must be at least 2 characters')
    .max(100, 'Owner name must not exceed 100 characters'),
  pgName: yup.string()
    .required('PG name is required')
    .min(2, 'PG name must be at least 2 characters')
    .max(200, 'PG name must not exceed 200 characters'),
  phoneNumber: yup.string()
    .required('Phone number is required')
    .matches(/^[+]?[0-9]{10,15}$/, 'Please provide a valid phone number'),
  city: yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must not exceed 50 characters'),
  state: yup.string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must not exceed 50 characters')
});

const ProfileSettingsPage = () => {
  // State declarations - make sure all are properly initialized
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({});
  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(''); // Make sure this is properly initialized
  const [showProfilePictureDialog, setShowProfilePictureDialog] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      ownerName: '',
      pgName: '',
      phoneNumber: '',
      city: '',
      state: ''
    }
  });

  // Load profile data on component mount
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setIsLoadingProfile(true);
      setError('');
      
      const response = await profileService.getCurrentProfile();
      console.log('✅ Profile data loaded:', response);
      
      setProfileData(response);
      
      // Reset form with loaded data
      reset({
        ownerName: response.ownerName || '',
        pgName: response.pgName || '',
        phoneNumber: response.phoneNumber || '',
        city: response.city || '',
        state: response.state || ''
      });

      // Set profile picture preview if available - make sure this is correct
      if (response.profilePictureUrl) {
        setProfilePreview(response.profilePictureUrl);
      } else {
        setProfilePreview(''); // Set empty string if no image
      }
      
    } catch (error) {
      console.error('❌ Failed to load profile:', error);
      setError('Failed to load profile data. Please refresh the page.');
      toast.error('Failed to load profile data');
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form to original data
      reset({
        ownerName: profileData.ownerName || '',
        pgName: profileData.pgName || '',
        phoneNumber: profileData.phoneNumber || '',
        city: profileData.city || '',
        state: profileData.state || ''
      });
      setError('');
      setSuccess('');
    }
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = async (formData) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      console.log('🚀 Updating profile with data:', formData);
      
      const updateData = {
        ownerName: formData.ownerName.trim(),
        pgName: formData.pgName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        city: formData.city.trim(),
        state: formData.state.trim()
      };

      const response = await profileService.updateProfile(updateData);
      console.log('✅ Profile updated successfully:', response);
      
      // Update local state with new data
      setProfileData(response);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      toast.success('Profile updated successfully!');
      
    } catch (error) {
      console.error('❌ Profile update failed:', error);
      
      if (error.response?.status === 400) {
        setError(error.response.data.message || 'Please check your input and try again.');
      } else if (error.response?.status === 409) {
        setError('Phone number already exists. Please use a different number.');
      } else {
        setError(error.response?.data?.message || 'Failed to update profile. Please try again.');
      }
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePictureSelected = (file, previewUrl) => {
    setSelectedProfileFile(file);
    setProfilePreview(previewUrl);
  };

  const handleProfilePictureUpdate = async () => {
    if (!selectedProfileFile) {
      toast.error('Please select a profile picture first');
      return;
    }

    try {
      setIsLoading(true);
      console.log('📸 Updating profile picture:', selectedProfileFile.name);
      
      const response = await profileService.updateProfilePicture(selectedProfileFile);
      console.log('✅ Profile picture updated:', response);
      
      // Update profile data with new picture URL
      setProfileData(prev => ({
        ...prev,
        profilePictureUrl: response.profilePictureUrl
      }));
      
      // Update preview with new image URL
      setProfilePreview(response.profilePictureUrl);
      
      setShowProfilePictureDialog(false);
      setSelectedProfileFile(null);
      toast.success('Profile picture updated successfully!');
      
    } catch (error) {
      console.error('❌ Profile picture update failed:', error);
      toast.error('Failed to update profile picture: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePictureDeleted = () => {
    setSelectedProfileFile(null);
    setProfilePreview(profileData.profilePictureUrl || '');
  };

  // Handle image load error
  const handleImageError = (e) => {
    console.error('Failed to load profile picture:', e.target.src);
    setProfilePreview(''); // Reset to empty string on error
  };

  if (isLoadingProfile) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={50} />
        <Typography sx={{ ml: 2 }}>Loading profile...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
        ⚙️ Profile Settings
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <Grid container spacing={3}>
        {/* Profile Picture Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar 
                src={profilePreview || ''} // Make sure we always pass a string
                sx={{ 
                  width: 120, 
                  height: 120, 
                  margin: '0 auto',
                  mb: 2,
                  background: (profilePreview && profilePreview.trim() !== '') 
                    ? 'transparent' 
                    : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                }}
                onError={handleImageError}
              >
                {(!profilePreview || profilePreview.trim() === '') && <Person sx={{ fontSize: 60 }} />}
              </Avatar>
              <IconButton
                sx={{ 
                  position: 'absolute', 
                  bottom: 10, 
                  right: -5, 
                  backgroundColor: '#1976d2',
                  color: 'white',
                  '&:hover': { backgroundColor: '#1565c0' }
                }}
                onClick={() => setShowProfilePictureDialog(true)}
              >
                <PhotoCamera />
              </IconButton>
            </Box>
            
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {profileData.ownerName || 'Loading...'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {profileData.pgName || 'PG Manager'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profileData.emailAddress || ''}
            </Typography>
            
            <Button 
              variant="outlined" 
              startIcon={<PhotoCamera />}
              onClick={() => setShowProfilePictureDialog(true)}
              sx={{ mt: 2 }}
            >
              Change Photo
            </Button>
          </Paper>
        </Grid>

        {/* Profile Information Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Settings sx={{ fontSize: 30, color: '#1976d2', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Profile Information
                </Typography>
              </Box>
              
              <Box>
                {isEditing ? (
                  <>
                    <Button 
                      variant="outlined" 
                      startIcon={<Cancel />}
                      onClick={handleEditToggle}
                      sx={{ mr: 1 }}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="contained" 
                      startIcon={<Save />}
                      onClick={handleSubmit(handleProfileUpdate)}
                      disabled={isLoading}
                    >
                      {isLoading ? <CircularProgress size={20} /> : 'Save'}
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outlined" 
                    startIcon={<Edit />}
                    onClick={handleEditToggle}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Box>

            <form onSubmit={handleSubmit(handleProfileUpdate)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="ownerName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Owner Name"
                        variant="outlined"
                        disabled={!isEditing}
                        error={!!errors.ownerName}
                        helperText={errors.ownerName?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person color={isEditing ? "primary" : "disabled"} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="pgName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="PG Name"
                        variant="outlined"
                        disabled={!isEditing}
                        error={!!errors.pgName}
                        helperText={errors.pgName?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Business color={isEditing ? "primary" : "disabled"} />
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={profileData.emailAddress || ''}
                    variant="outlined"
                    disabled
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="disabled" />
                        </InputAdornment>
                      )
                    }}
                    helperText="Email cannot be changed"
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
                        label="Phone Number"
                        variant="outlined"
                        disabled={!isEditing}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color={isEditing ? "primary" : "disabled"} />
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
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="City"
                        variant="outlined"
                        disabled={!isEditing}
                        error={!!errors.city}
                        helperText={errors.city?.message}
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
                        label="State"
                        variant="outlined"
                        disabled={!isEditing}
                        error={!!errors.state}
                        helperText={errors.state?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Quick Settings Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Settings
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 2, 
                  borderRadius: 2, 
                  border: 1, 
                  borderColor: 'grey.300',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'grey.50' }
                }}>
                  <Security sx={{ color: '#ff9800', mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Security Settings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Change password & security
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 2, 
                  borderRadius: 2, 
                  border: 1, 
                  borderColor: 'grey.300',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'grey.50' }
                }}>
                  <Notifications sx={{ color: '#2196f3', mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Manage notification preferences
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 2, 
                  borderRadius: 2, 
                  border: 1, 
                  borderColor: 'grey.300',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'grey.50' }
                }}>
                  <Settings sx={{ color: '#4caf50', mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Account Settings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      General account preferences
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Profile Picture Update Dialog */}
      <Dialog 
        open={showProfilePictureDialog} 
        onClose={() => setShowProfilePictureDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <ProfilePictureUpload
              currentImageUrl={profilePreview}
              onFileSelected={handleProfilePictureSelected}
              onImageDeleted={handleProfilePictureDeleted}
              mode="update"
              size={150}
              disabled={isLoading}
              showActions={true}
            />
          </Box>
          {selectedProfileFile && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
              Selected: {selectedProfileFile.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowProfilePictureDialog(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleProfilePictureUpdate}
            variant="contained"
            disabled={!selectedProfileFile || isLoading}
            startIcon={isLoading ? <CircularProgress size={16} /> : <Save />}
          >
            {isLoading ? 'Uploading...' : 'Update Picture'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileSettingsPage;
