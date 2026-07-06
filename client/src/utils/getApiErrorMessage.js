/**
 * Extract a human-readable error message from an API error response.
 * Handles nested backend errors and Zod validation errors format.
 */
export const getApiErrorMessage = (error) => {
  if (error?.response?.data) {
    const data = error.response.data;
    
    // Check if the backend sent a single error message
    if (data.message) {
      return data.message;
    }
    
    // Check if there are multiple validation/zod errors
    if (data.errors) {
      if (Array.isArray(data.errors)) {
        return data.errors.map(err => err.message || err).join(', ');
      }
      if (typeof data.errors === 'object') {
        return Object.values(data.errors).join(', ');
      }
    }
  }

  // Fallback to JS error message
  if (error?.message) {
    if (error.message === 'Network Error') {
      return 'Unable to connect to the server. Please check if the backend is running.';
    }
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};
