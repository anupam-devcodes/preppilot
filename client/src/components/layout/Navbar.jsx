import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleBrandClick = (e) => {
    if (location.pathname === ROUTES.LANDING) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(ROUTES.LANDING);
      // Wait for DOM layout and then scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0 });
      }, 50);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass border-b border-dark-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to={ROUTES.LANDING} 
              onClick={handleBrandClick}
              className="flex items-center group cursor-pointer"
            >
              <BrandLogo size="md" className="group-hover:scale-[1.01] transition-transform" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">Features</a>
            <a href="#about" className="text-dark-300 hover:text-white transition-colors text-sm font-medium">About</a>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 border-l border-dark-800 pl-6">
                <Link
                  to={ROUTES.DASHBOARD}
                  className="flex items-center space-x-1 text-sm font-medium text-dark-200 hover:text-white transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4 text-brand-400" />
                  <span>Dashboard</span>
                </Link>
                
                {/* User Info & Logout */}
                <div className="flex items-center space-x-3 bg-dark-900/60 py-1.5 px-3 rounded-full border border-dark-800">
                  {user?.avatar?.url ? (
                    <img
                      src={`http://localhost:5000${user.avatar.url}`}
                      alt={user.fullName}
                      className="h-6 w-6 rounded-full object-cover border border-brand-500/40"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-brand-600/30 flex items-center justify-center border border-brand-500/40 text-brand-300 text-xs font-bold">
                      {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-dark-200 truncate max-w-[100px]">
                    {user?.fullName}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 text-xs font-semibold bg-dark-900/40 hover:bg-red-500/10 border border-dark-800 hover:border-red-500/30 py-1.5 px-3 rounded-lg text-dark-300 hover:text-red-400 transition-all cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 border-l border-dark-800 pl-6">
                <Link
                  to={ROUTES.LOGIN}
                  className="text-sm font-semibold text-dark-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="rounded-lg bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 py-2 px-4 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all hover:-translate-y-0.5"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-dark-400 hover:bg-dark-900 hover:text-white focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-b border-dark-800 animate-fadeIn">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-dark-300 hover:bg-dark-900 hover:text-white"
            >
              Features
            </a>
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-dark-300 hover:bg-dark-900 hover:text-white"
            >
              About
            </a>

            {isAuthenticated ? (
              <div className="border-t border-dark-800 mt-4 pt-4 space-y-2">
                <div className="flex items-center px-3 py-2 space-x-3">
                  {user?.avatar?.url ? (
                    <img
                      src={`http://localhost:5000${user.avatar.url}`}
                      alt={user.fullName}
                      className="h-8 w-8 rounded-full object-cover border border-brand-500/40"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-brand-600/30 flex items-center justify-center border border-brand-500/40 text-brand-300 text-sm font-bold">
                      {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-white">{user?.fullName}</div>
                    <div className="text-xs text-dark-400">{user?.email}</div>
                  </div>
                </div>
                <Link
                  to={ROUTES.DASHBOARD}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-dark-300 hover:bg-dark-900 hover:text-white"
                >
                  <LayoutDashboard className="h-5 w-5 text-brand-400" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-dark-800 mt-4 pt-4 space-y-2">
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-dark-300 hover:bg-dark-900 hover:text-white text-center"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md bg-gradient-to-r from-brand-600 to-purple-600 px-3 py-2 text-base font-medium text-white text-center shadow-lg"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
