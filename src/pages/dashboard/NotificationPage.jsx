import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  Button,
  Divider,
  Badge,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  Build as MaintenanceIcon,
  Security as SecurityIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkReadIcon,
  Settings as SettingsIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  // Updated notification data - removed payment related notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'N001',
      title: 'New Guest Check-in',
      message: 'John Doe has checked into Room R101. Welcome message sent.',
      category: 'guest',
      type: 'info',
      timestamp: '2024-08-29 10:30 AM',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 'N002',
      title: 'Guest Check-out',
      message: 'Sarah Wilson has checked out from Room R104. Room inspection scheduled.',
      category: 'guest',
      type: 'info',
      timestamp: '2024-08-29 09:15 AM',
      isRead: true,
      priority: 'low'
    },
    {
      id: 'N003',
      title: 'Maintenance Request',
      message: 'AC repair requested for Room R102. Maintenance team assigned.',
      category: 'maintenance',
      type: 'warning',
      timestamp: '2024-08-29 08:45 AM',
      isRead: false,
      priority: 'high'
    },
    {
      id: 'N004',
      title: 'Security Alert',
      message: 'Late entry detected at 11:45 PM. Guest ID verified.',
      category: 'security',
      type: 'warning',
      timestamp: '2024-08-28 11:45 PM',
      isRead: false,
      priority: 'high'
    },
    {
      id: 'N005',
      title: 'Room Cleaning Completed',
      message: 'Deep cleaning completed for Room R103. Ready for next guest.',
      category: 'maintenance',
      type: 'success',
      timestamp: '2024-08-28 05:30 PM',
      isRead: true,
      priority: 'low'
    },
    {
      id: 'N006',
      title: 'Booking Confirmed',
      message: 'New booking confirmed for David Brown. Check-in: Sept 5, 2024.',
      category: 'booking',
      type: 'success',
      timestamp: '2024-08-28 02:20 PM',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 'N007',
      title: 'Guest Inquiry',
      message: 'Emily Davis inquired about double sharing room availability.',
      category: 'guest',
      type: 'info',
      timestamp: '2024-08-28 01:10 PM',
      isRead: true,
      priority: 'low'
    },
    {
      id: 'N008',
      title: 'System Update',
      message: 'PG Management system updated successfully. New features available.',
      category: 'system',
      type: 'info',
      timestamp: '2024-08-27 11:00 PM',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 'N009',
      title: 'Monthly Report Ready',
      message: 'August monthly report generated and ready for review.',
      category: 'system',
      type: 'info',
      timestamp: '2024-08-27 06:00 PM',
      isRead: true,
      priority: 'low'
    }
  ]);

  // Notification categories (removed payment)
  const categories = [
    { value: 'all', label: 'All Notifications', icon: <NotificationsIcon /> },
    { value: 'guest', label: 'Guest Related', icon: <PersonIcon /> },
    { value: 'booking', label: 'Bookings', icon: <ScheduleIcon /> },
    { value: 'maintenance', label: 'Maintenance', icon: <MaintenanceIcon /> },
    { value: 'security', label: 'Security', icon: <SecurityIcon /> },
    { value: 'system', label: 'System', icon: <InfoIcon /> }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'guest': return <PersonIcon />;
      case 'booking': return <ScheduleIcon />;
      case 'maintenance': return <MaintenanceIcon />;
      case 'security': return <SecurityIcon />;
      case 'system': return <InfoIcon />;
      default: return <NotificationsIcon />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'guest': return '#2196F3';
      case 'booking': return '#4CAF50';
      case 'maintenance': return '#FF9800';
      case 'security': return '#F44336';
      case 'system': return '#9C27B0';
      default: return '#757575';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircleIcon color="success" />;
      case 'warning': return <WarningIcon color="warning" />;
      case 'error': return <WarningIcon color="error" />;
      default: return <InfoIcon color="info" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesCategory = filterCategory === 'all' || notification.category === filterCategory;
    const matchesReadStatus = !showUnreadOnly || !notification.isRead;
    const matchesTab = activeTab === 0 || 
                      (activeTab === 1 && !notification.isRead) ||
                      (activeTab === 2 && notification.isRead);
    return matchesCategory && matchesReadStatus && matchesTab;
  });

  // Calculate stats
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    read: notifications.filter(n => n.isRead).length,
    high: notifications.filter(n => n.priority === 'high').length
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.abs(now - notificationTime) / 36e5;

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
              🔔 Notifications
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', opacity: 0.9 }}>
              Stay updated with PG activities and alerts
            </Typography>
          </Box>
          <IconButton
            sx={{ color: 'white' }}
            onClick={() => setOpenSettings(true)}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 200, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent sx={{ pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.total}</Typography>
                <Typography variant="body2">Total</Typography>
              </Box>
              <NotificationsIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', color: '#8B4513' }}>
          <CardContent sx={{ pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.unread}</Typography>
                <Typography variant="body2">Unread</Typography>
              </Box>
              <Badge badgeContent={stats.unread} color="error">
                <MarkReadIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Badge>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200, background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', color: '#2E8B57' }}>
          <CardContent sx={{ pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.high}</Typography>
                <Typography variant="body2">High Priority</Typography>
              </Box>
              <WarningIcon sx={{ fontSize: 40, opacity: 0.8 }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Filter Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filterCategory}
              label="Category"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <MenuItem key={category.value} value={category.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {category.icon}
                    {category.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
              />
            }
            label="Show unread only"
          />

          <Button
            variant="contained"
            onClick={markAllAsRead}
            disabled={stats.unread === 0}
          >
            Mark All as Read
          </Button>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label={`All (${notifications.length})`} />
          <Tab 
            label={
              <Badge badgeContent={stats.unread} color="error">
                <Box sx={{ pl: stats.unread > 0 ? 2 : 0 }}>Unread ({stats.unread})</Box>
              </Badge>
            } 
          />
          <Tab label={`Read (${stats.read})`} />
        </Tabs>
      </Paper>

      {/* Notifications List */}
      <Paper>
        <List>
          {filteredNotifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  backgroundColor: notification.isRead ? 'transparent' : 'rgba(33, 150, 243, 0.04)',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: getCategoryColor(notification.category) }}>
                    {getCategoryIcon(notification.category)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: notification.isRead ? 'normal' : 'bold' }}
                      >
                        {notification.title}
                      </Typography>
                      <Chip
                        label={notification.priority}
                        size="small"
                        color={getPriorityColor(notification.priority)}
                      />
                      {!notification.isRead && (
                        <Chip label="New" size="small" color="primary" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {notification.message}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getTypeIcon(notification.type)}
                        <Typography variant="caption" color="text.secondary">
                          {getTimeAgo(notification.timestamp)}
                        </Typography>
                        <Chip
                          label={notification.category}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {!notification.isRead && (
                    <IconButton
                      color="primary"
                      onClick={() => markAsRead(notification.id)}
                      size="small"
                    >
                      <MarkReadIcon />
                    </IconButton>
                  )}
                  <IconButton
                    color="error"
                    onClick={() => deleteNotification(notification.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
              {index < filteredNotifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {filteredNotifications.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <NotificationsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No notifications found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {showUnreadOnly ? 'All notifications have been read' : 'Check back later for updates'}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Settings Dialog */}
      <Dialog open={openSettings} onClose={() => setOpenSettings(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Notification Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Notification Categories</Typography>
            {categories.slice(1).map(category => (
              <FormControlLabel
                key={category.value}
                control={<Switch defaultChecked />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {category.icon}
                    {category.label}
                  </Box>
                }
                sx={{ display: 'block', mb: 1 }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettings(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenSettings(false)}>
            Save Settings
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationPage;