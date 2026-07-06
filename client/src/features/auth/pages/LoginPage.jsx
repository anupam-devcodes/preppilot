import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../../../constants/routes';
import AuthLayout from '../../../components/layout/AuthLayout';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import AuthFooter from '../components/AuthFooter';
import FormInput from '../../../components/common/FormInput';
import PasswordInput from '../../../components/common/PasswordInput';
import ErrorMessage from '../../../components/common/ErrorMessage';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { Mail, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Validation and API error states
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect path
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const validateForm = () => {
    const tempErrors = {};
    if (!email) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      tempErrors.password = "Password is required";
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
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome Back"
          description="Access your dashboard and resume reports"
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

          <div className="space-y-1">
            <PasswordInput
              label="Password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
              autoComplete="current-password"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
                className="text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors cursor-pointer"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 disabled:from-brand-800 disabled:to-purple-800 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <AuthFooter
          text="Don't have an account?"
          linkText="Sign up free"
          linkTo={ROUTES.REGISTER}
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default LoginPage;
