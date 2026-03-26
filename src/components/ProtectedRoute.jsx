import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();  // Assume isAuthenticated is set in context
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Return the protected element if authenticated
  return element;
};

export default ProtectedRoute;