import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout wrapper for dashboard and authenticated content pages.
 */
const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-950 flex flex-col relative overflow-x-hidden">
      {/* Subtle backdrop glows */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-brand-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Panel Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
