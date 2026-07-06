import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../../../components/common/LoadingScreen';
import { ROUTES } from '../../../constants/routes';

/**
 * Route guard that redirects unauthenticated users to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, authChecked } = useAuth();
  const location = useLocation();

  if (isLoading || !authChecked) {
    return <LoadingScreen message="Verifying session..." />;
  }

  if (!isAuthenticated) {
    // Save the original location the user tried to access
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
