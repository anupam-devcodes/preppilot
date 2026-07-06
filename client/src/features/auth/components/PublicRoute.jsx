import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../../../components/common/LoadingScreen';
import { ROUTES } from '../../../constants/routes';

/**
 * Route guard that redirects authenticated users away from auth pages (login, register).
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading, authChecked } = useAuth();

  if (isLoading || !authChecked) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};

export default PublicRoute;
