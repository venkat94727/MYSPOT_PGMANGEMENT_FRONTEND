import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Grid, Card, CardContent, Avatar, 
  Rating, Chip, Button, TextField, Dialog, DialogTitle, 
  DialogContent, DialogActions, Tabs, Tab, Divider
} from '@mui/material';
import { 
  Star, StarBorder, ThumbUp, ThumbDown, Reply, 
  Person, TrendingUp, Assessment, Reviews
} from '@mui/icons-material';

const CustomerReviewPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [replyDialog, setReplyDialog] = useState({ open: false, reviewId: null });
  const [replyText, setReplyText] = useState('');

  // Mock review data
  const reviews = [
    {
      id: 1,
      customerName: 'John Doe',
      avatar: '/avatars/john.jpg',
      rating: 5,
      date: '2024-08-25',
      property: 'Comfort PG - Room A-101',
      review: 'Excellent accommodation! The room was clean, well-maintained, and the staff was very helpful. The location is perfect for my office commute. Highly recommended!',
      helpful: 12,
      notHelpful: 1,
      replied: true,
      status: 'published'
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      rating: 4,
      date: '2024-08-24',
      property: 'Green Valley PG - Room B-205',
      review: 'Good place to stay. The facilities are decent and the price is reasonable. WiFi could be faster, but overall a pleasant experience.',
      helpful: 8,
      notHelpful: 2,
      replied: false,
      status: 'published'
    },
    {
      id: 3,
      customerName: 'Mike Wilson',
      avatar: '/avatars/mike.jpg',
      rating: 3,
      date: '2024-08-23',
      property: 'City Center PG - Room C-301',
      review: 'Average accommodation. The room was okay but maintenance could be better. AC was not working properly during my stay.',
      helpful: 5,
      notHelpful: 0,
      replied: true,
      status: 'published'
    },
    {
      id: 4,
      customerName: 'Emma Davis',
      avatar: '/avatars/emma.jpg',
      rating: 5,
      date: '2024-08-22',
      property: 'Comfort PG - Room A-102',
      review: 'Amazing experience! Clean rooms, friendly staff, and great amenities. The food quality is excellent. Will definitely stay here again.',
      helpful: 15,
      notHelpful: 0,
      replied: true,
      status: 'published'
    },
    {
      id: 5,
      customerName: 'David Brown',
      avatar: '/avatars/david.jpg',
      rating: 2,
      date: '2024-08-21',
      property: 'Budget PG - Room D-101',
      review: 'Not satisfied with the service. Room was not clean upon arrival and hot water was not available. Staff response was slow.',
      helpful: 3,
      notHelpful: 8,
      replied: false,
      status: 'pending'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReplyClick = (reviewId) => {
    setReplyDialog({ open: true, reviewId });
  };

  const handleReplySubmit = () => {
    // Handle reply submission
    console.log('Reply submitted for review:', replyDialog.reviewId, replyText);
    setReplyDialog({ open: false, reviewId: null });
    setReplyText('');
  };

  const getFilteredReviews = () => {
    switch (tabValue) {
      case 0: return reviews; // All
      case 1: return reviews.filter(r => r.rating >= 4); // Positive (4-5 stars)
      case 2: return reviews.filter(r => r.rating <= 3); // Negative (1-3 stars)
      case 3: return reviews.filter(r => !r.replied); // Needs Reply
      default: return reviews;
    }
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const positiveReviews = reviews.filter(r => r.rating >= 4).length;
  const needsReply = reviews.filter(r => !r.replied).length;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
        ⭐ Welcome Customer Reviews
      </Typography>

      {/* Review Statistics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Reviews sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Total Reviews</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{totalReviews}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Star sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Average Rating</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {averageRating.toFixed(1)}/5
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Positive Reviews</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{positiveReviews}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)' }}>
            <CardContent sx={{ color: 'white', textAlign: 'center' }}>
              <Reply sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Needs Reply</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>{needsReply}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Rating Distribution */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Rating Distribution
        </Typography>
        <Grid container spacing={2}>
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter(r => r.rating === stars).length;
            const percentage = (count / totalReviews) * 100;
            return (
              <Grid item xs={12} key={stars}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 80 }}>
                    <Typography variant="body2">{stars}</Typography>
                    <Star sx={{ fontSize: 16, color: '#FFD700', ml: 0.5 }} />
                  </Box>
                  <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', borderRadius: 2, height: 8 }}>
                    <Box 
                      sx={{ 
                        width: `${percentage}%`, 
                        bgcolor: '#FFD700', 
                        height: '100%', 
                        borderRadius: 2 
                      }} 
                    />
                  </Box>
                  <Typography variant="body2" sx={{ minWidth: 40 }}>
                    {count}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* Review Tabs */}
      <Paper>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Reviews" />
          <Tab label="Positive (4-5★)" />
          <Tab label="Negative (1-3★)" />
          <Tab label={`Needs Reply (${needsReply})`} />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {getFilteredReviews().map((review, index) => (
            <React.Fragment key={review.id}>
              <Card sx={{ mb: 2, border: 1, borderColor: 'grey.200' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {review.customerName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {review.property}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {review.date}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={review.rating} readOnly size="small" />
                      <Chip 
                        label={review.status} 
                        size="small" 
                        color={review.status === 'published' ? 'success' : 'warning'}
                      />
                    </Box>
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {review.review}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbUp sx={{ fontSize: 16, color: 'success.main' }} />
                        <Typography variant="body2">{review.helpful}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbDown sx={{ fontSize: 16, color: 'error.main' }} />
                        <Typography variant="body2">{review.notHelpful}</Typography>
                      </Box>
                      {review.replied && (
                        <Chip label="Replied" size="small" color="info" />
                      )}
                    </Box>
                    {!review.replied && (
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<Reply />}
                        onClick={() => handleReplyClick(review.id)}
                      >
                        Reply
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </React.Fragment>
          ))}
        </Box>
      </Paper>

      {/* Reply Dialog */}
      <Dialog 
        open={replyDialog.open} 
        onClose={() => setReplyDialog({ open: false, reviewId: null })}
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>Reply to Review</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Thank you for your feedback..."
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialog({ open: false, reviewId: null })}>
            Cancel
          </Button>
          <Button onClick={handleReplySubmit} variant="contained">
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerReviewPage;
