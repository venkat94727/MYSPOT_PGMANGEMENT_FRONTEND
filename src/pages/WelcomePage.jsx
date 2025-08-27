// src/pages/WelcomePage.jsx

import React from 'react';
import { Box, Container, Typography, Button, Paper, Avatar } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const WelcomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Paper elevation={12} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 64, height: 64 }}>
              {user?.fullName?.charAt(0)}
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Welcome, {user?.fullName}!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              You have successfully logged in to MySpot.
            </Typography>
            <Button variant="contained" startIcon={<ExitToAppIcon />} onClick={handleLogout}>
              Logout
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WelcomePage;
