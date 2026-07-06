import api from '../../../config/api';

/**
 * Register a new user.
 * @param {FormData} formData - Multipart form data containing fullName, email, password, and optional avatar.
 */
export const registerUser = async (formData) => {
  const response = await api.post('/auth/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Log in a user.
 * @param {Object} credentials - { email, password }
 */
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

/**
 * Log out the current user.
 */
export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

/**
 * Restore the currently logged-in user session.
 */
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

/**
 * Verify a user's email with the token sent to their inbox.
 * @param {string} token
 */
export const verifyEmail = async (token) => {
  const response = await api.get(`/auth/verify-email/${token}`);
  return response.data;
};

/**
 * Resend the verification email to a user.
 * @param {string} email
 */
export const resendVerificationEmail = async (email) => {
  const response = await api.post('/auth/resend-verification', { email });
  return response.data;
};

/**
 * Send a forgot password email.
 * @param {string} email
 */
export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

/**
 * Reset password using the reset token.
 * @param {string} token
 * @param {string} password
 */
export const resetPassword = async (token, password) => {
  const response = await api.patch(`/auth/reset-password/${token}`, { password });
  return response.data;
};
