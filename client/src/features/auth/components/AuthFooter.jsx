import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component for auth pages containing toggle links.
 */
const AuthFooter = ({ text, linkText, linkTo }) => {
  return (
    <div className="text-center text-sm text-dark-400 mt-4 border-t border-dark-800/60 pt-4">
      <span>{text} </span>
      <Link
        to={linkTo}
        className="font-semibold text-brand-400 hover:text-brand-300 transition-colors"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default AuthFooter;
