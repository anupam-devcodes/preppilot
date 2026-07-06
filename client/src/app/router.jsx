import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

// Route guards
import ProtectedRoute from '../features/auth/components/ProtectedRoute';
import PublicRoute from '../features/auth/components/PublicRoute';

// Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import VerifyEmailPage from '../features/auth/pages/VerifyEmailPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * Configure routes and tie page elements to route guards and paths.
 */
const router = createBrowserRouter([
  {
    path: ROUTES.LANDING,
    element: <LandingPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <PublicRoute>
        <ForgotPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: (
      <PublicRoute>
        <ResetPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);

export default router;
