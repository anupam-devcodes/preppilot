import React from 'react';

/**
 * Centered header inside AuthCard.
 */
const AuthHeader = ({ title, description }) => {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-dark-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default AuthHeader;
