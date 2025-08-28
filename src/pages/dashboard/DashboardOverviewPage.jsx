import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { Dashboard, TrendingUp, People } from '@mui/icons-material';


 const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
const DashboardOverviewPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
        📊 Welcome Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <People sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Total Guests</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>245</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Dashboard sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Active Bookings</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>89</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ background: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Monthly Revenue</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>₹2.5L</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Recent Activities
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to your PG Management Dashboard! Here you can monitor all your business activities.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverviewPage;
