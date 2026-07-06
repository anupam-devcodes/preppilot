import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Standard Alert box for rendering error states.
 */
const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="flex items-start space-x-3 bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-200 text-sm animate-fadeIn">
      <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-medium text-red-300">Something went wrong</p>
        <p className="mt-1 text-red-200/80 leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300 font-bold px-1.5 py-0.5 rounded cursor-pointer"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
