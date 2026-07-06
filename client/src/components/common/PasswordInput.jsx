import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

/**
 * Reusable password input with lock icon and visibility toggle.
 */
const PasswordInput = ({
  label = "Password",
  id = "password",
  placeholder = "••••••••",
  error,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col space-y-1.5">
      <div className="flex justify-between items-center">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-semibold text-dark-300 uppercase tracking-wider"
          >
            {label} {required && <span className="text-brand-400">*</span>}
          </label>
        )}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-500">
          <Lock className="h-4.5 w-4.5" />
        </div>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={`w-full bg-dark-900/60 border ${
            error ? 'border-red-500/50 focus:border-red-500' : 'border-dark-800 focus:border-brand-500'
          } rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-dark-500 outline-none transition-all focus:ring-2 focus:ring-brand-500/20`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-500 hover:text-dark-300 transition-colors focus:outline-none cursor-pointer"
        >
          {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
        </button>
      </div>
      {error && (
        <span className="text-xs text-red-400 font-medium animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
