import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { ROUTES } from '../constants/routes';
import DashboardLayout from '../components/layout/DashboardLayout';
import {
  FileText,
  AlertTriangle,
  HelpCircle,
  Download,
  LogOut,
  Mail,
  User,
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const modules = [
    {
      icon: FileText,
      title: "Resume Analyzer",
      description: "Upload your CV/Resume and let PrepPilot audit your structure, bullet-points, and formatting styles.",
      status: "In Development",
      color: "from-brand-500/10 to-brand-500/0 border-brand-500/10 text-brand-400"
    },
    {
      icon: AlertTriangle,
      title: "Skill Gap Report",
      description: "Match your resume text against selected job descriptions to map missing keywords and skills.",
      status: "Coming Soon",
      color: "from-amber-500/10 to-amber-500/0 border-amber-500/10 text-amber-400"
    },
    {
      icon: HelpCircle,
      title: "Interview Question Generator",
      description: "Get targeted behavioral and technical interview questions crafted specifically around your gaps.",
      status: "Coming Soon",
      color: "from-sky-500/10 to-sky-500/0 border-sky-500/10 text-sky-400"
    },
    {
      icon: Download,
      title: "ATS Resume Export",
      description: "Rebuild your resume directly inside PrepPilot and export it as an ATS-optimized PDF.",
      status: "Planned",
      color: "from-emerald-500/10 to-emerald-500/0 border-emerald-500/10 text-emerald-400"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Welcome Header */}
        <div className="glass p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex items-center space-x-4">
            {user?.avatar?.url ? (
              <img
                src={`http://localhost:5000${user.avatar.url}`}
                alt={user.fullName}
                className="h-16 w-16 rounded-full object-cover border-2 border-brand-500/40 shadow-lg"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-brand-600/30 flex items-center justify-center border-2 border-brand-500/40 text-brand-300 text-2xl font-bold shadow-lg">
                {user?.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Welcome back, {user?.fullName || 'User'}!
              </h2>
              <p className="text-xs sm:text-sm text-dark-400 flex items-center space-x-1.5">
                <Mail className="h-3.5 w-3.5" />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-xs text-dark-400 bg-dark-900 border border-dark-800 px-3 py-1.5 rounded-lg flex items-center space-x-1.5">
              <Calendar className="h-3.5 w-3.5 text-brand-400" />
              <span>Joined {new Date(user?.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 py-2 px-4 rounded-lg text-red-400 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Modules Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white">Interview Modules</h3>
            <p className="text-xs text-dark-400">Teasers for components coming in subsequent platform updates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border bg-dark-950 ${mod.color.split(' ').slice(2).join(' ')}`}>
                      <mod.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-dark-900 border border-dark-800 text-dark-400">
                      {mod.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-white flex items-center space-x-1.5">
                      <span>{mod.title}</span>
                    </h4>
                    <p className="text-xs text-dark-400 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-dark-850 mt-6 pt-4 flex items-center justify-between text-dark-500 text-xs font-semibold">
                  <span className="flex items-center space-x-1">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Locked</span>
                  </span>
                  <span className="group-hover:text-white transition-colors flex items-center space-x-1">
                    <span>Preview</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
