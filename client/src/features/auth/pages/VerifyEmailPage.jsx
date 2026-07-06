import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../../../constants/routes';
import AuthLayout from '../../../components/layout/AuthLayout';
import AuthCard from '../components/AuthCard';
import AuthHeader from '../components/AuthHeader';
import FormInput from '../../../components/common/FormInput';
import ErrorMessage from '../../../components/common/ErrorMessage';
import { getApiErrorMessage } from '../../../utils/getApiErrorMessage';
import { Loader2, CheckCircle2, XCircle, Mail, Send } from 'lucide-react';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  
  // Resend verification states
  const [resendEmail, setResendEmail] = useState('');
  const [resendError, setResendError] = useState('');
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Prevent double API call in React 18 Strict Mode
  const verifiedRef = useRef(false);

  useEffect(() => {
    const performVerification = async () => {
      if (verifiedRef.current) return;
      verifiedRef.current = true;

      try {
        await verifyEmail(token);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setErrorMessage(getApiErrorMessage(err));
      }
    };

    if (token) {
      performVerification();
    } else {
      setStatus('error');
      setErrorMessage("No verification token found in URL.");
    }
  }, [token, verifyEmail]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendError('');
    setResendSuccess(false);

    if (!resendEmail) {
      setResendError("Please enter your email address.");
      return;
    }

    setIsResending(true);
    try {
      await resendVerificationEmail(resendEmail);
      setResendSuccess(true);
    } catch (err) {
      setResendError(getApiErrorMessage(err));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        {status === 'loading' && (
          <div className="text-center space-y-6 py-6">
            <Loader2 className="h-12 w-12 animate-spin text-brand-500 mx-auto" />
            <AuthHeader
              title="Verifying Email"
              description="Please wait while we confirm your email address..."
            />
          </div>
        )}

        {status === 'success' && (
          <div className="text-center space-y-6 py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="h-10 w-10 animate-pulse" />
            </div>
            
            <AuthHeader
              title="Email Verified!"
              description="Your account is now active and ready."
            />

            <button
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="w-full bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-lg transition-all cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 text-red-400">
                <XCircle className="h-10 w-10" />
              </div>
              
              <AuthHeader
                title="Verification Failed"
                description={errorMessage}
              />
            </div>

            <div className="border-t border-dark-800/80 pt-5 space-y-4">
              <h3 className="text-sm font-bold text-white text-center">
                Need a new verification link?
              </h3>
              
              {resendError && <ErrorMessage message={resendError} onClose={() => setResendError('')} />}
              {resendSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-300 text-sm">
                  A new verification link has been sent to your email.
                </div>
              )}

              <form onSubmit={handleResend} className="space-y-3">
                <FormInput
                  label="Email Address"
                  id="resendEmail"
                  type="email"
                  placeholder="name@company.com"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  icon={Mail}
                  required
                />
                
                <button
                  type="submit"
                  disabled={isResending}
                  className="w-full flex items-center justify-center space-x-2 bg-dark-900 border border-dark-800 hover:border-brand-500 hover:bg-dark-800 disabled:bg-dark-900 disabled:border-dark-800 py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Resending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 text-brand-400" />
                      <span>Request New Link</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={() => navigate(ROUTES.LOGIN)}
                className="text-sm font-semibold text-dark-400 hover:text-white transition-colors cursor-pointer"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
