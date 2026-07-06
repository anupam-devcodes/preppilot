import React from 'react';

/**
 * Card container with premium glassmorphism styling for Auth pages.
 */
const AuthCard = ({ children }) => {
  return (
    <div className="w-full glass shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl border border-white/10 p-6 sm:p-8 relative transition-all">
      {/* Visual background element inside the card */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />
      <div className="relative z-10 space-y-6">
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
