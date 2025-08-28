import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Grid, Card, CardContent, FormControl,
  InputLabel, Select, MenuItem, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, LinearProgress,
  List, ListItem, ListItemText, Divider
} from '@mui/material';
import { 
  Analytics, TrendingUp, Assessment, BarChart, CalendarToday,
  AttachMoney, People, Hotel, Star, TrendingDown
} from '@mui/icons-material';

const AnalyticsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-08');

  // Mock analytics data for different months
  const analyticsData = {
    '2024-08': { // August 2024
      occupancyRate: 85,
      monthlyRevenue: 250000,
      avgStayDuration: 8.5,
      customerSatisfaction: 4.2,
      bookingTrends: {
        totalBookings: 45,
        completedBookings: 32,
        cancelledBookings: 8,
        pendingBookings: 5,
        averageBookingValue: 5556,
        repeatCustomers: 12
      },
      bedTypeAnalytics: [
        { type: 'Single Sharing', bookings: 18, revenue: 135000, occupancy: 90 },
        { type: 'Double Sharing', bookings: 20, revenue: 96000, occupancy: 85 },
        { type: 'Triple Sharing', bookings: 7, revenue: 19000, occupancy: 70 }
      ],
      dailyStats: [
        { date: '01 Aug', bookings: 2, revenue: 12000, occupancy: 82 },
        { date: '05 Aug', bookings: 3, revenue: 15000, occupancy: 84 },
        { date: '10 Aug', bookings: 1, revenue: 8000, occupancy: 86 },
        { date: '15 Aug', bookings: 4, revenue: 18000, occupancy: 88 },
        { date: '20 Aug', bookings: 2, revenue: 10000, occupancy: 87 },
        { date: '25 Aug', bookings: 3, revenue: 14000, occupancy: 85 },
        { date: '30 Aug', bookings: 1, revenue: 6000, occupancy: 83 }
      ],
      topPerformers: [
        { metric: 'Highest Revenue Day', value: '15 Aug 2024', amount: '₹18,000' },
        { metric: 'Peak Occupancy', value: '20 Aug 2024', amount: '88%' },
        { metric: 'Most Bookings', value: '15 Aug 2024', amount: '4 bookings' },
        { metric: 'Best Rating Day', value: '12 Aug 2024', amount: '4.8/5' }
      ]
    },
    '2024-07': { // July 2024
      occupancyRate: 78,
      monthlyRevenue: 220000,
      avgStayDuration: 7.8,
      customerSatisfaction: 4.0,
      bookingTrends: {
        totalBookings: 40,
        completedBookings: 28,
        cancelledBookings: 7,
        pendingBookings: 5,
        averageBookingValue: 5500,
        repeatCustomers: 10
      },
      bedTypeAnalytics: [
        { type: 'Single Sharing', bookings: 15, revenue: 112500, occupancy: 85 },
        { type: 'Double Sharing', bookings: 18, revenue: 86400, occupancy: 80 },
        { type: 'Triple Sharing', bookings: 7, revenue: 21100, occupancy: 65 }
      ],
      dailyStats: [
        { date: '01 Jul', bookings: 1, revenue: 8000, occupancy: 75 },
        { date: '05 Jul', bookings: 2, revenue: 12000, occupancy: 76 },
        { date: '10 Jul', bookings: 3, revenue: 15000, occupancy: 78 },
        { date: '15 Jul', bookings: 2, revenue: 10000, occupancy: 80 },
        { date: '20 Jul', bookings: 4, revenue: 16000, occupancy: 82 },
        { date: '25 Jul', bookings: 1, revenue: 7000, occupancy: 79 },
        { date: '30 Jul', bookings: 2, revenue: 11000, occupancy: 77 }
      ],
      topPerformers: [
        { metric: 'Highest Revenue Day', value: '20 Jul 2024', amount: '₹16,000' },
        { metric: 'Peak Occupancy', value: '20 Jul 2024', amount: '82%' },
        { metric: 'Most Bookings', value: '20 Jul 2024', amount: '4 bookings' },
        { metric: 'Best Rating Day', value: '18 Jul 2024', amount: '4.5/5' }
      ]
    },
    '2024-06': { // June 2024
      occupancyRate: 72,
      monthlyRevenue: 180000,
      avgStayDuration: 7.2,
      customerSatisfaction: 3.9,
      bookingTrends: {
        totalBookings: 35,
        completedBookings: 25,
        cancelledBookings: 6,
        pendingBookings: 4,
        averageBookingValue: 5143,
        repeatCustomers: 8
      },
      bedTypeAnalytics: [
        { type: 'Single Sharing', bookings: 12, revenue: 90000, occupancy: 80 },
        { type: 'Double Sharing', bookings: 16, revenue: 70400, occupancy: 75 },
        { type: 'Triple Sharing', bookings: 7, revenue: 19600, occupancy: 60 }
      ],
      dailyStats: [
        { date: '01 Jun', bookings: 1, revenue: 7000, occupancy: 70 },
        { date: '05 Jun', bookings: 2, revenue: 10000, occupancy: 71 },
        { date: '10 Jun', bookings: 3, revenue: 13000, occupancy: 73 },
        { date: '15 Jun', bookings: 2, revenue: 9000, occupancy: 75 },
        { date: '20 Jun', bookings: 1, revenue: 6000, occupancy: 74 },
        { date: '25 Jun', bookings: 2, revenue: 11000, occupancy: 72 },
        { date: '30 Jun', bookings: 3, revenue: 14000, occupancy: 71 }
      ],
      topPerformers: [
        { metric: 'Highest Revenue Day', value: '30 Jun 2024', amount: '₹14,000' },
        { metric: 'Peak Occupancy', value: '15 Jun 2024', amount: '75%' },
        { metric: 'Most Bookings', value: '10 Jun 2024', amount: '3 bookings' },
        { metric: 'Best Rating Day', value: '22 Jun 2024', amount: '4.3/5' }
      ]
    }
  };

  const currentData = analyticsData[selectedMonth] || analyticsData['2024-08'];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getMonthName = (monthValue) => {
    const date = new Date(monthValue + '-01');
    return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  };

  const getOccupancyColor = (rate) => {
    if (rate >= 80) return 'success';
    if (rate >= 60) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
          📊 Welcome Analytics
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
          </Select>
        </FormControl>
      </Box>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #E91E63 30%, #F06292 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Occupancy Rate</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{currentData.occupancyRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #673AB7 30%, #9575CD 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <AttachMoney sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Monthly Revenue</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>₹{(currentData.monthlyRevenue / 100000).toFixed(1)}L</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #009688 30%, #4DB6AC 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <BarChart sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Avg. Stay Duration</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{currentData.avgStayDuration}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #795548 30%, #A1887F 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Star sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Customer Satisfaction</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{currentData.customerSatisfaction}/5</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Booking Trends & Bed Type Analytics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1, color: '#1976d2' }} />
              {getMonthName(selectedMonth)} Booking Trends
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Total Bookings</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#2196F3' }}>
                  {currentData.bookingTrends.totalBookings}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Completed</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                  {currentData.bookingTrends.completedBookings}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Cancelled</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#f44336' }}>
                  {currentData.bookingTrends.cancelledBookings}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Avg. Value</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#9C27B0' }}>
                  ₹{currentData.bookingTrends.averageBookingValue}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Repeat Customers</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#FF9800' }}>
                  {currentData.bookingTrends.repeatCustomers} ({((currentData.bookingTrends.repeatCustomers / currentData.bookingTrends.totalBookings) * 100).toFixed(1)}%)
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
              <Hotel sx={{ mr: 1, color: '#1976d2' }} />
              Bed Type Analytics
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Bed Type</TableCell>
                    <TableCell align="right">Bookings</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">Occupancy</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.bedTypeAnalytics.map((bed) => (
                    <TableRow key={bed.type}>
                      <TableCell>{bed.type}</TableCell>
                      <TableCell align="right">{bed.bookings}</TableCell>
                      <TableCell align="right">₹{(bed.revenue / 1000).toFixed(0)}K</TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={`${bed.occupancy}%`} 
                          size="small" 
                          color={getOccupancyColor(bed.occupancy)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Daily Performance & Top Performers */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
              <CalendarToday sx={{ mr: 1, color: '#1976d2' }} />
              Daily Performance Overview
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Bookings</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">Occupancy</TableCell>
                    <TableCell align="right">Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.dailyStats.map((day, index) => (
                    <TableRow key={index}>
                      <TableCell>{day.date}</TableCell>
                      <TableCell align="right">{day.bookings}</TableCell>
                      <TableCell align="right">₹{(day.revenue / 1000).toFixed(0)}K</TableCell>
                      <TableCell align="right">{day.occupancy}%</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={day.occupancy} 
                            sx={{ 
                              width: 60, 
                              height: 6, 
                              borderRadius: 3,
                              backgroundColor: '#e0e0e0',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: day.occupancy >= 80 ? '#4CAF50' : day.occupancy >= 60 ? '#FF9800' : '#f44336'
                              }
                            }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
              <Assessment sx={{ mr: 1, color: '#1976d2' }} />
              Top Performers
            </Typography>
            <List>
              {currentData.topPerformers.map((performer, index) => (
                <Box key={index}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {performer.metric}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {performer.value}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                            {performer.amount}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < currentData.topPerformers.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
