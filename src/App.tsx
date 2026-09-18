import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroFeatured } from './components/HeroFeatured';
import { VideoGrid } from './components/VideoGrid';
import { GraphicSection } from './components/GraphicSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ImageProvider } from './context/ImageContext';
import { UploadOriginalModal } from './components/UploadOriginalModal';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
    }
    // Dark mode is default as explicitly required
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ImageProvider>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 font-sans selection:bg-amber-500 selection:text-black">
        {/* Top Navigation Bar with Minimalist Brand & Theme Switcher */}
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

        <main id="main-content" className="flex flex-col">
          {/* B. Hero Section: Featured/Best Video (16:9) & Short Greeting with profile.jpg */}
          <HeroFeatured />

          {/* C. Video Portfolio Grid: 4 Selected Works with Responsive YouTube Wrappers */}
          <VideoGrid />

          {/* D. Graphic Work Section: 6 Poster Designs with exact graphic1.jpg - graphic6.jpg & Lightbox */}
          <GraphicSection />

          {/* E. Detailed About Me (Bio) Section: Dedicated Editor Mindset, Daily Practice, Skills */}
          <AboutSection />

          {/* F. Get in Touch Section: Direct Email, WhatsApp, Action Buttons & Quick Brief */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Upload Original Images Modal */}
        <UploadOriginalModal />
      </div>
    </ImageProvider>
  );
}
