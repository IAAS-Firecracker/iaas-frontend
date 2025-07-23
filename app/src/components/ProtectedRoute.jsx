// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isTokenExpired } from '../utils/jwtUtils';

const ProtectedRoute = ({ children }) => {
  const { token, isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated || !token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;