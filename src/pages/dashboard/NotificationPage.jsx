import React, { useState } from 'react';
import { 
  Box, Typography, Paper, List, ListItem, ListItemAvatar, ListItemText, 
  Avatar, Badge, IconButton, Tabs, Tab, Chip, Divider, Button, Menu, MenuItem
} from '@mui/material';
import { 
  Notifications, NotificationsActive, Person, Home, BookOnline, 
  Payment, Warning, CheckCircle, MoreVert, Delete, MarkEmailRead
} from '@mui/icons-material';

const NotificationPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: 'booking',
      title: 'New Booking Request',
      message: 'John Doe requested booking for Room A-101',
      time: '2 minutes ago',
      unread: true,
      avatar: <BookOnline />,
      color: '#2196F3'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of ₹15,000 received from Sarah Johnson',
      time: '1 hour ago',
      unread: true,
      avatar: <Payment />,
      color: '#4CAF50'
    },
    {
      id: 3,
      type: 'guest',
      title: 'Guest Check-in',
      message: 'Mike Wilson checked in to Room B-205',
      time: '3 hours ago',
      unread: false,
      avatar: <Person />,
      color: '#FF9800'
    },
    {
      id: 4,
      type: 'maintenance',
      title: 'Maintenance Request',
      message: 'AC repair needed in Room C-301',
      time: '5 hours ago',
      unread: true,
      avatar: <Warning />,
      color: '#f44336'
    },
    {
      id: 5,
      type: 'property',
      title: 'Property Update',
      message: 'Room A-102 is now available',
      time: '1 day ago',
      unread: false,
      avatar: <Home />,
      color: '#9C27B0'
    },
    {
      id: 6,
      type: 'system',
      title: 'Booking Confirmed',
      message: 'Emma Davis booking has been confirmed',
      time: '2 days ago',
      unread: false,
      avatar: <CheckCircle />,
      color: '#4CAF50'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getFilteredNotifications = () => {
    switch (tabValue) {
      case 0: return notifications; // All
      case 1: return notifications.filter(n => n.unread); // Unread
      case 2: return notifications.filter(n => n.type === 'booking'); // Bookings
      case 3: return notifications.filter(n => n.type === 'payment'); // Payments
      default: return notifications;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
          🔔 Welcome Notifications
        </Typography>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsActive sx={{ fontSize: 32, color: '#1976d2' }} />
        </Badge>
      </Box>

      {/* Notification Stats */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#2196F3' }}>
              {notifications.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Notifications
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#f44336' }}>
              {unreadCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Unread
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#4CAF50' }}>
              {notifications.filter(n => n.type === 'payment').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Payment Alerts
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#FF9800' }}>
              {notifications.filter(n => n.type === 'booking').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Booking Alerts
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Notifications" />
          <Tab label={`Unread (${unreadCount})`} />
          <Tab label="Bookings" />
          <Tab label="Payments" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button size="small" variant="outlined" startIcon={<MarkEmailRead />}>
              Mark All Read
            </Button>
            <Button size="small" variant="outlined" startIcon={<Delete />} color="error">
              Clear All
            </Button>
          </Box>

          <List>
            {getFilteredNotifications().map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    bgcolor: notification.unread ? 'rgba(33, 150, 243, 0.05)' : 'transparent',
                    borderRadius: 2,
                    mb: 1,
                    border: notification.unread ? '1px solid rgba(33, 150, 243, 0.2)' : 'none'
                  }}
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {notification.unread && (
                        <Chip 
                          label="New" 
                          size="small" 
                          color="primary" 
                          sx={{ height: 20, fontSize: '0.75rem' }} 
                        />
                      )}
                      <IconButton onClick={handleMenuClick}>
                        <MoreVert />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: notification.color }}>
                      {notification.avatar}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: notification.unread ? 600 : 400 
                      }}>
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="primary">
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < getFilteredNotifications().length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <MarkEmailRead sx={{ mr: 1 }} /> Mark as Read
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Delete sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </Menu>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotificationPage;
