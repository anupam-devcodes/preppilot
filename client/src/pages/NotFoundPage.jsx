import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Compass, HelpCircle, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center px-4 py-12 bg-dark-950 overflow-hidden text-center">
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full space-y-6 relative z-10 flex flex-col items-center">
        {/* Animated Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 mb-2 relative animate-pulse">
          <HelpCircle className="h-10 w-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-black text-white tracking-wider">404</h1>
          <h2 className="text-2xl font-bold text-dark-100">Page Not Found</h2>
          <p className="text-sm text-dark-400">
            The path you're looking for doesn't exist, has been relocated, or is temporarily offline.
          </p>
        </div>

        <div className="pt-4 w-full">
          <Link
            to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LANDING}
            className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-lg cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isAuthenticated ? 'Back to Dashboard' : 'Back to Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
