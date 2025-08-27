import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  ExitToApp,
  Person,
  Home,
  Favorite,
  VerifiedUser,
  Phone,
  Email,
} from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null; // or loading spinner
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={user.profilePictureUrl} 
              sx={{ mr: 2, width: 64, height: 64 }}
            >
              {user.fullName?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Welcome, {user.fullName}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user.emailAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since {format(new Date(user.createdAt), 'MMM yyyy')}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={<ExitToApp />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Paper>

      {/* User Info Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Person sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Profile Information</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Mobile:</strong> {user.mobileNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Date of Birth:</strong> {user.dateOfBirth ? format(new Date(user.dateOfBirth), 'MMM dd, yyyy') : 'Not provided'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Gender:</strong> {user.gender || 'Not provided'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>City:</strong> {user.city || 'Not provided'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>State:</strong> {user.state || 'Not provided'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Home sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">My Bookings</Typography>
              </Box>
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>
                0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active bookings
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Favorite sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Favorites</Typography>
              </Box>
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>
                0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Saved properties
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Account Status */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Account Status
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={<Email />}
            label={`Email: ${user.emailVerified ? 'Verified' : 'Not Verified'}`}
            color={user.emailVerified ? 'success' : 'warning'}
          />
          <Chip
            icon={<Phone />}
            label={`Phone: ${user.phoneVerified ? 'Verified' : 'Not Verified'}`}
            color={user.phoneVerified ? 'success' : 'warning'}
          />
          <Chip
            icon={<VerifiedUser />}
            label={`Account: ${user.isActive ? 'Active' : 'Inactive'}`}
            color={user.isActive ? 'success' : 'error'}
          />
        </Box>
      </Paper>

      {/* Emergency Contact */}
      {(user.emergencyContactName || user.emergencyContactNumber) && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Emergency Contact
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Name:</strong> {user.emergencyContactName || 'Not provided'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Number:</strong> {user.emergencyContactNumber || 'Not provided'}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default DashboardPage;