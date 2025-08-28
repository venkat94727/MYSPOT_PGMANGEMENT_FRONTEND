import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Lazy load pages
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
// ADD this line with other lazy imports


// Dashboard Layout and Pages
const WelcomeDashboard = lazy(() => import('@/components/dashboard/WelcomeDashboard'));
const DashboardOverviewPage = lazy(() => import('@/pages/dashboard/DashboardOverviewPage'));
const PGManagementPage = lazy(() => import('@/pages/dashboard/PGManagementPage')); // Updated import
const BookingManagementPage = lazy(() => import('@/pages/dashboard/BookingManagementPage'));
const GuestManagementPage = lazy(() => import('@/pages/dashboard/GuestManagementPage'));
const AnalyticsPage = lazy(() => import('@/pages/dashboard/AnalyticsPage'));
const NotificationPage = lazy(() => import('@/pages/dashboard/NotificationPage'));
const CustomerReviewPage = lazy(() => import('@/pages/dashboard/CustomerReviewPage'));
const ProfileSettingsPage = lazy(() => import('@/pages/dashboard/ProfileSettingsPage'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard/overview" replace />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Public Routes */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <WelcomeDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="overview" element={<DashboardOverviewPage />} />
          <Route path="pg-management" element={<PGManagementPage />} /> {/* Updated route */}
          <Route path="bookings" element={<BookingManagementPage />} />
          <Route path="guests" element={<GuestManagementPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="reviews" element={<CustomerReviewPage />} />
          <Route path="profile" element={<ProfileSettingsPage />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
