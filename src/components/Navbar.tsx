import React from 'react';
import { Sun, Moon, Sparkles, Video, FolderUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { useImages } from '../context/ImageContext';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  const { setIsUploadModalOpen, customImages } = useImages();
  const customCount = Object.keys(customImages).length;
  return (
    <header
      id="navbar"
      className="sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300 border-b bg-white/80 dark:bg-neutral-950/80 border-neutral-200 dark:border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Name / Brand */}
        <a
          href="#"
          id="nav-brand"
          className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-950 shadow-sm group-hover:scale-105 transition-transform duration-200">
            <Video className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-base sm:text-xl tracking-tight text-neutral-900 dark:text-white leading-tight">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              Video Editor & Storyteller
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <a
            href="#featured"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Featured
          </a>
          <a
            href="#videos"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Video Edits
          </a>
          <a
            href="#graphics"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Graphic Work
          </a>
          <a
            href="#about"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            About Me
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right side: Image Manager, Theme Toggle & Quick CTA */}
        <div className="flex items-center gap-2.5">
          <button
            id="nav-image-manager-btn"
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            aria-label="Manage Original Images"
            title="আপনার আসল ছবিগুলো যুক্ত করুন"
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <FolderUp className="w-4 h-4" />
            <span className="hidden sm:inline">আসল ছবি আপলোড</span>
            {customCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center">
                {customCount}
              </span>
            )}
          </button>

          <button
            id="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700" />
            )}
          </button>

          <a
            href="#contact"
            id="nav-contact-cta"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-500" />
            <span>Hire Me</span>
          </a>
        </div>
      </div>
    </header>
  );
};
