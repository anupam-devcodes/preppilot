import React from 'react';

/**
 * Centered Loading Spinner with elegant dark-mode styling.
 */
const LoadingScreen = ({ message = "Loading PrepPilot..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-950">
      {/* Decorative gradient glow behind the spinner */}
      <div className="absolute w-64 h-64 bg-brand-500/10 rounded-full blur-3xl glow-purple animate-pulse" />
      
      <div className="relative flex flex-col items-center">
        {/* Modern styled spinner */}
        <div className="w-16 h-16 border-4 border-dark-800 border-t-brand-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(139,92,246,0.3)]" />
        <p className="text-dark-300 text-sm font-medium tracking-wide animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
