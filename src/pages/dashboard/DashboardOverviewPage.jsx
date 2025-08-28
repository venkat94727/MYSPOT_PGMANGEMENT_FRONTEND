import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Grid, Card, CardContent, FormControl, 
  InputLabel, Select, MenuItem, LinearProgress
} from '@mui/material';
import { 
  Dashboard, TrendingUp, People, PersonOff, CalendarToday
} from '@mui/icons-material';

const DashboardOverviewPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-08'); // Current month
  
  // Mock data for different months - replace with actual API calls
  const monthlyData = {
    '2024-08': { // August 2024
      totalGuests: 245,
      activeBookings: 89,
      monthlyRevenue: 2.5,
      formerGuests: 67,
      monthlyStats: {
        totalBookings: 45,
        completedBookings: 32,
        cancelledBookings: 8,
        pendingBookings: 5,
        occupancyRate: 78
      }
    },
    '2024-07': { // July 2024
      totalGuests: 220,
      activeBookings: 75,
      monthlyRevenue: 2.2,
      formerGuests: 60,
      monthlyStats: {
        totalBookings: 40,
        completedBookings: 28,
        cancelledBookings: 7,
        pendingBookings: 5,
        occupancyRate: 72
      }
    },
    '2024-06': { // June 2024
      totalGuests: 195,
      activeBookings: 65,
      monthlyRevenue: 1.8,
      formerGuests: 52,
      monthlyStats: {
        totalBookings: 35,
        completedBookings: 25,
        cancelledBookings: 6,
        pendingBookings: 4,
        occupancyRate: 68
      }
    },
    '2024-05': { // May 2024
      totalGuests: 175,
      activeBookings: 58,
      monthlyRevenue: 1.6,
      formerGuests: 45,
      monthlyStats: {
        totalBookings: 30,
        completedBookings: 22,
        cancelledBookings: 5,
        pendingBookings: 3,
        occupancyRate: 62
      }
    }
  };

  const currentData = monthlyData[selectedMonth] || monthlyData['2024-08'];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getMonthName = (monthValue) => {
    const date = new Date(monthValue + '-01');
    return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
          📊 Welcome Dashboard Overview
        </Typography>
        
        {/* Month Selector */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Select Month"
          >
            <MenuItem value="2024-08">August 2024</MenuItem>
            <MenuItem value="2024-07">July 2024</MenuItem>
            <MenuItem value="2024-06">June 2024</MenuItem>
            <MenuItem value="2024-05">May 2024</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {/* Main Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <People sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Total Guests</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{currentData.totalGuests}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Dashboard sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Active Bookings</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{currentData.activeBookings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Monthly Revenue</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>₹{currentData.monthlyRevenue}L</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #607D8B 30%, #90A4AE 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <PersonOff sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Former Guests</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{currentData.formerGuests}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Performance Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1, color: '#1976d2' }} />
              {getMonthName(selectedMonth)} Performance
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Total Bookings</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#2196F3' }}>
                  {currentData.monthlyStats.totalBookings}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Completed</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                  {currentData.monthlyStats.completedBookings}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Cancelled</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#f44336' }}>
                  {currentData.monthlyStats.cancelledBookings}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Occupancy Rate</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#FF9800' }}>
                  {currentData.monthlyStats.occupancyRate}%
                </Typography>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Occupancy Rate: {currentData.monthlyStats.occupancyRate}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={currentData.monthlyStats.occupancyRate} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#FF9800'
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <CalendarToday sx={{ mr: 1, color: '#1976d2' }} />
              Guest Status Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                    {currentData.activeBookings}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current Guests
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#607D8B' }}>
                    {currentData.formerGuests}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Former Guests
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#2196F3' }}>
                    {currentData.monthlyStats.pendingBookings}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upcoming
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#9C27B0' }}>
                    {currentData.totalGuests}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Ever
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverviewPage;
