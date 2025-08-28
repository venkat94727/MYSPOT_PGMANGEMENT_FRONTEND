import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Button, Grid, Card, CardContent, 
  Avatar, Chip, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Menu, MenuItem, Tabs, Tab,
  List, ListItem, ListItemText, ListItemAvatar, Divider
} from '@mui/material';
import { 
  PersonAdd, People, AccountCircle, ContactPhone, Phone, Email,
  LocationOn, MoreVert, Visibility, Edit, Delete, CalendarToday,
  CheckCircle, Schedule, Person, Hotel
} from '@mui/icons-material';

const GuestManagementPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock guest data based on daily booking system
  const guests = [
    {
      id: 'CST001',
      fullName: 'John Doe',
      emailAddress: 'john.doe@email.com',
      mobileNumber: '+91 9876543210',
      dateOfBirth: '1995-06-15',
      gender: 'MALE',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      emergencyContactName: 'Jane Doe',
      emergencyContactNumber: '+91 9876543211',
      preferredLanguage: 'en',
      marketingConsent: true,
      // Daily booking info
      bedType: 'Single Sharing',
      checkInDate: '2024-09-01',
      checkOutDate: '2024-09-15',
      stayDuration: 14, // days
      dailyRate: 500,
      totalAmount: 7000,
      status: 'CHECKED_IN',
      joinedDate: '2024-09-01',
      lastPaymentDate: '2024-09-01',
      paymentStatus: 'PAID',
      // Activity history
      activityHistory: [
        { date: '2024-08-20', activity: 'Booking Created', type: 'BOOKING' },
        { date: '2024-09-01', activity: 'Checked In', type: 'CHECK_IN' },
        { date: '2024-09-01', activity: 'Payment Received - ₹7,000', type: 'PAYMENT' },
        { date: '2024-09-05', activity: 'Maintenance Request - AC Repair', type: 'REQUEST' }
      ]
    },
    {
      id: 'CST002',
      fullName: 'Sarah Johnson',
      emailAddress: 'sarah.johnson@email.com',
      mobileNumber: '+91 9876543220',
      dateOfBirth: '1993-03-22',
      gender: 'FEMALE',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      emergencyContactName: 'Mike Johnson',
      emergencyContactNumber: '+91 9876543221',
      preferredLanguage: 'en',
      marketingConsent: false,
      bedType: 'Double Sharing',
      checkInDate: '2024-08-25',
      checkOutDate: '2024-09-10',
      stayDuration: 16, // days
      dailyRate: 400,
      totalAmount: 6400,
      status: 'CHECKED_IN',
      joinedDate: '2024-08-25',
      lastPaymentDate: '2024-08-25',
      paymentStatus: 'PARTIAL',
      activityHistory: [
        { date: '2024-08-18', activity: 'Booking Created', type: 'BOOKING' },
        { date: '2024-08-25', activity: 'Checked In', type: 'CHECK_IN' },
        { date: '2024-08-25', activity: 'Partial Payment - ₹3,200', type: 'PAYMENT' },
        { date: '2024-08-30', activity: 'Food Service Request', type: 'REQUEST' }
      ]
    },
    {
      id: 'CST003',
      fullName: 'Mike Wilson',
      emailAddress: 'mike.wilson@email.com',
      mobileNumber: '+91 9876543230',
      dateOfBirth: '1994-11-08',
      gender: 'MALE',
      city: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India',
      emergencyContactName: 'Lisa Wilson',
      emergencyContactNumber: '+91 9876543231',
      preferredLanguage: 'en',
      marketingConsent: true,
      bedType: 'Triple Sharing',
      checkInDate: '2024-08-01',
      checkOutDate: '2024-08-15',
      stayDuration: 14, // days
      dailyRate: 300,
      totalAmount: 4200,
      status: 'CHECKED_OUT',
      joinedDate: '2024-08-01',
      lastPaymentDate: '2024-08-01',
      paymentStatus: 'PAID',
      activityHistory: [
        { date: '2024-07-15', activity: 'Booking Created', type: 'BOOKING' },
        { date: '2024-08-01', activity: 'Checked In', type: 'CHECK_IN' },
        { date: '2024-08-01', activity: 'Payment Received - ₹4,200', type: 'PAYMENT' },
        { date: '2024-08-15', activity: 'Checked Out', type: 'CHECK_OUT' }
      ]
    },
    {
      id: 'CST004',
      fullName: 'Emma Davis',
      emailAddress: 'emma.davis@email.com',
      mobileNumber: '+91 9876543240',
      dateOfBirth: '1996-09-12',
      gender: 'FEMALE',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      emergencyContactName: 'Tom Davis',
      emergencyContactNumber: '+91 9876543241',
      preferredLanguage: 'en',
      marketingConsent: false,
      bedType: null,
      checkInDate: null,
      checkOutDate: null,
      stayDuration: null,
      dailyRate: null,
      totalAmount: null,
      status: 'INQUIRY',
      joinedDate: '2024-08-20',
      lastPaymentDate: null,
      paymentStatus: 'PENDING',
      activityHistory: [
        { date: '2024-08-20', activity: 'Initial Inquiry', type: 'INQUIRY' },
        { date: '2024-08-21', activity: 'Property Visit Scheduled', type: 'VISIT' }
      ]
    },
    {
      id: 'CST005',
      fullName: 'Alex Kumar',
      emailAddress: 'alex.kumar@email.com',
      mobileNumber: '+91 9876543250',
      dateOfBirth: '1992-12-03',
      gender: 'MALE',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      emergencyContactName: 'Priya Kumar',
      emergencyContactNumber: '+91 9876543251',
      preferredLanguage: 'en',
      marketingConsent: true,
      bedType: 'Double Sharing',
      checkInDate: '2024-09-05',
      checkOutDate: '2024-09-12',
      stayDuration: 7, // days
      dailyRate: 400,
      totalAmount: 2800,
      status: 'CONFIRMED',
      joinedDate: '2024-08-25',
      lastPaymentDate: '2024-08-26',
      paymentStatus: 'PAID',
      activityHistory: [
        { date: '2024-08-25', activity: 'Booking Created', type: 'BOOKING' },
        { date: '2024-08-26', activity: 'Payment Received - ₹2,800', type: 'PAYMENT' },
        { date: '2024-08-27', activity: 'Booking Confirmed', type: 'CONFIRMATION' }
      ]
    }
  ];

  const getFilteredGuests = () => {
    switch (tabValue) {
      case 0: return guests; // All
      case 1: return guests.filter(g => g.status === 'CHECKED_IN'); // Current Guests
      case 2: return guests.filter(g => g.status === 'CONFIRMED'); // Upcoming
      case 3: return guests.filter(g => g.status === 'CHECKED_OUT'); // Former
      case 4: return guests.filter(g => g.status === 'INQUIRY'); // Inquiries
      default: return guests;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CHECKED_IN': return 'success';
      case 'CONFIRMED': return 'info';
      case 'CHECKED_OUT': return 'default';
      case 'INQUIRY': return 'warning';
      default: return 'default';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'PAID': return 'success';
      case 'PARTIAL': return 'warning';
      case 'PENDING': return 'error';
      default: return 'default';
    }
  };

  const handleViewDetails = (guest) => {
    setSelectedGuest(guest);
    setDetailsDialog(true);
  };

  const handleMenuClick = (event, guest) => {
    setAnchorEl(event.currentTarget);
    setSelectedGuest(guest);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedGuest(null);
  };

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
          Add New Guest
        </Button>
      </Box>

      {/* Guest Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <People sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Total Guests</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{guests.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Hotel sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Current Guests</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {guests.filter(g => g.status === 'CHECKED_IN').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <ContactPhone sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">New Inquiries</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {guests.filter(g => g.status === 'INQUIRY').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Guest Tabs */}
      <Paper>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Guests" />
          <Tab label="Current Guests" />
          <Tab label="Upcoming" />
          <Tab label="Former Guests" />
          <Tab label="Inquiries" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Guest Details</TableCell>
                  <TableCell>Contact Information</TableCell>
                  <TableCell>Stay Information</TableCell>
                  <TableCell>Amount & Duration</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredGuests().map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#2196F3' }}>
                          {guest.fullName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {guest.fullName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: {guest.id}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {guest.gender} • DOB: {guest.dateOfBirth}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {guest.city}, {guest.state}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        {guest.emailAddress}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        {guest.mobileNumber}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Emergency: {guest.emergencyContactName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {guest.emergencyContactNumber}
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      {guest.bedType ? (
                        <>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {guest.bedType}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Check-in: {guest.checkInDate}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Check-out: {guest.checkOutDate}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Daily Rate: ₹{guest.dailyRate}/day
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No booking yet
                        </Typography>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      {guest.totalAmount ? (
                        <>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            ₹{guest.totalAmount}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {guest.stayDuration} days
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {guest.stayDuration} × ₹{guest.dailyRate}
                          </Typography>
                          <Chip 
                            label={guest.paymentStatus} 
                            size="small" 
                            color={getPaymentStatusColor(guest.paymentStatus)}
                            variant="outlined"
                            sx={{ mt: 0.5 }}
                          />
                        </>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No amount yet
                        </Typography>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <Chip 
                        label={guest.status} 
                        size="small" 
                        color={getStatusColor(guest.status)}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <IconButton 
                        onClick={() => handleViewDetails(guest)}
                        color="primary"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        onClick={(e) => handleMenuClick(e, guest)}
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

      {/* Guest Details Dialog */}
      <Dialog 
        open={detailsDialog} 
        onClose={() => setDetailsDialog(false)}
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Guest Details - {selectedGuest?.fullName}</Typography>
            <Chip 
              label={selectedGuest?.status} 
              color={getStatusColor(selectedGuest?.status)}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedGuest && (
            <Grid container spacing={3}>
              {/* Personal Information */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1 }} /> Personal Information
                  </Typography>
                  <Typography><strong>Full Name:</strong> {selectedGuest.fullName}</Typography>
                  <Typography><strong>Email:</strong> {selectedGuest.emailAddress}</Typography>
                  <Typography><strong>Mobile:</strong> {selectedGuest.mobileNumber}</Typography>
                  <Typography><strong>Date of Birth:</strong> {selectedGuest.dateOfBirth}</Typography>
                  <Typography><strong>Gender:</strong> {selectedGuest.gender}</Typography>
                  <Typography><strong>Location:</strong> {selectedGuest.city}, {selectedGuest.state}, {selectedGuest.country}</Typography>
                  <Typography><strong>Language:</strong> {selectedGuest.preferredLanguage}</Typography>
                  <Typography><strong>Marketing Consent:</strong> {selectedGuest.marketingConsent ? 'Yes' : 'No'}</Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Emergency Contact</Typography>
                  <Typography><strong>Name:</strong> {selectedGuest.emergencyContactName}</Typography>
                  <Typography><strong>Phone:</strong> {selectedGuest.emergencyContactNumber}</Typography>
                </Paper>
              </Grid>

              {/* Stay Information */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Hotel sx={{ mr: 1 }} /> Stay Information
                  </Typography>
                  <Typography><strong>Guest ID:</strong> {selectedGuest.id}</Typography>
                  <Typography><strong>Status:</strong> {selectedGuest.status}</Typography>
                  <Typography><strong>Joined Date:</strong> {selectedGuest.joinedDate}</Typography>
                  
                  {selectedGuest.bedType && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography><strong>Bed Type:</strong> {selectedGuest.bedType}</Typography>
                      <Typography><strong>Check-in Date:</strong> {selectedGuest.checkInDate}</Typography>
                      <Typography><strong>Check-out Date:</strong> {selectedGuest.checkOutDate || 'Ongoing'}</Typography>
                      <Typography><strong>Stay Duration:</strong> {selectedGuest.stayDuration} days</Typography>
                      <Typography><strong>Daily Rate:</strong> ₹{selectedGuest.dailyRate}/day</Typography>
                      <Typography><strong>Total Amount:</strong> ₹{selectedGuest.totalAmount}</Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      <Typography><strong>Payment Status:</strong> {selectedGuest.paymentStatus}</Typography>
                      {selectedGuest.lastPaymentDate && (
                        <Typography><strong>Last Payment:</strong> {selectedGuest.lastPaymentDate}</Typography>
                      )}
                    </>
                  )}
                </Paper>
              </Grid>

              {/* Activity History */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ mr: 1 }} /> Activity History
                  </Typography>
                  <List>
                    {selectedGuest.activityHistory.map((activity, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: activity.type === 'CHECK_IN' ? 'success.main' : 
                                     activity.type === 'CHECK_OUT' ? 'error.main' :
                                     activity.type === 'PAYMENT' ? 'info.main' : 
                                     activity.type === 'BOOKING' ? 'primary.main' : 'warning.main',
                            width: 32, 
                            height: 32 
                          }}>
                            {activity.type === 'CHECK_IN' ? <CheckCircle sx={{ fontSize: 16 }} /> :
                             activity.type === 'CHECK_OUT' ? <Schedule sx={{ fontSize: 16 }} /> :
                             activity.type === 'PAYMENT' ? <ContactPhone sx={{ fontSize: 16 }} /> :
                             activity.type === 'BOOKING' ? <CalendarToday sx={{ fontSize: 16 }} /> :
                             <Person sx={{ fontSize: 16 }} />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={activity.activity}
                          secondary={activity.date}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
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
          <Edit sx={{ mr: 1 }} /> Edit Guest
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ContactPhone sx={{ mr: 1 }} /> Contact Guest
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <CalendarToday sx={{ mr: 1 }} /> View History
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} /> Remove Guest
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default GuestManagementPage;
