// src/components/RouteGuards.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

// Loading component
const RouteLoading = ({ message = "Loading..." }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      gap: 2
    }}
  >
    <CircularProgress />
    <span>{message}</span>
  </Box>
);

// Protected Route Component
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const isRehydrated = useSelector(state => state._persist?.rehydrated);
  
  console.log('🛡️ ProtectedRoute check:', { 
    isAuthenticated, 
    isRehydrated, 
    userRole: user?.role,
    allowedRoles 
  });
  
  // Wait for rehydration to complete
  if (!isRehydrated) {
    return <RouteLoading message="Restoring session..." />;
  }
  
  if (!isAuthenticated) {
    console.log('🚫 Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    console.log('🚫 Insufficient permissions, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Public Route Component (redirect to dashboard if already logged in)
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const isRehydrated = useSelector(state => state._persist?.rehydrated);
  
  console.log('🌐 PublicRoute check:', { 
    isAuthenticated, 
    isRehydrated, 
    userRole: user?.role 
  });
  
  // Wait for rehydration to complete
  if (!isRehydrated) {
    return <RouteLoading message="Checking authentication..." />;
  }
  
  if (isAuthenticated) {
    // Role-based redirect
    const redirectTo = '/dashboard';
    
    console.log('✅ User authenticated, redirecting to:', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }
  
  return children;
};