import React from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Avatar, Divider } from '@mui/material';
import { Settings, Person, Security, Notifications } from '@mui/icons-material';

const ProfileSettingsPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
        ⚙️ Welcome Profile Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar sx={{ 
              width: 100, 
              height: 100, 
              margin: '0 auto',
              mb: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
            }}>
              <Person sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              PG Manager
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 2 }}
            >
              Change Photo
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Settings sx={{ fontSize: 30, color: '#1976d2', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Profile Information
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  defaultValue="John Doe"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  defaultValue="john.doe@email.com"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  defaultValue="+91 9876543210"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PG Name"
                  defaultValue="Comfort PG"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Button 
              variant="contained" 
              sx={{ 
                mt: 3,
                background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
                fontWeight: 600
              }}
            >
              Save Changes
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Settings
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, border: 1, borderColor: 'grey.300' }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, border: 1, borderColor: 'grey.300' }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderRadius: 2, border: 1, borderColor: 'grey.300' }}>
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
    </Box>
  );
};

export default ProfileSettingsPage;
