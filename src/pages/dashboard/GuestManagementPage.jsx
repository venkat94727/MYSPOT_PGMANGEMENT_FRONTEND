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
  Divider,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Schedule as ScheduleIcon,
  ExitToApp as ExitToAppIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
  Hotel as HotelIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';

const GuestManagementPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  // Room type pricing structure - DAILY RATES (NO SECURITY DEPOSIT)
  const roomTypePricing = {
    'Single Sharing': { dailyRate: 600 },
    'Double Sharing': { dailyRate: 400 },
    'Triple Sharing': { dailyRate: 300 },
    'Quad Sharing': { dailyRate: 250 }
  };

  // New guest form data
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: '',
    checkInDate: '',
    checkOutDate: '',
    emergencyContact: ''
  });

  // Sample guest data - includes cross-month stays
  const [guests, setGuests] = useState([
    {
      id: 'G001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+91 9876543210',
      roomType: 'Single Sharing',
      checkInDate: '2024-07-28', // Starts in July
      checkOutDate: '2024-09-05', // Ends in September (cross-month)
      status: 'current',
      dailyRate: 600,
      totalDays: 39,
      totalAmount: 23400,
      emergencyContact: '+91 9876543299'
    },
    {
      id: 'G002',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+91 9876543211',
      roomType: 'Double Sharing',
      checkInDate: '2024-08-25', // Starts in August
      checkOutDate: '2024-10-10', // Ends in October (cross-month)
      status: 'current',
      dailyRate: 400,
      totalDays: 46,
      totalAmount: 18400,
      emergencyContact: '+91 9876543298'
    },
    {
      id: 'G003',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+91 9876543212',
      roomType: 'Triple Sharing',
      checkInDate: '2024-10-28', // Starts in October
      checkOutDate: '2024-11-15', // Ends in November (cross-month)
      status: 'upcoming',
      dailyRate: 300,
      totalDays: 18,
      totalAmount: 5400,
      emergencyContact: '+91 9876543297'
    },
    {
      id: 'G004',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+91 9876543213',
      roomType: 'Single Sharing',
      checkInDate: '2024-06-15',
      checkOutDate: '2024-07-15',
      status: 'former',
      dailyRate: 600,
      totalDays: 30,
      totalAmount: 18000,
      emergencyContact: '+91 9876543296'
    },
    {
      id: 'G005',
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+91 9876543214',
      roomType: 'Double Sharing',
      checkInDate: '2024-11-25', // Starts in November
      checkOutDate: '2025-01-15', // Ends in January (cross-month)
      status: 'upcoming',
      dailyRate: 400,
      totalDays: 51,
      totalAmount: 20400,
      emergencyContact: '+91 9876543295'
    },
    {
      id: 'G006',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+91 9876543215',
      roomType: 'Triple Sharing',
      checkInDate: '2024-05-20',
      checkOutDate: '2024-06-20',
      status: 'former',
      dailyRate: 300,
      totalDays: 31,
      totalAmount: 9300,
      emergencyContact: '+91 9876543294'
    }
  ]);

  // Generate month options for the filter
  const getMonthOptions = () => {
    const months = [
      { value: 'all', label: 'All Months' },
      { value: '2024-05', label: 'May 2024' },
      { value: '2024-06', label: 'June 2024' },
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

  // Check if guest is active in selected month (handles cross-month stays)
  const isGuestActiveInMonth = (guest, month) => {
    if (month === 'all') return true;

    const checkIn = new Date(guest.checkInDate);
    const checkOut = new Date(guest.checkOutDate);
    const [year, monthNum] = month.split('-');
    const monthStart = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
    const monthEnd = new Date(parseInt(year), parseInt(monthNum), 0);

    // Guest is active in month if their stay overlaps with the month
    return checkIn <= monthEnd && checkOut >= monthStart;
  };

  // Filter guests based on month (includes cross-month stays)
  const getFilteredGuestsByMonth = () => {
    if (filterMonth === 'all') return guests;

    return guests.filter(guest => isGuestActiveInMonth(guest, filterMonth));
  };

  const filteredGuests = getFilteredGuestsByMonth().filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || guest.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats based on filtered month data
  const monthFilteredGuests = getFilteredGuestsByMonth();
  const stats = {
    total: monthFilteredGuests.length,
    current: monthFilteredGuests.filter(g => g.status === 'current').length,
    upcoming: monthFilteredGuests.filter(g => g.status === 'upcoming').length,
    former: monthFilteredGuests.filter(g => g.status === 'former').length
  };

  // Auto-calculate daily rate and total amount - NO SECURITY DEPOSIT
  const getCalculatedAmounts = () => {
    if (!newGuest.roomType) {
      return { dailyRate: 0, totalDays: 0, totalAmount: 0 };
    }

    const pricing = roomTypePricing[newGuest.roomType];
    let totalDays = 0;
    let totalAmount = 0;

    if (newGuest.checkInDate && newGuest.checkOutDate) {
      const checkIn = new Date(newGuest.checkInDate);
      const checkOut = new Date(newGuest.checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      totalAmount = pricing.dailyRate * totalDays;
    }

    return {
      dailyRate: pricing.dailyRate,
      totalDays: totalDays,
      totalAmount: totalAmount
    };
  };

  const calculatedAmounts = getCalculatedAmounts();

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'success';
      case 'upcoming': return 'warning';
      case 'former': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'current': return <PersonIcon />;
      case 'upcoming': return <ScheduleIcon />;
      case 'former': return <ExitToAppIcon />;
      default: return <PersonIcon />;
    }
  };

  const handleViewGuest = (guest) => {
    setSelectedGuest(guest);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedGuest(null);
  };

  // Add New Guest functions
  const handleAddGuest = () => {
    setNewGuest({
      name: '',
      email: '',
      phone: '',
      roomType: '',
      checkInDate: '',
      checkOutDate: '',
      emergencyContact: ''
    });
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewGuest({
      name: '',
      email: '',
      phone: '',
      roomType: '',
      checkInDate: '',
      checkOutDate: '',
      emergencyContact: ''
    });
  };

  const handleNewGuestChange = (field, value) => {
    setNewGuest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveNewGuest = () => {
    const newId = 'G' + String(guests.length + 1).padStart(3, '0');

    const today = new Date();
    const checkIn = new Date(newGuest.checkInDate);
    const checkOut = new Date(newGuest.checkOutDate);

    let status = 'upcoming';
    if (checkIn <= today && checkOut >= today) {
      status = 'current';
    } else if (checkOut < today) {
      status = 'former';
    }

    const amounts = getCalculatedAmounts();

    const guestToAdd = {
      id: newId,
      ...newGuest,
      status: status,
      dailyRate: amounts.dailyRate,
      totalDays: amounts.totalDays,
      totalAmount: amounts.totalAmount
    };

    setGuests(prev => [...prev, guestToAdd]);
    handleCloseAddDialog();

    alert(`Guest added successfully!\nDaily Rate: ₹${amounts.dailyRate}\nTotal Days: ${amounts.totalDays}\nTotal Amount: ₹${amounts.totalAmount.toLocaleString()}`);
  };

  const getTabData = () => {
    switch (activeTab) {
      case 0: return filteredGuests; // All
      case 1: return filteredGuests.filter(g => g.status === 'current');
      case 2: return filteredGuests.filter(g => g.status === 'upcoming');
      case 3: return filteredGuests.filter(g => g.status === 'former');
      default: return filteredGuests;
    }
  };

  // Get selected month display name
  const getSelectedMonthName = () => {
    const monthOptions = getMonthOptions();
    const selected = monthOptions.find(month => month.value === filterMonth);
    return selected ? selected.label : 'All Months';
  };

  // Get days in selected month for a guest
  const getDaysInMonth = (guest, month) => {
    if (month === 'all') return '';

    const checkIn = new Date(guest.checkInDate);
    const checkOut = new Date(guest.checkOutDate);
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
          👥 Guest Management
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', opacity: 0.9 }}>
          Manage PG guests - {getSelectedMonthName()}
        </Typography>
      </Paper>

      {/* Stats Cards - CALCULATED BASED ON SELECTED MONTH */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.total}</Typography>
                  <Typography variant="body2">Total Guests</Typography>
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

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', color: '#2E8B57' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.current}</Typography>
                  <Typography variant="body2">Current Guests</Typography>
                  {filterMonth !== 'all' && (
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      This month
                    </Typography>
                  )}
                </Box>
                <PersonIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#8B4513' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.upcoming}</Typography>
                  <Typography variant="body2">Upcoming Guests</Typography>
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

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', color: '#6B46C1' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.former}</Typography>
                  <Typography variant="body2">Former Guests</Typography>
                  {filterMonth !== 'all' && (
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      This month
                    </Typography>
                  )}
                </Box>
                <ExitToAppIcon sx={{ fontSize: 40, opacity: 0.8 }} />
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
              placeholder="Search by name, email, or phone..."
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
                <MenuItem value="current">Current Guests</MenuItem>
                <MenuItem value="upcoming">Upcoming Guests</MenuItem>
                <MenuItem value="former">Former Guests</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={handleAddGuest}
              sx={{ height: '56px', width: '100%' }}
            >
              Add New Guest
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Clear Filters Button */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          onClick={() => {
            setFilterMonth('all');
            setFilterStatus('all');
            setSearchTerm('');
          }}
          sx={{ mr: 1 }}
        >
          Clear Filters
        </Button>
      </Box>

      {/* Tabs for guest categories */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label={`All Guests (${stats.total})`} />
          <Tab label={`Current (${stats.current})`} />
          <Tab label={`Upcoming (${stats.upcoming})`} />
          <Tab label={`Former (${stats.former})`} />
        </Tabs>
      </Paper>

      {/* Guests Table */}
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Guest ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Room Type</strong></TableCell>
                <TableCell><strong>Contact</strong></TableCell>
                <TableCell><strong>Check-in</strong></TableCell>
                <TableCell><strong>Check-out</strong></TableCell>
                <TableCell><strong>Days</strong></TableCell>
                <TableCell><strong>Daily Rate</strong></TableCell>
                <TableCell><strong>Total Amount</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getTabData().map((guest) => (
                <TableRow key={guest.id} hover>
                  <TableCell>{guest.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                        {guest.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{guest.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{guest.email}</Typography>
                        {filterMonth !== 'all' && (
                          <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold', display: 'block' }}>
                            {getDaysInMonth(guest, filterMonth)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{guest.roomType}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <PhoneIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption">{guest.phone}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {new Date(guest.checkInDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>{new Date(guest.checkOutDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{guest.totalDays || 0} days</Typography>
                  </TableCell>
                  <TableCell>₹{guest.dailyRate || 0}/day</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                      ₹{(guest.totalAmount || 0).toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(guest.status)}
                      label={guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                      color={getStatusColor(guest.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewGuest(guest)}
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

        {getTabData().length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <DateRangeIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No guests found for {getSelectedMonthName()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try selecting a different month or clearing the filters
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Guest Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Guest Details - {selectedGuest?.name}
        </DialogTitle>
        <DialogContent>
          {selectedGuest && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Personal Information</Typography>
                <Typography><strong>Name:</strong> {selectedGuest.name}</Typography>
                <Typography><strong>Email:</strong> {selectedGuest.email}</Typography>
                <Typography><strong>Phone:</strong> {selectedGuest.phone}</Typography>
                <Typography><strong>Emergency Contact:</strong> {selectedGuest.emergencyContact}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Stay & Payment Details</Typography>
                <Typography><strong>Room Type:</strong> {selectedGuest.roomType}</Typography>
                <Typography><strong>Check-in:</strong> {new Date(selectedGuest.checkInDate).toLocaleDateString()}</Typography>
                <Typography><strong>Check-out:</strong> {new Date(selectedGuest.checkOutDate).toLocaleDateString()}</Typography>
                <Typography><strong>Total Days:</strong> {selectedGuest.totalDays || 0} days</Typography>
                <Typography><strong>Daily Rate:</strong> ₹{selectedGuest.dailyRate || 0}/day</Typography>
                <Typography><strong>Total Amount:</strong> ₹{(selectedGuest.totalAmount || 0).toLocaleString()}</Typography>
                <Typography><strong>Status:</strong> 
                  <Chip
                    label={selectedGuest.status}
                    color={getStatusColor(selectedGuest.status)}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button variant="contained" color="primary">
            Edit Guest
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Guest Dialog - REMOVED DEPOSIT LINE */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HotelIcon />
            Add New Guest
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Guest Name *"
                value={newGuest.name}
                onChange={(e) => handleNewGuestChange('name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email *"
                type="email"
                value={newGuest.email}
                onChange={(e) => handleNewGuestChange('email', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number *"
                value={newGuest.phone}
                onChange={(e) => handleNewGuestChange('phone', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Room Type</InputLabel>
                <Select
                  value={newGuest.roomType}
                  label="Room Type"
                  onChange={(e) => handleNewGuestChange('roomType', e.target.value)}
                >
                  <MenuItem value="Single Sharing">Single Sharing (₹600/day)</MenuItem>
                  <MenuItem value="Double Sharing">Double Sharing (₹400/day)</MenuItem>
                  <MenuItem value="Triple Sharing">Triple Sharing (₹300/day)</MenuItem>
                  <MenuItem value="Quad Sharing">Quad Sharing (₹250/day)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Check-in Date *"
                type="date"
                value={newGuest.checkInDate}
                onChange={(e) => handleNewGuestChange('checkInDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Check-out Date *"
                type="date"
                value={newGuest.checkOutDate}
                onChange={(e) => handleNewGuestChange('checkOutDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emergency Contact"
                value={newGuest.emergencyContact}
                onChange={(e) => handleNewGuestChange('emergencyContact', e.target.value)}
              />
            </Grid>

            {/* SIMPLIFIED Calculated Amount Display */}
            {newGuest.roomType && calculatedAmounts.totalDays > 0 && (
              <Grid item xs={12}>
                <Alert severity="success" icon={<HotelIcon />}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
                    💰 Payment Calculation
                  </Typography>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={4}>
                      <Typography variant="body2"><strong>Daily Rate:</strong></Typography>
                      <Typography variant="h5" color="primary">₹{calculatedAmounts.dailyRate}/day</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="text.secondary">×</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2"><strong>Total Days:</strong></Typography>
                      <Typography variant="h5" color="info.main">{calculatedAmounts.totalDays} days</Typography>
                    </Grid>
                    <Grid item xs={1} sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="text.secondary">=</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body2"><strong>Total Amount:</strong></Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        ₹{calculatedAmounts.totalAmount.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ textAlign: 'center', bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Formula: ₹{calculatedAmounts.dailyRate} × {calculatedAmounts.totalDays} days = ₹{calculatedAmounts.totalAmount.toLocaleString()}
                    </Typography>
                  </Box>
                </Alert>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseAddDialog}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveNewGuest}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={!newGuest.name || !newGuest.email || !newGuest.phone || !newGuest.roomType || !newGuest.checkInDate || !newGuest.checkOutDate}
          >
            Save Guest
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GuestManagementPage;