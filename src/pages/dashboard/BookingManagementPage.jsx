import React from 'react';
import { Box, Typography, Paper, Tabs, Tab, Grid } from '@mui/material';
import { BookOnline, Schedule, CheckCircle } from '@mui/icons-material';

const BookingManagementPage = () => {
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
        📅 Welcome Booking Management
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Bookings" />
          <Tab label="Pending" />
          <Tab label="Confirmed" />
          <Tab label="Cancelled" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <BookOnline sx={{ fontSize: 40, color: '#2196F3', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Total Bookings
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#2196F3' }}>
              156
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Schedule sx={{ fontSize: 40, color: '#FF9800', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Pending
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#FF9800' }}>
              23
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 40, color: '#4CAF50', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Confirmed
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#4CAF50' }}>
              133
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Booking Management Features
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track all guest bookings, manage check-ins/check-outs, handle cancellations, and process payments efficiently.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingManagementPage;
