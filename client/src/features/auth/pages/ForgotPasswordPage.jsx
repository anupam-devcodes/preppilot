import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../../../constants/routes';
import AuthLayout from '../../../components/layout/AuthLayout';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import AuthFooter from '../components/AuthFooter';
import FormInput from '../../../components/common/FormInput';
import ErrorMessage from '../../../components/common/ErrorMessage';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { Mail, Loader2, KeyRound } from 'lucide-react';

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const tempErrors = {};
    if (!email) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
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
      await forgotPassword(email);
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400">
              <KeyRound className="h-10 w-10 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Link Dispatched
              </h2>
              <p className="text-sm text-dark-300">
                If an account exists with this email, a password reset link has been sent.
              </p>
            </div>

            <p className="text-xs text-dark-400">
              Please check your spam or promotions folder if you do not receive the email in a few minutes.
            </p>

            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="w-full bg-dark-900 border border-dark-800 hover:border-brand-500 hover:bg-dark-800 py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer"
            >
              Back to Sign In
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
          title="Forgot Password?"
          description="Enter your email to receive a password reset link"
        />

        {apiError && <ErrorMessage message={apiError} onClose={() => setApiError('')} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Email Address"
            id="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            icon={Mail}
            required
            autoComplete="email"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 disabled:from-brand-800 disabled:to-purple-800 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending Link...</span>
              </>
            ) : (
              <span>Send Reset Link</span>
            )}
          </button>
        </form>

        <AuthFooter
          text="Remember your password?"
          linkText="Sign in"
          linkTo={ROUTES.LOGIN}
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
