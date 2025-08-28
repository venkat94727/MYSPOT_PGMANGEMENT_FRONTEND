import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Tabs, Tab, Grid, Card, CardContent, 
  Avatar, Chip, Button, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Menu, MenuItem,
  Accordion, AccordionSummary, AccordionDetails, Divider, List,
  ListItem, ListItemText, ListItemAvatar
} from '@mui/material';
import { 
  BookOnline, Schedule, CheckCircle, Cancel, Person, Phone, Email,
  LocationOn, MoreVert, Visibility, Edit, Delete, History,
  ExpandMore, CalendarToday, Payment
} from '@mui/icons-material';

const BookingManagementPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock booking data with daily basis booking
  const bookings = [
    {
      id: 'BK001',
      customer: {
        fullName: 'John Doe',
        emailAddress: 'john.doe@email.com',
        mobileNumber: '+91 9876543210',
        dateOfBirth: '1995-06-15',
        gender: 'MALE',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        emergencyContactName: 'Jane Doe',
        emergencyContactNumber: '+91 9876543211'
      },
      bookingDate: '2024-08-20',
      checkInDate: '2024-09-01',
      checkOutDate: '2024-09-15',
      stayDuration: 14, // days
      bedType: 'Single Sharing',
      dailyRate: 500,
      totalAmount: 7000, // 14 days * 500
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      specialRequests: 'Need AC room, vegetarian meals',
      bookingHistory: [
        { date: '2024-08-20', status: 'PENDING', action: 'Booking Created', by: 'Customer' },
        { date: '2024-08-21', status: 'CONFIRMED', action: 'Payment Received', by: 'Manager' },
        { date: '2024-09-01', status: 'CHECKED_IN', action: 'Customer Checked In', by: 'Staff' }
      ]
    },
    {
      id: 'BK002',
      customer: {
        fullName: 'Sarah Johnson',
        emailAddress: 'sarah.johnson@email.com',
        mobileNumber: '+91 9876543220',
        dateOfBirth: '1993-03-22',
        gender: 'FEMALE',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        emergencyContactName: 'Mike Johnson',
        emergencyContactNumber: '+91 9876543221'
      },
      bookingDate: '2024-08-18',
      checkInDate: '2024-08-25',
      checkOutDate: '2024-09-10',
      stayDuration: 16, // days
      bedType: 'Double Sharing',
      dailyRate: 400,
      totalAmount: 6400, // 16 days * 400
      status: 'PENDING',
      paymentStatus: 'PARTIAL',
      specialRequests: 'Ground floor room preferred',
      bookingHistory: [
        { date: '2024-08-18', status: 'PENDING', action: 'Booking Created', by: 'Customer' },
        { date: '2024-08-19', status: 'PENDING', action: 'Partial Payment Received', by: 'System' }
      ]
    },
    {
      id: 'BK003',
      customer: {
        fullName: 'Mike Wilson',
        emailAddress: 'mike.wilson@email.com',
        mobileNumber: '+91 9876543230',
        dateOfBirth: '1994-11-08',
        gender: 'MALE',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        emergencyContactName: 'Lisa Wilson',
        emergencyContactNumber: '+91 9876543231'
      },
      bookingDate: '2024-07-15',
      checkInDate: '2024-08-01',
      checkOutDate: '2024-08-15',
      stayDuration: 14, // days
      bedType: 'Triple Sharing',
      dailyRate: 300,
      totalAmount: 4200, // 14 days * 300
      status: 'COMPLETED',
      paymentStatus: 'PAID',
      specialRequests: 'None',
      bookingHistory: [
        { date: '2024-07-15', status: 'PENDING', action: 'Booking Created', by: 'Customer' },
        { date: '2024-07-16', status: 'CONFIRMED', action: 'Full Payment Received', by: 'Manager' },
        { date: '2024-08-01', status: 'CHECKED_IN', action: 'Customer Checked In', by: 'Staff' },
        { date: '2024-08-15', status: 'COMPLETED', action: 'Customer Checked Out', by: 'Staff' }
      ]
    },
    {
      id: 'BK004',
      customer: {
        fullName: 'Emma Davis',
        emailAddress: 'emma.davis@email.com',
        mobileNumber: '+91 9876543240',
        dateOfBirth: '1996-09-12',
        gender: 'FEMALE',
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        emergencyContactName: 'Tom Davis',
        emergencyContactNumber: '+91 9876543241'
      },
      bookingDate: '2024-08-10',
      checkInDate: '2024-08-20',
      checkOutDate: '2024-09-05',
      stayDuration: 16, // days
      bedType: 'Single Sharing',
      dailyRate: 500,
      totalAmount: 8000, // 16 days * 500
      status: 'CANCELLED',
      paymentStatus: 'REFUNDED',
      specialRequests: 'Near metro station',
      bookingHistory: [
        { date: '2024-08-10', status: 'PENDING', action: 'Booking Created', by: 'Customer' },
        { date: '2024-08-11', status: 'CONFIRMED', action: 'Payment Received', by: 'Manager' },
        { date: '2024-08-18', status: 'CANCELLED', action: 'Customer Cancelled', by: 'Customer' },
        { date: '2024-08-19', status: 'REFUNDED', action: 'Refund Processed', by: 'Manager' }
      ]
    },
    {
      id: 'BK005',
      customer: {
        fullName: 'Alex Kumar',
        emailAddress: 'alex.kumar@email.com',
        mobileNumber: '+91 9876543250',
        dateOfBirth: '1992-12-03',
        gender: 'MALE',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        emergencyContactName: 'Priya Kumar',
        emergencyContactNumber: '+91 9876543251'
      },
      bookingDate: '2024-08-25',
      checkInDate: '2024-09-05',
      checkOutDate: '2024-09-12',
      stayDuration: 7, // days
      bedType: 'Double Sharing',
      dailyRate: 400,
      totalAmount: 2800, // 7 days * 400
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      specialRequests: 'WiFi required for work',
      bookingHistory: [
        { date: '2024-08-25', status: 'PENDING', action: 'Booking Created', by: 'Customer' },
        { date: '2024-08-26', status: 'CONFIRMED', action: 'Payment Received', by: 'Manager' }
      ]
    }
  ];

  const getFilteredBookings = () => {
    switch (tabValue) {
      case 0: return bookings; // All
      case 1: return bookings.filter(b => b.status === 'PENDING'); // Pending
      case 2: return bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'CHECKED_IN'); // Active
      case 3: return bookings.filter(b => b.status === 'COMPLETED'); // Completed
      case 4: return bookings.filter(b => b.status === 'CANCELLED'); // Cancelled
      default: return bookings;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'CONFIRMED': return 'info';
      case 'CHECKED_IN': return 'success';
      case 'COMPLETED': return 'success';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'PAID': return 'success';
      case 'PARTIAL': return 'warning';
      case 'PENDING': return 'error';
      case 'REFUNDED': return 'info';
      default: return 'default';
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setDetailsDialog(true);
  };

  const handleMenuClick = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
        📅 Welcome Booking Management
      </Typography>

      {/* Booking Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <BookOnline sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{bookings.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Schedule sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Pending</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {bookings.filter(b => b.status === 'PENDING').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Completed</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {bookings.filter(b => b.status === 'COMPLETED').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #f44336 30%, #ef5350 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Cancel sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Cancelled</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {bookings.filter(b => b.status === 'CANCELLED').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Booking Tabs */}
      <Paper>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Bookings" />
          <Tab label="Pending" />
          <Tab label="Active" />
          <Tab label="Completed" />
          <Tab label="Cancelled" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Details</TableCell>
                  <TableCell>Booking Info</TableCell>
                  <TableCell>Stay Details</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredBookings().map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#2196F3' }}>
                          {booking.customer.fullName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {booking.customer.fullName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {booking.customer.emailAddress}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {booking.customer.mobileNumber}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {booking.customer.city}, {booking.customer.state}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        ID: {booking.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Booked: {booking.bookingDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Check-in: {booking.checkInDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Check-out: {booking.checkOutDate}
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {booking.bedType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Duration: {booking.stayDuration} days
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Rate: ₹{booking.dailyRate}/day
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        ₹{booking.totalAmount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.stayDuration} days × ₹{booking.dailyRate}
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Chip 
                          label={booking.status} 
                          size="small" 
                          color={getStatusColor(booking.status)}
                        />
                        <Chip 
                          label={booking.paymentStatus} 
                          size="small" 
                          color={getPaymentStatusColor(booking.paymentStatus)}
                          variant="outlined"
                        />
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <IconButton 
                        onClick={() => handleViewDetails(booking)}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        onClick={(e) => handleMenuClick(e, booking)}
                        color="primary"
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>

      {/* Booking Details Dialog */}
      <Dialog 
        open={detailsDialog} 
        onClose={() => setDetailsDialog(false)}
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Booking Details - {selectedBooking?.id}</Typography>
            <Chip 
              label={selectedBooking?.status} 
              color={getStatusColor(selectedBooking?.status)}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Grid container spacing={3}>
              {/* Customer Information */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1 }} /> Customer Information
                  </Typography>
                  <Typography><strong>Name:</strong> {selectedBooking.customer.fullName}</Typography>
                  <Typography><strong>Email:</strong> {selectedBooking.customer.emailAddress}</Typography>
                  <Typography><strong>Mobile:</strong> {selectedBooking.customer.mobileNumber}</Typography>
                  <Typography><strong>DOB:</strong> {selectedBooking.customer.dateOfBirth}</Typography>
                  <Typography><strong>Gender:</strong> {selectedBooking.customer.gender}</Typography>
                  <Typography><strong>Location:</strong> {selectedBooking.customer.city}, {selectedBooking.customer.state}</Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Emergency Contact</Typography>
                  <Typography><strong>Name:</strong> {selectedBooking.customer.emergencyContactName}</Typography>
                  <Typography><strong>Phone:</strong> {selectedBooking.customer.emergencyContactNumber}</Typography>
                </Paper>
              </Grid>

              {/* Booking Information */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <BookOnline sx={{ mr: 1 }} /> Booking Information
                  </Typography>
                  <Typography><strong>Booking ID:</strong> {selectedBooking.id}</Typography>
                  <Typography><strong>Bed Type:</strong> {selectedBooking.bedType}</Typography>
                  <Typography><strong>Check-in:</strong> {selectedBooking.checkInDate}</Typography>
                  <Typography><strong>Check-out:</strong> {selectedBooking.checkOutDate}</Typography>
                  <Typography><strong>Stay Duration:</strong> {selectedBooking.stayDuration} days</Typography>
                  <Typography><strong>Daily Rate:</strong> ₹{selectedBooking.dailyRate}/day</Typography>
                  <Typography><strong>Total Amount:</strong> ₹{selectedBooking.totalAmount}</Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Special Requests</Typography>
                  <Typography>{selectedBooking.specialRequests}</Typography>
                </Paper>
              </Grid>

              {/* Booking History */}
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                      <History sx={{ mr: 1 }} /> Booking History
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {selectedBooking.bookingHistory.map((history, index) => (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: getStatusColor(history.status) + '.main' }}>
                              <CalendarToday />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={history.action}
                            secondary={
                              <Box>
                                <Typography variant="body2">
                                  Status: {history.status} | By: {history.by}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {history.date}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} /> Edit Booking
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Payment sx={{ mr: 1 }} /> Update Payment
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Cancel sx={{ mr: 1 }} /> Cancel Booking
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default BookingManagementPage;
