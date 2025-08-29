import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  PlayArrow as ActivateIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';

const BookingManagementPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Sample booking data - includes cross-month stays
  const [bookings, setBookings] = useState([
    {
      id: 'BK001',
      guestName: 'John Doe',
      roomType: 'Single Sharing',
      checkIn: '2024-08-28', // Starts in August
      checkOut: '2024-11-05', // Ends in November (cross-month)
      amount: 18000,
      status: 'confirmed',
      bookingDate: '2024-08-15',
      contactNumber: '+91 9876543210',
      paymentStatus: 'paid'
    },
    {
      id: 'BK002',
      guestName: 'Jane Smith',
      roomType: 'Double Sharing',
      checkIn: '2024-09-25', // Starts in September
      checkOut: '2024-10-10', // Ends in October (cross-month)
      amount: 12000,
      status: 'pending',
      bookingDate: '2024-08-20',
      contactNumber: '+91 9876543211',
      paymentStatus: 'pending'
    },
    {
      id: 'BK003',
      guestName: 'Mike Johnson',
      roomType: 'Triple Sharing',
      checkIn: '2024-10-01',
      checkOut: '2024-11-01',
      amount: 9000,
      status: 'completed',
      bookingDate: '2024-09-15',
      contactNumber: '+91 9876543212',
      paymentStatus: 'paid'
    },
    {
      id: 'BK004',
      guestName: 'Sarah Wilson',
      roomType: 'Single Sharing',
      checkIn: '2024-07-29', // Starts in July
      checkOut: '2024-08-15', // Ends in August (cross-month)
      amount: 18000,
      status: 'completed',
      bookingDate: '2024-07-20',
      contactNumber: '+91 9876543213',
      paymentStatus: 'paid'
    },
    {
      id: 'BK005',
      guestName: 'David Brown',
      roomType: 'Double Sharing',
      checkIn: '2024-11-28', // Starts in November
      checkOut: '2024-12-15', // Ends in December (cross-month)
      amount: 12000,
      status: 'activate',
      bookingDate: '2024-10-18',
      contactNumber: '+91 9876543214',
      paymentStatus: 'paid'
    },
    {
      id: 'BK006',
      guestName: 'Emily Davis',
      roomType: 'Triple Sharing',
      checkIn: '2024-08-15',
      checkOut: '2024-09-15',
      amount: 9000,
      status: 'completed',
      bookingDate: '2024-07-20',
      contactNumber: '+91 9876543215',
      paymentStatus: 'paid'
    }
  ]);

  // Generate month options for the filter
  const getMonthOptions = () => {
    const months = [
      { value: 'all', label: 'All Months' },
      { value: '2024-07', label: 'July 2024' },
      { value: '2024-08', label: 'August 2024' },
      { value: '2024-09', label: 'September 2024' },
      { value: '2024-10', label: 'October 2024' },
      { value: '2024-11', label: 'November 2024' },
      { value: '2024-12', label: 'December 2024' },
      { value: '2025-01', label: 'January 2025' }
    ];
    return months;
  };

  // Check if booking is active in selected month (handles cross-month stays)
  const isBookingActiveInMonth = (booking, month) => {
    if (month === 'all') return true;

    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const [year, monthNum] = month.split('-');
    const monthStart = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
    const monthEnd = new Date(parseInt(year), parseInt(monthNum), 0);

    // Booking is active in month if it overlaps with the month
    return checkIn <= monthEnd && checkOut >= monthStart;
  };

  // Filter bookings based on month (includes cross-month stays)
  const getFilteredBookingsByMonth = () => {
    if (filterMonth === 'all') return bookings;

    return bookings.filter(booking => isBookingActiveInMonth(booking, filterMonth));
  };

  const filteredBookings = getFilteredBookingsByMonth().filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats based on filtered month data
  const monthFilteredBookings = getFilteredBookingsByMonth();
  const stats = {
    total: monthFilteredBookings.length,
    pending: monthFilteredBookings.filter(b => b.status === 'pending').length,
    completed: monthFilteredBookings.filter(b => b.status === 'completed').length,
    cancelled: monthFilteredBookings.filter(b => b.status === 'cancelled').length,
    activate: monthFilteredBookings.filter(b => b.status === 'activate').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      case 'activate': return 'primary';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircleIcon />;
      case 'pending': return <ScheduleIcon />;
      case 'completed': return <CheckCircleIcon />;
      case 'cancelled': return <CancelIcon />;
      case 'activate': return <ActivateIcon />;
      default: return <PersonIcon />;
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  // Get selected month display name
  const getSelectedMonthName = () => {
    const monthOptions = getMonthOptions();
    const selected = monthOptions.find(month => month.value === filterMonth);
    return selected ? selected.label : 'All Months';
  };

  // Get days in selected month for a booking
  const getDaysInMonth = (booking, month) => {
    if (month === 'all') return '';

    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const [year, monthNum] = month.split('-');
    const monthStart = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
    const monthEnd = new Date(parseInt(year), parseInt(monthNum), 0);

    const stayStart = checkIn > monthStart ? checkIn : monthStart;
    const stayEnd = checkOut < monthEnd ? checkOut : monthEnd;

    const diffTime = stayEnd - stayStart;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return days > 0 ? ` (${days} days this month)` : '';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
          📋 Booking Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', opacity: 0.9 }}>
          Manage all PG bookings and reservations - {getSelectedMonthName()}
        </Typography>
      </Paper>

      {/* Stats Cards - CALCULATED BASED ON SELECTED MONTH */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* TOTAL BOOKINGS */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.total}</Typography>
                  <Typography variant="body2">Total Bookings</Typography>
                  {filterMonth !== 'all' && (
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      Active in {getSelectedMonthName()}
                    </Typography>
                  )}
                </Box>
                <PersonIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* PENDING */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#8B4513' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.pending}</Typography>
                  <Typography variant="body2">Pending</Typography>
                  {filterMonth !== 'all' && (
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      This month
                    </Typography>
                  )}
                </Box>
                <ScheduleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* COMPLETED */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', color: '#2E8B57' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.completed}</Typography>
                  <Typography variant="body2">Completed</Typography>
                  {filterMonth !== 'all' && (
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      This month
                    </Typography>
                  )}
                </Box>
                <CheckCircleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* CANCELLED */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)', color: '#D2691E' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.cancelled}</Typography>
                  <Typography variant="body2">Cancelled</Typography>
                  {filterMonth !== 'all' && (
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      This month
                    </Typography>
                  )}
                </Box>
                <CancelIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ACTIVATE */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.activate}</Typography>
                  <Typography variant="body2">Activate</Typography>
                  {filterMonth !== 'all' && (
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      This month
                    </Typography>
                  )}
                </Box>
                <ActivateIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by guest name or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <FormControl fullWidth>
              <InputLabel>Filter by Month</InputLabel>
              <Select
                value={filterMonth}
                label="Filter by Month"
                onChange={(e) => setFilterMonth(e.target.value)}
                startAdornment={<DateRangeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                {getMonthOptions().map(month => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2.5}>
            <FormControl fullWidth>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={filterStatus}
                label="Filter by Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="activate">Activate</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              startIcon={<FilterIcon />}
              onClick={() => {
                setFilterMonth('all');
                setFilterStatus('all');
                setSearchTerm('');
              }}
              sx={{ height: '56px', width: '100%' }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Bookings Table */}
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Booking ID</strong></TableCell>
                <TableCell><strong>Guest Name</strong></TableCell>
                <TableCell><strong>Room Type</strong></TableCell>
                <TableCell><strong>Check-in</strong></TableCell>
                <TableCell><strong>Check-out</strong></TableCell>
                <TableCell><strong>Booking Date</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Payment</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id} hover>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                        {booking.guestName.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {booking.guestName}
                        </Typography>
                        {filterMonth !== 'all' && (
                          <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold' }}>
                            {getDaysInMonth(booking, filterMonth)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{booking.roomType}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>₹{booking.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(booking.status)}
                      label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      color={getStatusColor(booking.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={booking.paymentStatus}
                      color={booking.paymentStatus === 'paid' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewBooking(booking)}
                      size="small"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton color="secondary" size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredBookings.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <DateRangeIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No bookings found for {getSelectedMonthName()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try selecting a different month or clearing the filters
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Booking Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Booking Details - {selectedBooking?.id}
        </DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Guest Information</Typography>
                <Typography><strong>Name:</strong> {selectedBooking.guestName}</Typography>
                <Typography><strong>Contact:</strong> {selectedBooking.contactNumber}</Typography>
                <Typography><strong>Booking Date:</strong> {new Date(selectedBooking.bookingDate).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Booking Details</Typography>
                <Typography><strong>Room Type:</strong> {selectedBooking.roomType}</Typography>
                <Typography><strong>Check-in:</strong> {new Date(selectedBooking.checkIn).toLocaleDateString()}</Typography>
                <Typography><strong>Check-out:</strong> {new Date(selectedBooking.checkOut).toLocaleDateString()}</Typography>
                <Typography><strong>Amount:</strong> ₹{selectedBooking.amount.toLocaleString()}</Typography>
                <Typography><strong>Status:</strong> 
                  <Chip
                    label={selectedBooking.status}
                    color={getStatusColor(selectedBooking.status)}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {selectedBooking && selectedBooking.status === 'pending' && (
            <>
              <Button
                onClick={() => {
                  updateBookingStatus(selectedBooking.id, 'confirmed');
                  handleCloseDialog();
                }}
                color="success"
                variant="contained"
              >
                Confirm Booking
              </Button>
              <Button
                onClick={() => {
                  updateBookingStatus(selectedBooking.id, 'activate');
                  handleCloseDialog();
                }}
                color="primary"
                variant="contained"
              >
                Activate
              </Button>
            </>
          )}
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingManagementPage;