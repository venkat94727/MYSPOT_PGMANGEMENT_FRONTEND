import React, { useState } from 'react';
import { 
  Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, Badge, IconButton, Tooltip 
} from '@mui/material';
import { 
  Dashboard, 
  Home, 
  BookOnline, 
  People, 
  Analytics, 
  Settings,
  Logout,
  Notifications,
  Reviews,
  Menu,
  MenuOpen
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const expandedDrawerWidth = 280;
const collapsedDrawerWidth = 70;


 const handleLogout = () => {
    logout();
    navigate('/login');
  };

const menuItems = [
  { text: 'Dashboard Overview', icon: <Dashboard />, path: '/dashboard/overview' },
  { text: 'PG Management', icon: <Home />, path: '/dashboard/pg-management' },
  { text: 'Booking Management', icon: <BookOnline />, path: '/dashboard/bookings' },
  { text: 'Guest Management', icon: <People />, path: '/dashboard/guests' },
  { text: 'Analytics', icon: <Analytics />, path: '/dashboard/analytics' },
  { 
    text: 'Notifications', 
    icon: <Badge badgeContent={5} color="error"><Notifications /></Badge>, 
    path: '/dashboard/notifications' 
  },
  { text: 'Customer Reviews', icon: <Reviews />, path: '/dashboard/reviews' },
  { text: 'Profile Settings', icon: <Settings />, path: '/dashboard/profile' },
];

const WelcomeDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const drawerWidth = sidebarExpanded ? expandedDrawerWidth : collapsedDrawerWidth;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            🏠 MySpot PG Management
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: (theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar>
          {/* Toggle Button */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: sidebarExpanded ? 'flex-end' : 'center',
            width: '100%',
            pr: sidebarExpanded ? 1 : 0 
          }}>
            <Tooltip title={sidebarExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'} placement="right">
              <IconButton 
                onClick={toggleSidebar}
                sx={{ 
                  color: '#1976d2',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.1)'
                  }
                }}
              >
                {sidebarExpanded ? <MenuOpen /> : <Menu />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>

        <Box sx={{ overflow: 'auto', mt: 1 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <Tooltip 
                  title={!sidebarExpanded ? item.text : ''} 
                  placement="right"
                  arrow
                >
                  <ListItemButton 
                    onClick={() => handleNavigation(item.path)}
                    selected={location.pathname === item.path}
                    sx={{ 
                      mx: sidebarExpanded ? 1 : 0.5,
                      borderRadius: 2,
                      mb: 0.5,
                      minHeight: 48,
                      justifyContent: sidebarExpanded ? 'initial' : 'center',
                      px: sidebarExpanded ? 2 : 1,
                      '&.Mui-selected': {
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white',
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        }
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      }
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        minWidth: 0,
                        mr: sidebarExpanded ? 2 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    
                    {sidebarExpanded && (
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ 
                          fontWeight: 500,
                          fontSize: '0.875rem'
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
            
            {/* Logout Button */}
            <ListItem disablePadding sx={{ mt: 4 }}>
              <Tooltip 
                title={!sidebarExpanded ? 'Logout' : ''} 
                placement="right"
                arrow
              >
                <ListItemButton 
                  onClick={handleLogout}
                  sx={{ 
                    mx: sidebarExpanded ? 1 : 0.5,
                    borderRadius: 2,
                    minHeight: 48,
                    justifyContent: sidebarExpanded ? 'initial' : 'center',
                    px: sidebarExpanded ? 2 : 1,
                    color: '#f44336',
                    '&:hover': {
                      backgroundColor: '#ffebee'
                    }
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 0,
                      mr: sidebarExpanded ? 2 : 'auto',
                      justifyContent: 'center',
                      color: '#f44336' 
                    }}
                  >
                    <Logout />
                  </ListItemIcon>
                  
                  {sidebarExpanded && (
                    <ListItemText 
                      primary="Logout" 
                      primaryTypographyProps={{ 
                        fontWeight: 500,
                        fontSize: '0.875rem'
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f5f5',
          p: 3,
          minHeight: '100vh',
          transition: (theme) => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default WelcomeDashboard;