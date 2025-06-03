import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // Not authenticated, redirect to login page (or auth page)
    return <Navigate to="/" replace />;
  }
  // Authenticated, render the child components (protected page)
  return children;
};

export default ProtectedRoute;
