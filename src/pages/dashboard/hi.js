import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, TextField, Checkbox, FormControlLabel,
  Button, Divider, Switch, FormGroup, Select, MenuItem, InputLabel,
  FormControl, Card, CardContent, CardHeader, IconButton, List, ListItem,
  ListItemText, Avatar, Chip, Accordion, AccordionSummary, AccordionDetails,
  Rating, Slider, InputAdornment
} from '@mui/material';
import {
  Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, Edit as EditIcon,
  ExpandMore as ExpandMoreIcon, Upload as UploadIcon, Photo as PhotoIcon
} from '@mui/icons-material';

const PGManagementPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [pgData, setPgData] = useState({
    // Basic PG Information
    pgId: 'PG001',
    pgName: 'Comfort PG',
    pgDescription: 'Premium PG accommodation with modern amenities',
    pgType: 'Premium',
    pgProfilePicture: '',
    totalRooms: 25,
    totalBeds: 50,
    genderPreference: 'Mixed',
    establishedYear: '2020',
    panNumber: 'ABCDE1234F',

    // Address Information
    addressLine1: '123 MG Road',
    addressLine2: 'Near Metro Station',
    locality: 'Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',

    // Transportation
    transportation: [
      { nearbyLandmark: 'Metro Station', distanceFromMetro: '0.2 km', distanceFromBusStop: '0.1 km' }
    ],

    // Contact Information
    contactPersonName: 'John Manager',
    contactMobileNumber: '+91 9876543210',
    emergencyContactNumber: '+91 9876543211',
    landlineNumber: '080-12345678',
    whatsappNumber: '+91 9876543210',

    // Rules & Restrictions
    rulesRestrictions: {
      smokingAllowed: false,
      alcoholAllowed: false,
      couplesWelcomed: true,
      guestIdAllowed: true,
      indianNationalsOnly: true,
      extraCharges: 'Early check-in, extra guests, heaters are chargeable',
      visitorPolicy: 'Visitors allowed till 9 PM'
    },

    // PG Timings
    timings: {
      checkInTime: '12:00 PM',
      checkOutTime: '11:00 AM'
    },

    // Room Types & Sharing
    roomTypes: {
      singleSharingAvailable: true,
      doubleSharingAvailable: true,
      tripleSharingAvailable: true,
      quadSharingAvailable: false,
      singleSharingCost: '18000',
      doubleSharingCostPerPerson: '12000',
      tripleSharingCostPerPerson: '9000',
      quadSharingCostPerPerson: '7000',
      totalSingleSharingRooms: 5,
      totalDoubleSharingRooms: 10,
      totalTripleSharingRooms: 8,
      totalQuadSharingRooms: 2,
      remainingSingleSharingRooms: 2,
      remainingDoubleSharingRooms: 3,
      remainingTripleSharingRooms: 2,
      remainingQuadSharingRooms: 0,
      acRoomsAvailable: 15,
      nonAcRoomsAvailable: 10
    },

    // Amenities
    amenities: {
      wifiAvailable: true,
      powerBackup: true,
      waterSupply24x7: true,
      hotWaterAvailable: true,
      cookingAllowed: true,
      kitchenAvailable: true,
      refrigeratorAvailable: true,
      washingMachineAvailable: true,
      tvAvailable: true,
      gymAvailable: false,
      parkingAvailable: true,
      bikeParking: true,
      carParking: true,
      securityGuard24x7: true,
      cctvSurveillance: true,
      intercomFacility: true,
      housekeepingService: true
    },

    // Food Services
    foodServices: {
      foodService: true,
      tiffinService: true,
      foodServiceAvailable: true,
      vegetarianMealsOnly: false,
      nonVegMealsAvailable: true,
      jainFoodAvailable: true,
      breakfastIncluded: true,
      lunchIncluded: true,
      dinnerIncluded: true,
      mealPlanCost: '4000',
      breakfastCost: '1000',
      lunchCost: '1500',
      dinnerCost: '1500'
    },

    // Capacity & Occupancy
    capacity: {
      totalCapacity: 50,
      currentOccupancy: 35,
      availableBeds: 15,
      waitingListCount: 5
    },

    // Status
    status: {
      isActive: true,
      isVerified: true,
      isFeatured: true
    },

    // Ratings
    ratings: {
      overallRating: 4.2,
      totalReviews: 125,
      cleanlinessRating: 4.5,
      locationRating: 4.0,
      valueForMoneyRating: 4.2,
      staffBehaviorRating: 4.3,
      amenitiesRating: 4.1,
      foodQualityRating: 4.0
    },

    // Media
    media: {
      pgImages: [],
      roomImages: [],
      kitchenImages: [],
      bathroomImages: [],
      commonAreaImages: [],
      exteriorImages: [],
      virtualTourUrl: '',
      youtubeVideoUrl: ''
    },

    // Documents & Verification
    documents: {
      verificationStatus: 'Verified',
      verificationDate: '2024-01-15',
      businessRegistrationDoc: '',
      ownerIdProof: '',
      propertyDocuments: ''
    },

    // Booking & Policies
    policies: {
      instantBookingAvailable: true,
      partialPaymentAllowed: true,
      refundPolicy: 'Full refund if cancelled 7 days before',
      cancellationPolicy: '24 hours notice required',
      bookingConfirmationTime: '2 hours'
    },

    // Preferences
    preferences: {
      studentFriendly: true,
      professionalFriendly: true,
      couplesFriendly: true,
      petFriendly: false,
      seniorCitizenFriendly: true,
      disabledFriendly: true,
      coworkingSpaceAvailable: false,
      studyRoomAvailable: true
    },

    // Metadata
    metadata: {
      lastUpdated: '2024-08-25',
      createdAt: '2024-01-01',
      modifiedAt: '2024-08-25',
      activeSince: '2024-01-01',
      renewalDate: '2025-01-01',
      discountPercentage: 10
    },

    // Owner Information
    owner: {
      ownerId: 'OWN001',
      ownerName: 'John Doe',
      ownerEmail: 'john@example.com',
      ownerMobileNumber: '+91 9876543210',
      ownerAlternateMobile: '+91 9876543211'
    }
  });

  const handleInputChange = (section, field, value) => {
    if (section) {
      setPgData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setPgData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend API
    console.log('Saving PG data:', pgData);
    setEditMode(false);
    // Add your API call here
    // await pgService.updatePG(pgData);
  };

  const addTransportationItem = () => {
    setPgData(prev => ({
      ...prev,
      transportation: [...prev.transportation, {
        nearbyLandmark: '',
        distanceFromMetro: '',
        distanceFromBusStop: ''
      }]
    }));
  };

  const removeTransportationItem = (index) => {
    setPgData(prev => ({
      ...prev,
      transportation: prev.transportation.filter((_, i) => i !== index)
    }));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
          🏠 PG Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {editMode ? (
            <>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
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
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              variant="contained" 
              startIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
              sx={{ 
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                fontWeight: 600 
              }}
            >
              Edit PG Details
            </Button>
          )}
        </Box>
      </Box>

      {/* Basic Information */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Basic Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="PG ID"
                value={pgData.pgId}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'pgId', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="PG Name"
                value={pgData.pgName}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'pgName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="PG Description"
                value={pgData.pgDescription}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'pgDescription', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>PG Type</InputLabel>
                <Select
                  value={pgData.pgType}
                  disabled={!editMode}
                  onChange={(e) => handleInputChange(null, 'pgType', e.target.value)}
                >
                  <MenuItem value="Economy">Economy</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Luxury">Luxury</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender Preference</InputLabel>
                <Select
                  value={pgData.genderPreference}
                  disabled={!editMode}
                  onChange={(e) => handleInputChange(null, 'genderPreference', e.target.value)}
                >
                  <MenuItem value="Male">Male Only</MenuItem>
                  <MenuItem value="Female">Female Only</MenuItem>
                  <MenuItem value="Mixed">Mixed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Rooms"
                type="number"
                value={pgData.totalRooms}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'totalRooms', parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Beds"
                type="number"
                value={pgData.totalBeds}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'totalBeds', parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Established Year"
                value={pgData.establishedYear}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'establishedYear', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="PAN Number"
                value={pgData.panNumber}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'panNumber', e.target.value)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Address Information */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Address Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address Line 1"
                value={pgData.addressLine1}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'addressLine1', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address Line 2"
                value={pgData.addressLine2}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'addressLine2', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Locality"
                value={pgData.locality}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'locality', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={pgData.city}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'city', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                value={pgData.state}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'state', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                value={pgData.pincode}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'pincode', e.target.value)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Transportation */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Transportation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {pgData.transportation.map((transport, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Nearby Landmark"
                      value={transport.nearbyLandmark}
                      disabled={!editMode}
                      onChange={(e) => {
                        const newTransport = [...pgData.transportation];
                        newTransport[index].nearbyLandmark = e.target.value;
                        setPgData(prev => ({ ...prev, transportation: newTransport }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Distance from Metro"
                      value={transport.distanceFromMetro}
                      disabled={!editMode}
                      onChange={(e) => {
                        const newTransport = [...pgData.transportation];
                        newTransport[index].distanceFromMetro = e.target.value;
                        setPgData(prev => ({ ...prev, transportation: newTransport }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Distance from Bus Stop"
                      value={transport.distanceFromBusStop}
                      disabled={!editMode}
                      onChange={(e) => {
                        const newTransport = [...pgData.transportation];
                        newTransport[index].distanceFromBusStop = e.target.value;
                        setPgData(prev => ({ ...prev, transportation: newTransport }));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    {editMode && (
                      <IconButton 
                        color="error" 
                        onClick={() => removeTransportationItem(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
          {editMode && (
            <Button
              startIcon={<AddIcon />}
              onClick={addTransportationItem}
              variant="outlined"
            >
              Add Transportation Info
            </Button>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Contact Information */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Contact Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Person Name"
                value={pgData.contactPersonName}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'contactPersonName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Mobile Number"
                value={pgData.contactMobileNumber}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'contactMobileNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Contact Number"
                value={pgData.emergencyContactNumber}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'emergencyContactNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Landline Number"
                value={pgData.landlineNumber}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'landlineNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="WhatsApp Number"
                value={pgData.whatsappNumber}
                disabled={!editMode}
                onChange={(e) => handleInputChange(null, 'whatsappNumber', e.target.value)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Rules & Restrictions */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Rules & Restrictions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.rulesRestrictions.smokingAllowed}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('rulesRestrictions', 'smokingAllowed', e.target.checked)}
                  />
                }
                label="Smoking Allowed"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.rulesRestrictions.alcoholAllowed}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('rulesRestrictions', 'alcoholAllowed', e.target.checked)}
                  />
                }
                label="Alcohol Allowed"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.rulesRestrictions.couplesWelcomed}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('rulesRestrictions', 'couplesWelcomed', e.target.checked)}
                  />
                }
                label="Couples Welcomed"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.rulesRestrictions.guestIdAllowed}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('rulesRestrictions', 'guestIdAllowed', e.target.checked)}
                  />
                }
                label="Guest ID Proof Allowed"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.rulesRestrictions.indianNationalsOnly}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('rulesRestrictions', 'indianNationalsOnly', e.target.checked)}
                  />
                }
                label="Only Indian Nationals Allowed"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Extra Charges Policy"
                value={pgData.rulesRestrictions.extraCharges}
                disabled={!editMode}
                onChange={(e) => handleInputChange('rulesRestrictions', 'extraCharges', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Visitor Policy"
                value={pgData.rulesRestrictions.visitorPolicy}
                disabled={!editMode}
                onChange={(e) => handleInputChange('rulesRestrictions', 'visitorPolicy', e.target.value)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* PG Timings */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>PG Timings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Check-in Time"
                value={pgData.timings.checkInTime}
                disabled={!editMode}
                onChange={(e) => handleInputChange('timings', 'checkInTime', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Check-out Time"
                value={pgData.timings.checkOutTime}
                disabled={!editMode}
                onChange={(e) => handleInputChange('timings', 'checkOutTime', e.target.value)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Room Types & Sharing */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Room Types & Sharing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {/* Single Sharing */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Single Sharing</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.roomTypes.singleSharingAvailable}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('roomTypes', 'singleSharingAvailable', e.target.checked)}
                  />
                }
                label="Available"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Cost"
                value={pgData.roomTypes.singleSharingCost}
                disabled={!editMode}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                onChange={(e) => handleInputChange('roomTypes', 'singleSharingCost', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Total Rooms"
                type="number"
                value={pgData.roomTypes.totalSingleSharingRooms}
                disabled={!editMode}
                onChange={(e) => handleInputChange('roomTypes', 'totalSingleSharingRooms', parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Remaining"
                type="number"
                value={pgData.roomTypes.remainingSingleSharingRooms}
                disabled={!editMode}
                onChange={(e) => handleInputChange('roomTypes', 'remainingSingleSharingRooms', parseInt(e.target.value))}
              />
            </Grid>

            {/* Double Sharing */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, mt: 2 }}>Double Sharing</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.roomTypes.doubleSharingAvailable}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('roomTypes', 'doubleSharingAvailable', e.target.checked)}
                  />
                }
                label="Available"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Cost Per Person"
                value={pgData.roomTypes.doubleSharingCostPerPerson}
                disabled={!editMode}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                onChange={(e) => handleInputChange('roomTypes', 'doubleSharingCostPerPerson', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Total Rooms"
                type="number"
                value={pgData.roomTypes.totalDoubleSharingRooms}
                disabled={!editMode}
                onChange={(e) => handleInputChange('roomTypes', 'totalDoubleSharingRooms', parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Remaining"
                type="number"
                value={pgData.roomTypes.remainingDoubleSharingRooms}
                disabled={!editMode}
                onChange={(e) => handleInputChange('roomTypes', 'remainingDoubleSharingRooms', parseInt(e.target.value))}
              />
            </Grid>

            {/* Triple Sharing */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, mt: 2 }}>Triple Sharing</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.roomTypes.tripleSharingAvailable}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('roomTypes', 'tripleSharingAvailable', e.target.checked)}
                  />
                }
                label="Available"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Cost Per Person"
                value={pgData.roomTypes.tripleSharingCostPerPerson}
                disabled={!editMode}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                onChange={(e) => handleInputChange('roomTypes', 'tripleSharingCostPerPerson', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Total Rooms"
                type="number"
                value={pgData.roomTypes.totalTripleSharingRooms}
                disabled={!editMode}
                onChange={(e) => handleInputChange('roomTypes', 'totalTripleSharingRooms', parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Remaining"
                type="number"
                value={pgData.roomTypes.remainingTripleSharingRooms}
                disabled={!editMode}
                onChange={(e) => handleInputChange('roomTypes', 'remainingTripleSharingRooms', parseInt(e.target.value))}
              />
            </Grid>

            {/* AC/Non-AC */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, mt: 2 }}>AC/Non-AC Rooms</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="AC Rooms Available"
                type="number"
                value={pgData.roomTypes.acRoomsAvailable}
                disabled={!editMode}
                onChange={(e) => handleInputChange('roomTypes', 'acRoomsAvailable', parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Non-AC Rooms Available"
                type="number"
                value={pgData.roomTypes.nonAcRoomsAvailable}
                disabled={!editMode}
                onChange={(e) => handleInputChange('roomTypes', 'nonAcRoomsAvailable', parseInt(e.target.value))}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Amenities */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Amenities</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {Object.entries(pgData.amenities).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={value}
                      disabled={!editMode}
                      onChange={(e) => handleInputChange('amenities', key, e.target.checked)}
                    />
                  }
                  label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Food Services */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Food Services</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.foodServices.foodService}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('foodServices', 'foodService', e.target.checked)}
                  />
                }
                label="Food Service"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.foodServices.vegetarianMealsOnly}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('foodServices', 'vegetarianMealsOnly', e.target.checked)}
                  />
                }
                label="Vegetarian Meals Only"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.foodServices.nonVegMealsAvailable}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('foodServices', 'nonVegMealsAvailable', e.target.checked)}
                  />
                }
                label="Non-Veg Meals Available"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.foodServices.jainFoodAvailable}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('foodServices', 'jainFoodAvailable', e.target.checked)}
                  />
                }
                label="Jain Food Available"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.foodServices.breakfastIncluded}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('foodServices', 'breakfastIncluded', e.target.checked)}
                  />
                }
                label="Breakfast Included"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.foodServices.lunchIncluded}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('foodServices', 'lunchIncluded', e.target.checked)}
                  />
                }
                label="Lunch Included"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pgData.foodServices.dinnerIncluded}
                    disabled={!editMode}
                    onChange={(e) => handleInputChange('foodServices', 'dinnerIncluded', e.target.checked)}
                  />
                }
                label="Dinner Included"
              />
            </Grid>
            
            {/* Meal Costs */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, mt: 2 }}>Meal Costs</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Meal Plan Cost"
                value={pgData.foodServices.mealPlanCost}
                disabled={!editMode}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                onChange={(e) => handleInputChange('foodServices', 'mealPlanCost', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Breakfast Cost"
                value={pgData.foodServices.breakfastCost}
                disabled={!editMode}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                onChange={(e) => handleInputChange('foodServices', 'breakfastCost', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Lunch Cost"
                value={pgData.foodServices.lunchCost}
                disabled={!editMode}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                onChange={(e) => handleInputChange('foodServices', 'lunchCost', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Dinner Cost"
                value={pgData.foodServices.dinnerCost}
                disabled={!editMode}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                onChange={(e) => handleInputChange('foodServices', 'dinnerCost', e.target.value)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Owner Information */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Owner Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner ID"
                value={pgData.owner.ownerId}
                disabled={!editMode}
                onChange={(e) => handleInputChange('owner', 'ownerId', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner Name"
                value={pgData.owner.ownerName}
                disabled={!editMode}
                onChange={(e) => handleInputChange('owner', 'ownerName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner Email"
                value={pgData.owner.ownerEmail}
                disabled={!editMode}
                onChange={(e) => handleInputChange('owner', 'ownerEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner Mobile Number"
                value={pgData.owner.ownerMobileNumber}
                disabled={!editMode}
                onChange={(e) => handleInputChange('owner', 'ownerMobileNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner Alternate Mobile"
                value={pgData.owner.ownerAlternateMobile}
                disabled={!editMode}
                onChange={(e) => handleInputChange('owner', 'ownerAlternateMobile', e.target.value)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Ratings & Reviews */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Ratings & Reviews</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography gutterBottom>Overall Rating</Typography>
                <Rating
                  value={pgData.ratings.overallRating}
                  precision={0.1}
                  readOnly={!editMode}
                  onChange={(event, newValue) => {
                    handleInputChange('ratings', 'overallRating', newValue);
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {pgData.ratings.overallRating}/5 ({pgData.ratings.totalReviews} reviews)
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography gutterBottom>Cleanliness Rating</Typography>
                <Rating
                  value={pgData.ratings.cleanlinessRating}
                  precision={0.1}
                  readOnly={!editMode}
                  onChange={(event, newValue) => {
                    handleInputChange('ratings', 'cleanlinessRating', newValue);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography gutterBottom>Location Rating</Typography>
                <Rating
                  value={pgData.ratings.locationRating}
                  precision={0.1}
                  readOnly={!editMode}
                  onChange={(event, newValue) => {
                    handleInputChange('ratings', 'locationRating', newValue);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography gutterBottom>Value for Money Rating</Typography>
                <Rating
                  value={pgData.ratings.valueForMoneyRating}
                  precision={0.1}
                  readOnly={!editMode}
                  onChange={(event, newValue) => {
                    handleInputChange('ratings', 'valueForMoneyRating', newValue);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography gutterBottom>Staff Behavior Rating</Typography>
                <Rating
                  value={pgData.ratings.staffBehaviorRating}
                  precision={0.1}
                  readOnly={!editMode}
                  onChange={(event, newValue) => {
                    handleInputChange('ratings', 'staffBehaviorRating', newValue);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography gutterBottom>Food Quality Rating</Typography>
                <Rating
                  value={pgData.ratings.foodQualityRating}
                  precision={0.1}
                  readOnly={!editMode}
                  onChange={(event, newValue) => {
                    handleInputChange('ratings', 'foodQualityRating', newValue);
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PGManagementPage;
