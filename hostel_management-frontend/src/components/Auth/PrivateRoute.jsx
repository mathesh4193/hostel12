import React from 'react';
import { Navigate } from 'react-router-dom';

// Make sure the component is properly defined and exported
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  // Render the protected component if authenticated
  return children;
};

// Make sure to export the component as default
export default PrivateRoute;