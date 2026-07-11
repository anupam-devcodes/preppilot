import React from 'react';
import { GitBranch, ExternalLink } from 'lucide-react';
import BrandLogo from '../common/BrandLogo';

/**
 * Reusable premium personal/project footer.
 */
const Footer = () => {
  return (
    <footer className="w-full border-t border-dark-900 bg-dark-950/80 relative z-10 text-dark-400">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Main Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-dark-900/60">
          
          {/* Left Column: Brand & Description */}
          <div className="space-y-4">
            <BrandLogo size="md" />
            <p className="text-xs sm:text-sm text-dark-400 max-w-md leading-relaxed">
              An AI interview preparation platform built to make resume analysis, skill-gap detection, and interview practice more focused.
            </p>
          </div>

          {/* Right Column: Ownership & Tasteful Links */}
          <div className="flex flex-col md:items-end justify-center space-y-3">
            <p className="text-xs sm:text-sm font-medium text-dark-200">
              Built and maintained by <span className="text-white font-semibold">Anupam Choubey</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/anupam-devcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-semibold bg-dark-900/60 hover:bg-dark-900 border border-dark-800 hover:border-brand-500/40 text-dark-300 hover:text-white px-3.5 py-1.5 rounded-lg transition-all"
              >
                <GitBranch className="h-3.5 w-3.5" />
                <span>GitHub Profile</span>
              </a>
              <a
                href="https://github.com/anupam-devcodes/preppilot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-semibold bg-dark-900/60 hover:bg-dark-900 border border-dark-800 hover:border-brand-500/40 text-dark-300 hover:text-white px-3.5 py-1.5 rounded-lg transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer Section */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs">
          <p className="text-dark-500">
            © 2026 Anupam Choubey · PrepPilot
          </p>
          <p className="text-dark-600 italic">
            Made to be useful.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
