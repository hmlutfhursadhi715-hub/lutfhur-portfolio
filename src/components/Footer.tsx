import React from 'react';
import { ArrowUp, Heart, Film } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="border-t border-neutral-200 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-950/50 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center">
            <Film className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {PERSONAL_INFO.name}
            </span>
            . All visual and editorial rights reserved.
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Visual Storytelling • Daily Practice
          </span>
          <button
            id="btn-scroll-top"
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Scroll back to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
