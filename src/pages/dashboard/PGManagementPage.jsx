import React, { useState, useEffect } from 'react';
import {
 Box, Typography, Paper, Grid, TextField, Checkbox, FormControlLabel,
 Button, Divider, Switch, FormGroup, Select, MenuItem, InputLabel,
 FormControl, Card, CardContent, CardHeader, IconButton, List, ListItem,
 ListItemText, Avatar, Chip, Accordion, AccordionSummary, AccordionDetails,
 Rating, Slider, InputAdornment, CardMedia, Stack, Alert
} from '@mui/material';
import {
 Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, Edit as EditIcon,
 ExpandMore as ExpandMoreIcon, Upload as UploadIcon, Photo as PhotoIcon,
 Close as CloseIcon, AddAPhoto as AddAPhotoIcon
} from '@mui/icons-material';

const PGManagementPage = () => {
 const [editMode, setEditMode] = useState(false);
 const [pgData, setPgData] = useState({
 // Basic PG Information (pgId removed)
 pgName: 'Comfort PG',
 pgDescription: 'Premium PG accommodation with modern amenities',
 pgType: 'Premium',
 pgProfilePicture: '',
 pgPictures: [], // Array of objects with { image: file/url, description: string, id: unique }
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

 // Rules & Restrictions (Individual Items)
 rulesRestrictions: [
 { id: 1, ruleType: 'General Rule', description: 'No smoking inside the premises' },
 { id: 2, ruleType: 'Timing Rule', description: 'Entry gate closes at 11 PM' },
 { id: 3, ruleType: 'Visitor Rule', description: 'Visitors allowed till 9 PM with valid ID' }
 ],

 // Extra Charges (Individual Items)
 extraCharges: [
 { id: 1, chargeType: 'Early Check-in', amount: '500', description: 'Before 12 PM' },
 { id: 2, chargeType: 'Extra Guest', amount: '200', description: 'Per day per guest' }
 ],

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

 // Amenities (Individual Items)
 amenities: [
 { id: 1, category: 'Basic', name: 'Wi-Fi', description: '24x7 high-speed internet' },
 { id: 2, category: 'Basic', name: 'Power Backup', description: 'Generator backup for 8 hours' },
 { id: 3, category: 'Room', name: 'AC/Non-AC', description: 'Both options available' },
 { id: 4, category: 'Security', name: 'CCTV', description: 'Surveillance in common areas' }
 ],

 // Food Services (Individual Items)
 foodServices: [
 { id: 1, serviceType: 'Breakfast', timing: '7:30-9:30 AM', cost: '1000', description: 'South Indian & North Indian options' },
 { id: 2, serviceType: 'Lunch', timing: '12:30-2:30 PM', cost: '1500', description: 'Veg & Non-veg meals' },
 { id: 3, serviceType: 'Dinner', timing: '7:30-9:30 PM', cost: '1500', description: 'Home-style cooking' }
 ],

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

 // Owner Information (Always read-only)
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

 // Handle PG Profile Picture Upload
 const handleProfilePictureUpload = (event) => {
 const file = event.target.files[0];
 if (file) {
 // Validate file type
 const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
 if (!allowedTypes.includes(file.type)) {
 alert('Please select a valid image file (JPEG, PNG, GIF)');
 return;
 }

 // Validate file size (max 5MB)
 const maxSize = 5 * 1024 * 1024; // 5MB
 if (file.size > maxSize) {
 alert('File size should be less than 5MB');
 return;
 }

 // Create preview URL
 const reader = new FileReader();
 reader.onload = (e) => {
 setPgData(prev => ({
 ...prev,
 pgProfilePicture: e.target.result
 }));
 };
 reader.readAsDataURL(file);
 }
 };

 // Handle PG Pictures Upload (multiple images with descriptions)
 const handlePGPicturesUpload = (event) => {
 const files = Array.from(event.target.files);

 files.forEach(file => {
 // Validate file type
 const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
 if (!allowedTypes.includes(file.type)) {
 alert(`File ${file.name} is not a valid image type`);
 return;
 }

 // Validate file size (max 5MB)
 const maxSize = 5 * 1024 * 1024; // 5MB
 if (file.size > maxSize) {
 alert(`File ${file.name} is too large. Max size is 5MB`);
 return;
 }

 // Create preview URL and add to pgPictures array
 const reader = new FileReader();
 reader.onload = (e) => {
 const newPicture = {
 id: Date.now() + Math.random(), // Simple unique ID
 image: e.target.result,
 description: '',
 fileName: file.name
 };

 setPgData(prev => ({
 ...prev,
 pgPictures: [...prev.pgPictures, newPicture]
 }));
 };
 reader.readAsDataURL(file);
 });
 };

 // Update PG Picture Description
 const updatePGPictureDescription = (id, description) => {
 setPgData(prev => ({
 ...prev,
 pgPictures: prev.pgPictures.map(pic => 
 pic.id === id ? { ...pic, description } : pic
 )
 }));
 };

 // Remove PG Picture
 const removePGPicture = (id) => {
 setPgData(prev => ({
 ...prev,
 pgPictures: prev.pgPictures.filter(pic => pic.id !== id)
 }));
 };

 // Remove Profile Picture
 const removeProfilePicture = () => {
 setPgData(prev => ({
 ...prev,
 pgProfilePicture: ''
 }));
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

 // Rules & Restrictions Functions
 const addRuleRestrictionItem = () => {
 setPgData(prev => ({
 ...prev,
 rulesRestrictions: [...prev.rulesRestrictions, {
 id: Date.now(),
 ruleType: '',
 description: ''
 }]
 }));
 };

 const removeRuleRestrictionItem = (id) => {
 setPgData(prev => ({
 ...prev,
 rulesRestrictions: prev.rulesRestrictions.filter(rule => rule.id !== id)
 }));
 };

 const updateRuleRestriction = (id, field, value) => {
 setPgData(prev => ({
 ...prev,
 rulesRestrictions: prev.rulesRestrictions.map(rule => 
 rule.id === id ? { ...rule, [field]: value } : rule
 )
 }));
 };

 // Extra Charges Functions
 const addExtraChargeItem = () => {
 setPgData(prev => ({
 ...prev,
 extraCharges: [...prev.extraCharges, {
 id: Date.now(),
 chargeType: '',
 amount: '',
 description: ''
 }]
 }));
 };

 const removeExtraChargeItem = (id) => {
 setPgData(prev => ({
 ...prev,
 extraCharges: prev.extraCharges.filter(charge => charge.id !== id)
 }));
 };

 const updateExtraCharge = (id, field, value) => {
 setPgData(prev => ({
 ...prev,
 extraCharges: prev.extraCharges.map(charge => 
 charge.id === id ? { ...charge, [field]: value } : charge
 )
 }));
 };

 // Amenities Functions
 const addAmenityItem = () => {
 setPgData(prev => ({
 ...prev,
 amenities: [...prev.amenities, {
 id: Date.now(),
 category: '',
 name: '',
 description: ''
 }]
 }));
 };

 const removeAmenityItem = (id) => {
 setPgData(prev => ({
 ...prev,
 amenities: prev.amenities.filter(amenity => amenity.id !== id)
 }));
 };

 const updateAmenity = (id, field, value) => {
 setPgData(prev => ({
 ...prev,
 amenities: prev.amenities.map(amenity => 
 amenity.id === id ? { ...amenity, [field]: value } : amenity
 )
 }));
 };

 // Food Services Functions
 const addFoodServiceItem = () => {
 setPgData(prev => ({
 ...prev,
 foodServices: [...prev.foodServices, {
 id: Date.now(),
 serviceType: '',
 timing: '',
 cost: '',
 description: ''
 }]
 }));
 };

 const removeFoodServiceItem = (id) => {
 setPgData(prev => ({
 ...prev,
 foodServices: prev.foodServices.filter(service => service.id !== id)
 }));
 };

 const updateFoodService = (id, field, value) => {
 setPgData(prev => ({
 ...prev,
 foodServices: prev.foodServices.map(service => 
 service.id === id ? { ...service, [field]: value } : service
 )
 }));
 };

 return (
 <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
 {/* Header */}
 <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
 <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
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
 </Paper>

 {/* Basic Information */}
 <Accordion defaultExpanded sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>Basic Information</Typography>
 </AccordionSummary>
 <AccordionDetails>
 <Grid container spacing={3}>
 {/* REMOVED PG ID FIELD */}
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="PG Name"
 value={pgData.pgName}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'pgName', e.target.value)}
 />
 </Grid>

 <Grid item xs={12} md={6}>
 <FormControl fullWidth disabled={!editMode}>
 <InputLabel>PG Type</InputLabel>
 <Select
 value={pgData.pgType}
 label="PG Type"
 onChange={(e) => handleInputChange(null, 'pgType', e.target.value)}
 >
 <MenuItem value="Economy">Economy</MenuItem>
 <MenuItem value="Premium">Premium</MenuItem>
 <MenuItem value="Luxury">Luxury</MenuItem>
 </Select>
 </FormControl>
 </Grid>

 <Grid item xs={12}>
 <TextField
 fullWidth
 label="PG Description"
 multiline
 rows={3}
 value={pgData.pgDescription}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'pgDescription', e.target.value)}
 />
 </Grid>

 <Grid item xs={12} md={6}>
 <FormControl fullWidth disabled={!editMode}>
 <InputLabel>Gender Preference</InputLabel>
 <Select
 value={pgData.genderPreference}
 label="Gender Preference"
 onChange={(e) => handleInputChange(null, 'genderPreference', e.target.value)}
 >
 <MenuItem value="Male Only">Male Only</MenuItem>
 <MenuItem value="Female Only">Female Only</MenuItem>
 <MenuItem value="Mixed">Mixed</MenuItem>
 </Select>
 </FormControl>
 </Grid>

 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Total Rooms"
 type="number"
 value={pgData.totalRooms}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'totalRooms', parseInt(e.target.value))}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Total Beds"
 type="number"
 value={pgData.totalBeds}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'totalBeds', parseInt(e.target.value))}
 />
 </Grid>

 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Established Year"
 value={pgData.establishedYear}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'establishedYear', e.target.value)}
 />
 </Grid>

 <Grid item xs={12} md={6}>
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

 {/* PG Profile Picture Section */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>PG Profile Picture</Typography>
 </AccordionSummary>
 <AccordionDetails>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
 {pgData.pgProfilePicture ? (
 <Card sx={{ maxWidth: 300 }}>
 <CardMedia
 component="img"
 height="200"
 image={pgData.pgProfilePicture}
 alt="PG Profile Picture"
 sx={{ objectFit: 'cover' }}
 />
 {editMode && (
 <CardContent sx={{ pt: 1 }}>
 <Button
 variant="outlined"
 color="error"
 startIcon={<DeleteIcon />}
 onClick={removeProfilePicture}
 size="small"
 >
 Remove Picture
 </Button>
 </CardContent>
 )}
 </Card>
 ) : (
 <Box
 sx={{
 border: '2px dashed #ccc',
 borderRadius: 2,
 p: 4,
 textAlign: 'center',
 bgcolor: '#f9f9f9',
 maxWidth: 300
 }}
 >
 <PhotoIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
 <Typography variant="body2" color="text.secondary">
 No profile picture uploaded
 </Typography>
 </Box>
 )}

 {editMode && (
 <Box>
 <input
 accept="image/*"
 style={{ display: 'none' }}
 id="profile-picture-upload"
 type="file"
 onChange={handleProfilePictureUpload}
 />
 <label htmlFor="profile-picture-upload">
 <Button
 variant="contained"
 component="span"
 startIcon={<UploadIcon />}
 sx={{ mt: 1 }}
 >
 {pgData.pgProfilePicture ? 'Change Profile Picture' : 'Upload Profile Picture'}
 </Button>
 </label>
 <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
 Supported formats: JPEG, PNG, GIF. Max size: 5MB
 </Typography>
 </Box>
 )}
 </Box>
 </AccordionDetails>
 </Accordion>

 {/* PG Pictures & Descriptions */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>
 PG Pictures & Descriptions ({pgData.pgPictures.length} images)
 </Typography>
 </AccordionSummary>
 <AccordionDetails>
 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
 {editMode && (
 <Box>
 <input
 accept="image/*"
 style={{ display: 'none' }}
 id="pg-pictures-upload"
 type="file"
 multiple
 onChange={handlePGPicturesUpload}
 />
 <label htmlFor="pg-pictures-upload">
 <Button
 variant="contained"
 component="span"
 startIcon={<AddAPhotoIcon />}
 sx={{ mb: 2 }}
 >
 Add PG Pictures
 </Button>
 </label>
 <Typography variant="caption" display="block" sx={{ color: 'text.secondary', mb: 2 }}>
 You can select multiple images. Supported formats: JPEG, PNG, GIF. Max size per image: 5MB
 </Typography>
 </Box>
 )}

 {pgData.pgPictures.length === 0 ? (
 <Alert severity="info">
 No PG pictures uploaded yet. {editMode ? 'Click "Add PG Pictures" to upload images.' : ''}
 </Alert>
 ) : (
 <Grid container spacing={3}>
 {pgData.pgPictures.map((picture) => (
 <Grid item xs={12} sm={6} md={4} key={picture.id}>
 <Card>
 <CardMedia
 component="img"
 height="200"
 image={picture.image}
 alt={picture.description || 'PG Picture'}
 sx={{ objectFit: 'cover' }}
 />
 <CardContent>
 <TextField
 fullWidth
 label="Picture Description"
 value={picture.description}
 disabled={!editMode}
 onChange={(e) => updatePGPictureDescription(picture.id, e.target.value)}
 multiline
 rows={2}
 placeholder="Describe this picture (e.g., 'Common room area', 'Kitchen facilities', etc.)"
 />
 {editMode && (
 <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 <Typography variant="caption" color="text.secondary">
 {picture.fileName}
 </Typography>
 <IconButton
 color="error"
 onClick={() => removePGPicture(picture.id)}
 size="small"
 >
 <DeleteIcon />
 </IconButton>
 </Box>
 )}
 </CardContent>
 </Card>
 </Grid>
 ))}
 </Grid>
 )}
 </Box>
 </AccordionDetails>
 </Accordion>

 {/* Address Information */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>Address Information</Typography>
 </AccordionSummary>
 <AccordionDetails>
 <Grid container spacing={3}>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Address Line 1"
 value={pgData.addressLine1}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'addressLine1', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Address Line 2"
 value={pgData.addressLine2}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'addressLine2', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Locality"
 value={pgData.locality}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'locality', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="City"
 value={pgData.city}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'city', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="State"
 value={pgData.state}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'state', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={6}>
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
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>Transportation</Typography>
 </AccordionSummary>
 <AccordionDetails>
 {pgData.transportation.map((transport, index) => (
 <Paper key={index} elevation={1} sx={{ p: 2, mb: 2 }}>
 <Grid container spacing={2} alignItems="center">
 <Grid item xs={12} md={4}>
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
 <Grid item xs={12} md={3}>
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
 <Grid item xs={12} md={3}>
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
 <Grid item xs={12} md={2}>
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
 </Paper>
 ))}
 {editMode && (
 <Button
 variant="outlined"
 startIcon={<AddIcon />}
 onClick={addTransportationItem}
 >
 Add Transportation Info
 </Button>
 )}
 </AccordionDetails>
 </Accordion>

 {/* Contact Information */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>Contact Information</Typography>
 </AccordionSummary>
 <AccordionDetails>
 <Grid container spacing={3}>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Contact Person Name"
 value={pgData.contactPersonName}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'contactPersonName', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Contact Mobile Number"
 value={pgData.contactMobileNumber}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'contactMobileNumber', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Emergency Contact Number"
 value={pgData.emergencyContactNumber}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'emergencyContactNumber', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Landline Number"
 value={pgData.landlineNumber}
 disabled={!editMode}
 onChange={(e) => handleInputChange(null, 'landlineNumber', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={6}>
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

 {/* Rules & Restrictions - LIKE TRANSPORTATION */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>Rules & Restrictions</Typography>
 </AccordionSummary>
 <AccordionDetails>
 {pgData.rulesRestrictions.map((rule) => (
 <Paper key={rule.id} elevation={1} sx={{ p: 2, mb: 2 }}>
 <Grid container spacing={2} alignItems="center">
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Rule Type"
 value={rule.ruleType}
 disabled={!editMode}
 onChange={(e) => updateRuleRestriction(rule.id, 'ruleType', e.target.value)}
 placeholder="e.g., General Rule, Timing Rule"
 />
 </Grid>
 <Grid item xs={12} md={7}>
 <TextField
 fullWidth
 label="Description"
 value={rule.description}
 disabled={!editMode}
 onChange={(e) => updateRuleRestriction(rule.id, 'description', e.target.value)}
 placeholder="Describe the rule in detail"
 />
 </Grid>
 <Grid item xs={12} md={2}>
 {editMode && (
 <IconButton
 color="error"
 onClick={() => removeRuleRestrictionItem(rule.id)}
 >
 <DeleteIcon />
 </IconButton>
 )}
 </Grid>
 </Grid>
 </Paper>
 ))}
 {editMode && (
 <Button
 variant="outlined"
 startIcon={<AddIcon />}
 onClick={addRuleRestrictionItem}
 >
 Add Rule/Restriction
 </Button>
 )}
 </AccordionDetails>
 </Accordion>

 {/* Extra Charges - LIKE TRANSPORTATION */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>Extra Charges</Typography>
 </AccordionSummary>
 <AccordionDetails>
 {pgData.extraCharges.map((charge) => (
 <Paper key={charge.id} elevation={1} sx={{ p: 2, mb: 2 }}>
 <Grid container spacing={2} alignItems="center">
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Charge Type"
 value={charge.chargeType}
 disabled={!editMode}
 onChange={(e) => updateExtraCharge(charge.id, 'chargeType', e.target.value)}
 placeholder="e.g., Early Check-in, Extra Guest"
 />
 </Grid>
 <Grid item xs={12} md={2}>
 <TextField
 fullWidth
 label="Amount"
 value={charge.amount}
 disabled={!editMode}
 InputProps={{
 startAdornment: <InputAdornment position="start">₹</InputAdornment>,
 }}
 onChange={(e) => updateExtraCharge(charge.id, 'amount', e.target.value)}
 placeholder="500"
 />
 </Grid>
 <Grid item xs={12} md={5}>
 <TextField
 fullWidth
 label="Description"
 value={charge.description}
 disabled={!editMode}
 onChange={(e) => updateExtraCharge(charge.id, 'description', e.target.value)}
 placeholder="Additional details about the charge"
 />
 </Grid>
 <Grid item xs={12} md={2}>
 {editMode && (
 <IconButton
 color="error"
 onClick={() => removeExtraChargeItem(charge.id)}
 >
 <DeleteIcon />
 </IconButton>
 )}
 </Grid>
 </Grid>
 </Paper>
 ))}
 {editMode && (
 <Button
 variant="outlined"
 startIcon={<AddIcon />}
 onClick={addExtraChargeItem}
 >
 Add Extra Charge
 </Button>
 )}
 </AccordionDetails>
 </Accordion>

 {/* PG Timings */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>PG Timings</Typography>
 </AccordionSummary>
 <AccordionDetails>
 <Grid container spacing={3}>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Check-in Time"
 value={pgData.timings.checkInTime}
 disabled={!editMode}
 onChange={(e) => handleInputChange('timings', 'checkInTime', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={6}>
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
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>Room Types & Sharing</Typography>
 </AccordionSummary>
 <AccordionDetails>
 <Grid container spacing={3}>
 {/* Single Sharing */}
 <Grid item xs={12}>
 <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Single Sharing</Typography>
 </Grid>
 <Grid item xs={12} md={3}>
 <FormControlLabel
 control={
 <Checkbox
 checked={pgData.roomTypes.singleSharingAvailable}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'singleSharingAvailable', e.target.checked)}
 />
 }
 label="Available"
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Cost per Month"
 InputProps={{
 startAdornment: <InputAdornment position="start">₹</InputAdornment>,
 }}
 value={pgData.roomTypes.singleSharingCost}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'singleSharingCost', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Total Rooms"
 type="number"
 value={pgData.roomTypes.totalSingleSharingRooms}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'totalSingleSharingRooms', parseInt(e.target.value))}
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Remaining Rooms"
 type="number"
 value={pgData.roomTypes.remainingSingleSharingRooms}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'remainingSingleSharingRooms', parseInt(e.target.value))}
 />
 </Grid>

 {/* Double Sharing */}
 <Grid item xs={12}>
 <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Double Sharing</Typography>
 </Grid>
 <Grid item xs={12} md={3}>
 <FormControlLabel
 control={
 <Checkbox
 checked={pgData.roomTypes.doubleSharingAvailable}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'doubleSharingAvailable', e.target.checked)}
 />
 }
 label="Available"
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Cost per Person per Month"
 InputProps={{
 startAdornment: <InputAdornment position="start">₹</InputAdornment>,
 }}
 value={pgData.roomTypes.doubleSharingCostPerPerson}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'doubleSharingCostPerPerson', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Total Rooms"
 type="number"
 value={pgData.roomTypes.totalDoubleSharingRooms}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'totalDoubleSharingRooms', parseInt(e.target.value))}
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Remaining Rooms"
 type="number"
 value={pgData.roomTypes.remainingDoubleSharingRooms}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'remainingDoubleSharingRooms', parseInt(e.target.value))}
 />
 </Grid>

 {/* Triple Sharing */}
 <Grid item xs={12}>
 <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>Triple Sharing</Typography>
 </Grid>
 <Grid item xs={12} md={3}>
 <FormControlLabel
 control={
 <Checkbox
 checked={pgData.roomTypes.tripleSharingAvailable}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'tripleSharingAvailable', e.target.checked)}
 />
 }
 label="Available"
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Cost per Person per Month"
 InputProps={{
 startAdornment: <InputAdornment position="start">₹</InputAdornment>,
 }}
 value={pgData.roomTypes.tripleSharingCostPerPerson}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'tripleSharingCostPerPerson', e.target.value)}
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Total Rooms"
 type="number"
 value={pgData.roomTypes.totalTripleSharingRooms}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'totalTripleSharingRooms', parseInt(e.target.value))}
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Remaining Rooms"
 type="number"
 value={pgData.roomTypes.remainingTripleSharingRooms}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'remainingTripleSharingRooms', parseInt(e.target.value))}
 />
 </Grid>

 {/* AC/Non-AC */}
 <Grid item xs={12}>
 <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>AC/Non-AC Rooms</Typography>
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="AC Rooms Available"
 type="number"
 value={pgData.roomTypes.acRoomsAvailable}
 disabled={!editMode}
 onChange={(e) => handleInputChange('roomTypes', 'acRoomsAvailable', parseInt(e.target.value))}
 />
 </Grid>
 <Grid item xs={12} md={6}>
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

 {/* Amenities - LIKE TRANSPORTATION */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>Amenities</Typography>
 </AccordionSummary>
 <AccordionDetails>
 {pgData.amenities.map((amenity) => (
 <Paper key={amenity.id} elevation={1} sx={{ p: 2, mb: 2 }}>
 <Grid container spacing={2} alignItems="center">
 <Grid item xs={12} md={2}>
 <FormControl fullWidth disabled={!editMode}>
 <InputLabel>Category</InputLabel>
 <Select
 value={amenity.category}
 label="Category"
 onChange={(e) => updateAmenity(amenity.id, 'category', e.target.value)}
 >
 <MenuItem value="Basic">Basic</MenuItem>
 <MenuItem value="Room">Room</MenuItem>
 <MenuItem value="Common">Common</MenuItem>
 <MenuItem value="Security">Security</MenuItem>
 <MenuItem value="Other">Other</MenuItem>
 </Select>
 </FormControl>
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Amenity Name"
 value={amenity.name}
 disabled={!editMode}
 onChange={(e) => updateAmenity(amenity.id, 'name', e.target.value)}
 placeholder="e.g., Wi-Fi, Power Backup"
 />
 </Grid>
 <Grid item xs={12} md={5}>
 <TextField
 fullWidth
 label="Description"
 value={amenity.description}
 disabled={!editMode}
 onChange={(e) => updateAmenity(amenity.id, 'description', e.target.value)}
 placeholder="Describe the amenity details"
 />
 </Grid>
 <Grid item xs={12} md={2}>
 {editMode && (
 <IconButton
 color="error"
 onClick={() => removeAmenityItem(amenity.id)}
 >
 <DeleteIcon />
 </IconButton>
 )}
 </Grid>
 </Grid>
 </Paper>
 ))}
 {editMode && (
 <Button
 variant="outlined"
 startIcon={<AddIcon />}
 onClick={addAmenityItem}
 >
 Add Amenity
 </Button>
 )}
 </AccordionDetails>
 </Accordion>

 {/* Food Services - LIKE TRANSPORTATION */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>Food Services</Typography>
 </AccordionSummary>
 <AccordionDetails>
 {pgData.foodServices.map((service) => (
 <Paper key={service.id} elevation={1} sx={{ p: 2, mb: 2 }}>
 <Grid container spacing={2} alignItems="center">
 <Grid item xs={12} md={2}>
 <TextField
 fullWidth
 label="Service Type"
 value={service.serviceType}
 disabled={!editMode}
 onChange={(e) => updateFoodService(service.id, 'serviceType', e.target.value)}
 placeholder="e.g., Breakfast, Lunch"
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Timing"
 value={service.timing}
 disabled={!editMode}
 onChange={(e) => updateFoodService(service.id, 'timing', e.target.value)}
 placeholder="e.g., 7:30-9:30 AM"
 />
 </Grid>
 <Grid item xs={12} md={2}>
 <TextField
 fullWidth
 label="Cost"
 value={service.cost}
 disabled={!editMode}
 InputProps={{
 startAdornment: <InputAdornment position="start">₹</InputAdornment>,
 }}
 onChange={(e) => updateFoodService(service.id, 'cost', e.target.value)}
 placeholder="1000"
 />
 </Grid>
 <Grid item xs={12} md={3}>
 <TextField
 fullWidth
 label="Description"
 value={service.description}
 disabled={!editMode}
 onChange={(e) => updateFoodService(service.id, 'description', e.target.value)}
 placeholder="Describe the food service"
 />
 </Grid>
 <Grid item xs={12} md={2}>
 {editMode && (
 <IconButton
 color="error"
 onClick={() => removeFoodServiceItem(service.id)}
 >
 <DeleteIcon />
 </IconButton>
 )}
 </Grid>
 </Grid>
 </Paper>
 ))}
 {editMode && (
 <Button
 variant="outlined"
 startIcon={<AddIcon />}
 onClick={addFoodServiceItem}
 >
 Add Food Service
 </Button>
 )}
 </AccordionDetails>
 </Accordion>

 {/* Owner Information - ALWAYS DISABLED */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary' }}>
 Owner Information (Read Only)
 </Typography>
 </AccordionSummary>
 <AccordionDetails>
 <Grid container spacing={3}>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Owner ID"
 value={pgData.owner.ownerId}
 disabled={true}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Owner Name"
 value={pgData.owner.ownerName}
 disabled={true}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Owner Email"
 value={pgData.owner.ownerEmail}
 disabled={true}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Owner Mobile"
 value={pgData.owner.ownerMobileNumber}
 disabled={true}
 />
 </Grid>
 <Grid item xs={12} md={6}>
 <TextField
 fullWidth
 label="Alternate Mobile"
 value={pgData.owner.ownerAlternateMobile}
 disabled={true}
 />
 </Grid>
 </Grid>
 </AccordionDetails>
 </Accordion>

 {/* Ratings & Reviews */}
 <Accordion sx={{ mb: 2 }}>
 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
 <Typography variant="h6" sx={{ fontWeight: 600 }}>Ratings & Reviews</Typography>
 </AccordionSummary>
 <AccordionDetails>
 <Grid container spacing={3}>
 <Grid item xs={12}>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
 <Typography variant="body1">Overall Rating</Typography>
 <Rating
 value={pgData.ratings.overallRating}
 disabled={!editMode}
 onChange={(event, newValue) => {
 handleInputChange('ratings', 'overallRating', newValue);
 }}
 />
 <Typography variant="body2" color="text.secondary">
 {pgData.ratings.overallRating}/5 ({pgData.ratings.totalReviews} reviews)
 </Typography>
 </Box>
 </Grid>

 <Grid item xs={12} md={6}>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
 <Typography variant="body2" sx={{ minWidth: 120 }}>Cleanliness Rating</Typography>
 <Rating
 value={pgData.ratings.cleanlinessRating}
 disabled={!editMode}
 onChange={(event, newValue) => {
 handleInputChange('ratings', 'cleanlinessRating', newValue);
 }}
 />
 </Box>
 </Grid>

 <Grid item xs={12} md={6}>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
 <Typography variant="body2" sx={{ minWidth: 120 }}>Location Rating</Typography>
 <Rating
 value={pgData.ratings.locationRating}
 disabled={!editMode}
 onChange={(event, newValue) => {
 handleInputChange('ratings', 'locationRating', newValue);
 }}
 />
 </Box>
 </Grid>

 <Grid item xs={12} md={6}>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
 <Typography variant="body2" sx={{ minWidth: 120 }}>Value for Money Rating</Typography>
 <Rating
 value={pgData.ratings.valueForMoneyRating}
 disabled={!editMode}
 onChange={(event, newValue) => {
 handleInputChange('ratings', 'valueForMoneyRating', newValue);
 }}
 />
 </Box>
 </Grid>

 <Grid item xs={12} md={6}>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
 <Typography variant="body2" sx={{ minWidth: 120 }}>Staff Behavior Rating</Typography>
 <Rating
 value={pgData.ratings.staffBehaviorRating}
 disabled={!editMode}
 onChange={(event, newValue) => {
 handleInputChange('ratings', 'staffBehaviorRating', newValue);
 }}
 />
 </Box>
 </Grid>

 <Grid item xs={12} md={6}>
 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
 <Typography variant="body2" sx={{ minWidth: 120 }}>Food Quality Rating</Typography>
 <Rating
 value={pgData.ratings.foodQualityRating}
 disabled={!editMode}
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