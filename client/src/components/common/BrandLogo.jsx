import React from 'react';
import { Compass } from 'lucide-react';

/**
 * Reusable PrepPilot Brand Logo component.
 * Supports sm, md, lg size variants.
 */
const BrandLogo = ({ size = 'md', className = '' }) => {
  const containerSizes = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10',
  };

  const iconSizes = {
    sm: 'h-4.5 w-4.5',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`flex items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-purple-400 text-white shadow-md shadow-brand-500/20 transition-transform ${containerSizes[size]}`}>
        <Compass className={`${iconSizes[size]} animate-pulse`} />
      </div>
      <span className={`font-bold bg-gradient-to-r from-white via-dark-100 to-brand-300 bg-clip-text text-transparent tracking-tight ${textSizes[size]}`}>
        PrepPilot
      </span>
    </div>
  );
};

export default BrandLogo;
