import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../../../constants/routes';
import AuthLayout from '../../../components/layout/AuthLayout';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import PasswordInput from '../../../components/common/PasswordInput';
import ErrorMessage from '../../../components/common/ErrorMessage';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { Loader2, CheckCircle2 } from 'lucide-react';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const tempErrors = {};
    if (!password) {
      tempErrors.password = "New password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setErrors({});

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await resetPassword(token, password);
      setIsSuccess(true);
    } catch (err) {
      setApiError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <AuthCard>
          <div className="text-center space-y-6 py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Password Reset Successfully
              </h2>
              <p className="text-sm text-dark-300">
                Your password has been changed and your session has been established.
              </p>
            </div>

            <button
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="w-full bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-lg transition-all cursor-pointer"
            >
              Proceed to Dashboard
            </button>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Reset Password"
          description="Enter a new secure password for your account"
        />

        {apiError && <ErrorMessage message={apiError} onClose={() => setApiError('')} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            label="New Password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
            autoComplete="new-password"
          />

          <PasswordInput
            label="Confirm New Password"
            id="confirmPassword"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 disabled:from-brand-800 disabled:to-purple-800 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving Password...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
