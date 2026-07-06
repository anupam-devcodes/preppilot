import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../../../constants/routes';
import AuthLayout from '../../../components/layout/AuthLayout';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import AuthFooter from '../components/AuthFooter';
import FormInput from '../../../components/common/FormInput';
import PasswordInput from '../../../components/common/PasswordInput';
import AvatarUploader from '../../../components/common/AvatarUploader';
import ErrorMessage from '../../../components/common/ErrorMessage';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { Mail, User, Loader2, CheckCircle2 } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  // States
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const tempErrors = {};
    if (!fullName.trim()) {
      tempErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 2) {
      tempErrors.fullName = "Full name must be at least 2 characters long";
    }

    if (!email) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
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
    
    // Construct multi-part form data
    const formData = new FormData();
    formData.append('fullName', fullName.trim());
    formData.append('email', email.trim());
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      await register(formData);
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
                Check Your Inbox
              </h2>
              <p className="text-sm text-dark-300">
                Account created successfully! We've sent a verification link to <span className="font-semibold text-white">{email}</span>.
              </p>
            </div>

            <p className="text-xs text-dark-400">
              Please click the link inside the email to activate your account and start using PrepPilot.
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
          title="Create Account"
          description="Sign up to start simulating AI interviews"
        />

        {apiError && <ErrorMessage message={apiError} onClose={() => setApiError('')} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <AvatarUploader
            onChange={(file) => setAvatar(file)}
            error={errors.avatar}
          />

          <FormInput
            label="Full Name"
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            icon={User}
            required
            autoComplete="name"
          />

          <FormInput
            label="Email Address"
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            icon={Mail}
            required
            autoComplete="email"
          />

          <PasswordInput
            label="Password"
            id="password"
            placeholder="•••••••• (6+ characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
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
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        <AuthFooter
          text="Already have an account?"
          linkText="Sign in"
          linkTo={ROUTES.LOGIN}
        />
      </AuthCard>
    </AuthLayout>
  );
};

export default RegisterPage;
