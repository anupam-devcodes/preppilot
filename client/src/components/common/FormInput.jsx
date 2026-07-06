import React from 'react';

/**
 * Reusable accessible form input with custom label, icon, and validation feedback.
 */
const FormInput = ({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  icon: Icon,
  required = false,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-dark-300 uppercase tracking-wider"
        >
          {label} {required && <span className="text-brand-400">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-dark-500">
            <Icon className="h-4.5 w-4.5" />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full bg-dark-900/60 border ${
            error ? 'border-red-500/50 focus:border-red-500' : 'border-dark-800 focus:border-brand-500'
          } rounded-xl py-2.5 ${
            Icon ? 'pl-10' : 'px-4'
          } pr-4 text-sm text-white placeholder-dark-500 outline-none transition-all focus:ring-2 focus:ring-brand-500/20`}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-400 font-medium animate-fadeIn">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
