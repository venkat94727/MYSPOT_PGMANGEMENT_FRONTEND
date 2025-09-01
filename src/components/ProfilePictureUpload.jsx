
import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Avatar,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  PhotoCamera,
  Edit,
  Delete,
  CloudUpload
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const ProfilePictureUpload = ({
  currentImageUrl = null,
  onImageUploaded = () => {},
  onImageDeleted = () => {},
  onFileSelected = () => {}, // NEW: For signup mode
  size = 120,
  disabled = false,
  showActions = true,
  mode = 'authenticated', // 'authenticated' | 'signup'
  allowPreviewOnly = false // NEW: For signup mode
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentImageUrl);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // NEW: Store selected file
  const fileInputRef = useRef(null);

  // Validate file before upload
  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Please select a valid image file (JPEG, PNG, GIF)');
    }

    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }
  };

  // Create preview URL
  const createPreview = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  // Handle file selection
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setError('');
      
      // Validate file
      validateFile(file);

      // Create preview
      const previewUrl = await createPreview(file);
      setPreview(previewUrl);
      setSelectedFile(file);

      if (mode === 'signup' || allowPreviewOnly) {
        // In signup mode, just store the file and preview - don't upload yet
        onFileSelected(file, previewUrl);
        toast.success('Image selected! It will be uploaded after registration.');
      } else {
        // In authenticated mode, upload immediately
        await handleUpload(file);
      }

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle file upload (only for authenticated mode)
  const handleUpload = async (file) => {
    if (mode === 'signup' || allowPreviewOnly) {
      return; // Don't upload in signup mode
    }

    try {
      setIsUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('file', file);
      
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      // Get pgId from token or props
      const pgId = getPgIdFromToken() || 1; // You'll need to implement getPgIdFromToken
      formData.append('pgId', pgId);

      const response = await fetch('/pg-auth/upload-profile-picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      
      if (result.success) {
        const imageUrl = result.data.fileUrl;
        setPreview(imageUrl);
        onImageUploaded(imageUrl);
        toast.success('Profile picture uploaded successfully!');
      } else {
        throw new Error(result.message || 'Upload failed');
      }

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
      toast.error(err.message);
      setPreview(currentImageUrl);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle delete (only for authenticated mode)
  const handleDelete = async () => {
    if (mode === 'signup' || allowPreviewOnly) {
      // In signup mode, just clear preview
      setPreview(null);
      setSelectedFile(null);
      onImageDeleted();
      setDialogOpen(false);
      return;
    }

    try {
      setIsUploading(true);
      setError('');

      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authentication required');
      }

      const pgId = getPgIdFromToken() || 1;

      const response = await fetch(`/pg-auth/delete-profile-picture/${pgId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Delete failed');
      }

      const result = await response.json();
      
      if (result.success) {
        setPreview(null);
        setSelectedFile(null);
        onImageDeleted();
        toast.success('Profile picture deleted successfully!');
      } else {
        throw new Error(result.message || 'Delete failed');
      }

    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsUploading(false);
      setDialogOpen(false);
    }
  };

  // Helper function to get pgId from JWT token
  const getPgIdFromToken = () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return null;
      
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decoded = JSON.parse(jsonPayload);
      return decoded.pgId || decoded.userId || decoded.sub;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Open file dialog
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getStatusText = () => {
    if (mode === 'signup' && selectedFile) {
      return 'Image ready for upload after registration';
    }
    return 'Supported formats: JPEG, PNG, GIF (max 10MB)';
  };

  return (
    <Box sx={{ textAlign: 'center', position: 'relative' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2, maxWidth: 300, mx: 'auto' }}>
          {error}
        </Alert>
      )}

      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Avatar
          src={preview}
          sx={{ 
            width: size, 
            height: size,
            border: 3,
            borderColor: preview ? 'success.main' : 'grey.300',
            boxShadow: 3
          }}
        >
          {!preview && <PhotoCamera sx={{ fontSize: size * 0.4 }} />}
        </Avatar>

        {isUploading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: '50%'
            }}
          >
            <CircularProgress size={size * 0.3} color="primary" />
          </Box>
        )}

        {!disabled && showActions && (
          <IconButton
            onClick={openFileDialog}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              boxShadow: 2
            }}
            size="small"
            disabled={isUploading}
          >
            <Edit fontSize="small" />
          </IconButton>
        )}
      </Box>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
        disabled={disabled || isUploading}
      />

      {!disabled && showActions && (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<CloudUpload />}
            onClick={openFileDialog}
            disabled={isUploading}
            sx={{ mr: 1 }}
          >
            {preview ? 'Change' : 'Select'} Picture
          </Button>

          {preview && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={() => setDialogOpen(true)}
              disabled={isUploading}
            >
              Remove
            </Button>
          )}
        </Box>
      )}

      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {getStatusText()}
      </Typography>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Remove Profile Picture</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this profile picture?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" disabled={isUploading}>
            {isUploading ? 'Removing...' : 'Remove'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePictureUpload;