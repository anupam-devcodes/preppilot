import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../features/auth/hooks/useAuth';
import {
  FileText,
  AlertTriangle,
  HelpCircle,
  Download,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle,
  Terminal
} from 'lucide-react';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: FileText,
      title: "AI Resume Analysis",
      description: "Submit your resume for an automated audit. Get actionable advice on formatting, impact, and phrasing within seconds.",
      color: "text-brand-400 bg-brand-500/10 border-brand-500/20"
    },
    {
      icon: AlertTriangle,
      title: "Skill Gap Detection",
      description: "Compare your experience against real-world job listings. Instantly see which competencies are missing from your resume.",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      icon: HelpCircle,
      title: "Tailored Interview Questions",
      description: "Train with custom questions tailored to your profile and targeted roles. Perfect your answers with step-by-step guidance.",
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20"
    },
    {
      icon: Download,
      title: "ATS-Friendly Resume Export",
      description: "Build and export highly structured resumes designed to easily bypass Automated Tracking Systems (ATS).",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-white flex flex-col relative overflow-x-hidden">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10 flex flex-col items-center text-center">
        {/* Banner Announcement */}
        <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 rounded-full py-1.5 px-4 text-xs font-semibold text-brand-300 mb-6 sm:mb-8 hover:bg-brand-500/15 transition-all">
          <Zap className="h-3.5 w-3.5 text-brand-400" />
          <span>AI-powered interview preparation platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          Navigate Your Next Career Move with{" "}
          <span className="bg-gradient-to-r from-brand-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
            AI Precision
          </span>
        </h1>

        {/* Hero Description */}
        <p className="text-dark-300 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mb-8 sm:mb-10">
          Analyze resumes, identify crucial skill gaps, and simulate tailored interview scenarios. PrepPilot provides the insights you need to land the offer.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {isAuthenticated ? (
            <Link
              to={ROUTES.DASHBOARD}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 py-3.5 px-8 font-semibold text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          ) : (
            <>
              <Link
                to={ROUTES.REGISTER}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 py-3.5 px-8 font-semibold text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Start Preparing Free</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
              <Link
                to={ROUTES.LOGIN}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-dark-900/60 border border-dark-800 hover:border-dark-700 py-3.5 px-8 font-semibold text-dark-100 hover:text-white transition-all"
              >
                <span>Sign In</span>
              </Link>
            </>
          )}
        </div>

        {/* Hero Interactive Terminal Graphic Preview */}
        <div className="mt-16 sm:mt-20 w-full max-w-4xl glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative shadow-black/80">
          <div className="flex items-center justify-between px-4 py-3 bg-dark-950 border-b border-dark-900 text-dark-500 text-xs">
            <div className="flex space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-dark-400">preppilot-simulation --ai-audit</span>
            <div className="w-12" />
          </div>
          <div className="p-6 text-left font-mono text-xs sm:text-sm text-dark-300 space-y-3 bg-dark-950/40">
            <p className="text-brand-400">$ preppilot analyze --resume=my_cv.pdf --role="Senior Frontend Engineer"</p>
            <p className="text-yellow-400">➜ Running AI Resume Auditor...</p>
            <p className="text-green-400">✓ Parsed 4 job details and matched with targeted keywords.</p>
            <p className="text-white">★ SCORE: 82/100 (ATS Friendly)</p>
            <div className="border-t border-dark-800 my-4 pt-3 text-dark-400 space-y-1">
              <p className="text-red-400">✗ Gap Identified: Lacks demonstrated experience in Web Accessibility (WCAG 2.1).</p>
              <p className="text-emerald-400">✓ Recommendation: Emphasize React performance profiling tools used in previous roles.</p>
            </div>
            <p className="text-brand-500">➜ Generating 5 custom technical interview questions... [Done]</p>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10 border-t border-dark-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Coaching Engineered for Technical Professionals
          </h2>
          <p className="text-dark-300 text-sm sm:text-base leading-relaxed">
            PrepPilot goes beyond mock interviews by combining real resume grading with targeted learning paths to patch up your profile before you step into the room.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-brand-500/20 transition-all group flex flex-col items-start"
            >
              <div className={`p-3 rounded-xl border ${feature.color} mb-5 group-hover:scale-105 transition-transform`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full z-10 text-center">
        <div className="glass p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 relative z-10">
            Ready to Navigate Your Next Interview?
          </h2>
          <p className="text-dark-300 text-sm sm:text-base max-w-xl mx-auto mb-8 relative z-10">
            Sign up today and get access to the resume analyzer tool and start prepping with realistic questions.
          </p>
          <div className="relative z-10">
            {isAuthenticated ? (
              <Link
                to={ROUTES.DASHBOARD}
                className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 py-3 px-6 font-semibold text-white shadow-lg cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            ) : (
              <Link
                to={ROUTES.REGISTER}
                className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 py-3 px-6 font-semibold text-white shadow-lg cursor-pointer"
              >
                <span>Create Free Account</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
