import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Button, Grid, Card, CardContent, 
  TextField, Avatar, Chip, Divider, List, ListItem, ListItemText,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton
} from '@mui/material';
import { 
  Add, Home, Edit, Photo, LocationOn, Star, 
  Bed, Wifi, LocalParking, Restaurant, Security,
  Upload, Save, Cancel
} from '@mui/icons-material';

const PGManagementPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [uploadDialog, setUploadDialog] = useState(false);

  // Mock PG data (single PG)
  const pgData = {
    name: "Comfort PG",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    description: "Premium PG accommodation with modern amenities and excellent service.",
    rating: 4.2,
    totalRooms: 25,
    occupiedRooms: 18,
    availableRooms: 7,
    monthlyRent: "₹12,000 - ₹18,000",
    images: [
      "/images/pg-exterior.jpg",
      "/images/room-1.jpg",
      "/images/common-area.jpg",
      "/images/kitchen.jpg"
    ],
    amenities: [
      "Free WiFi",
      "24x7 Security",
      "Laundry Service",
      "Home-cooked Meals",
      "AC Rooms",
      "Parking",
      "Housekeeping",
      "Power Backup"
    ],
    rules: [
      "No smoking inside premises",
      "No pets allowed",
      "Visitors allowed till 9 PM",
      "Maintain cleanliness",
      "No loud music after 10 PM"
    ],
    contact: {
      phone: "+91 9876543210",
      email: "manager@comfortpg.com",
      whatsapp: "+91 9876543210"
    }
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    setEditMode(false);
    // Handle save logic here
  };

  const handleUploadImages = () => {
    setUploadDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
          🏠 Welcome PG Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {editMode ? (
            <>
              <Button 
                variant="contained" 
                startIcon={<Save />}
                onClick={handleSave}
                sx={{ 
                  background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
                  fontWeight: 600 
                }}
              >
                Save Changes
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Cancel />}
                onClick={handleEdit}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="contained" 
                startIcon={<Edit />}
                onClick={handleEdit}
                sx={{ 
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  fontWeight: 600 
                }}
              >
                Edit PG Details
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Upload />}
                onClick={handleUploadImages}
              >
                Upload Images
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* PG Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Bed sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Total Rooms</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{pgData.totalRooms}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Home sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Occupied</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{pgData.occupiedRooms}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Add sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Available</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{pgData.availableRooms}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Star sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Rating</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{pgData.rating}/5</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* PG Details Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Home sx={{ fontSize: 30, color: '#1976d2', mr: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                PG Information
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="PG Name"
                  value={pgData.name}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={pgData.address}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={pgData.description}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monthly Rent Range"
                  value={pgData.monthlyRent}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Total Rooms"
                  value={pgData.totalRooms}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                  type="number"
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Contact Information */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={pgData.contact.phone}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={pgData.contact.email}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="WhatsApp Number"
                  value={pgData.contact.whatsapp}
                  disabled={!editMode}
                  variant={editMode ? "outlined" : "filled"}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* PG Images */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                PG Images
              </Typography>
              <IconButton onClick={handleUploadImages} color="primary">
                <Photo />
              </IconButton>
            </Box>
            <Grid container spacing={1}>
              {pgData.images.slice(0, 4).map((image, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 80,
                      bgcolor: '#f5f5f5',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px dashed #ccc'
                    }}
                  >
                    <Photo sx={{ color: '#999' }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Amenities */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Amenities
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {pgData.amenities.map((amenity, index) => (
                <Chip 
                  key={index}
                  label={amenity}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>

          {/* PG Rules */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              PG Rules & Regulations
            </Typography>
            <List dense>
              {pgData.rules.map((rule, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemText 
                    primary={rule}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Upload Images Dialog */}
      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Upload PG Images</DialogTitle>
        <DialogContent>
          <Box sx={{ 
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            bgcolor: '#fafafa',
            mb: 2
          }}>
            <Upload sx={{ fontSize: 48, color: '#999', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drag and drop images here
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              or click to browse files
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Choose Images
            </Button>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Supported formats: JPG, PNG, GIF. Maximum file size: 5MB per image.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialog(false)}>Cancel</Button>
          <Button variant="contained">Upload Images</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PGManagementPage;
