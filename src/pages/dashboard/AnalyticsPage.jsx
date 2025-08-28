import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { Analytics, TrendingUp, Assessment, BarChart } from '@mui/icons-material';

const AnalyticsPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
        📊 Welcome Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #E91E63 30%, #F06292 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Occupancy Rate</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>85%</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #673AB7 30%, #9575CD 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Assessment sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Monthly Revenue</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>₹2.5L</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #009688 30%, #4DB6AC 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <BarChart sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Avg. Stay Duration</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>8.5</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #795548 30%, #A1887F 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Analytics sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Customer Satisfaction</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>4.2/5</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 300 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Revenue Trends
            </Typography>
            <Box sx={{ 
              height: 200, 
              background: 'linear-gradient(45deg, #f5f5f5 30%, #e0e0e0 90%)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography color="text.secondary">Revenue Chart Placeholder</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 300 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Occupancy Analytics
            </Typography>
            <Box sx={{ 
              height: 200, 
              background: 'linear-gradient(45deg, #f5f5f5 30%, #e0e0e0 90%)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography color="text.secondary">Occupancy Chart Placeholder</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
