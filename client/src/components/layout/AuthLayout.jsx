import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { Compass, ArrowLeft } from 'lucide-react';

/**
 * Layout wrapper for all authorization pages (Login, Register, Forgot Password, etc.)
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center px-4 py-12 bg-dark-950 overflow-hidden">
      {/* Dynamic decorative backdrop glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Back to Home action link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to={ROUTES.LANDING}
          className="flex items-center space-x-1.5 text-sm text-dark-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to home</span>
        </Link>
      </div>

      {/* Auth Content Container */}
      <div className="w-full max-w-md z-10 flex flex-col items-center">
        {/* Brand Logo Header */}
        <Link to={ROUTES.LANDING} className="flex items-center space-x-2 text-white font-bold text-2xl mb-8 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-purple-400 text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Compass className="h-6 w-6" />
          </div>
          <span className="bg-gradient-to-r from-white via-dark-100 to-brand-300 bg-clip-text text-transparent">
            PrepPilot
          </span>
        </Link>

        {/* Content Card injection */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
