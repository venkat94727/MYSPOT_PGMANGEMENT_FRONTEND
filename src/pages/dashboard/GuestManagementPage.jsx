import React from 'react';
import { Box, Typography, Paper, Button, Grid, Card, CardContent } from '@mui/material';
import { PersonAdd, People, AccountCircle, ContactPhone } from '@mui/icons-material';

const GuestManagementPage = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
          👥 Welcome Guest Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<PersonAdd />}
          sx={{ 
            background: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)',
            fontWeight: 600 
          }}
        >
          Add Guest
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <People sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Total Guests</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>245</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <AccountCircle sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Active Guests</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>89</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <ContactPhone sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">New Inquiries</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>12</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <People sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Check-outs</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>5</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Guest Management Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage guest profiles, track stay history, handle check-ins/check-outs, and maintain guest communications from this centralized hub.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GuestManagementPage;
