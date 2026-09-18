import React from 'react';
import { Play, Sparkles, Mail, MessageCircle, ArrowDown, Camera } from 'lucide-react';
import { PERSONAL_INFO, FEATURED_VIDEO } from '../data';
import { useImages } from '../context/ImageContext';

export const HeroFeatured: React.FC = () => {
  const { getImageSrc, setIsUploadModalOpen, updateImage } = useImages();
  const profileSrc = getImageSrc('profile', 'profile.jpg');

  const handleProfileDirectUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateImage('profile', e.target.files[0]);
    }
  };
  return (
    <section id="featured" className="pt-6 pb-12 sm:pb-16 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-72 bg-gradient-to-b from-amber-500/10 via-rose-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Pill */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Featured Best Work / Trailer</span>
          </div>

          <span className="hidden sm:inline-flex text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {FEATURED_VIDEO.tagline}
          </span>
        </div>

        {/* 1. FEATURED VIDEO CONTAINER (16:9 Aspect Ratio) */}
        <div
          id="featured-video-container"
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800/80 bg-black shadow-2xl shadow-neutral-900/10 dark:shadow-amber-950/10 transition-all duration-300"
        >
          <div className="relative w-full aspect-video">
            <iframe
              id="featured-video-iframe"
              src={FEATURED_VIDEO.embedUrl}
              title={FEATURED_VIDEO.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="eager"
            />
          </div>
        </div>

        {/* 2. SHORT GREETING & PROFILE PICTURE (Right Below Featured Video) */}
        <div
          id="hero-greeting"
          className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md shadow-sm transition-all"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            {/* Profile Picture (using profile.jpg as requested) */}
            <div className="relative flex-shrink-0 group">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 shadow-md bg-neutral-200 dark:bg-neutral-800 transition-transform duration-300 group-hover:scale-105 relative">
                <img
                  id="profile-avatar"
                  src={profileSrc}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-center"
                />

                <label
                  htmlFor="profile-file-input"
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1 cursor-pointer"
                  title="আপনার আসল ছবি সিলেক্ট করুন"
                >
                  <Camera className="w-4 h-4" />
                  <span>ছবি পরিবর্তন</span>
                  <input
                    id="profile-file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileDirectUpload}
                  />
                </label>
              </div>

              {/* Status Badge */}
              <div
                className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-emerald-600 dark:text-emerald-400"
                title="Practicing and taking editing projects"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Editing Daily</span>
              </div>
            </div>

            {/* Greeting Text Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Welcome to my visual portfolio</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
                Hi, I'm{' '}
                <span className="font-display font-black tracking-tight text-amber-500 inline-block drop-shadow-sm">
                  {PERSONAL_INFO.name}
                </span>
              </h1>

              <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
                Dedicated video editor and visual designer passionate about rhythm, pacing, seamless transitions, and clean audio mixing. Explore my recent video projects and poster designs below.
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="#videos"
                  id="cta-watch-videos"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Video Edits</span>
                </a>

                <a
                  href="#graphics"
                  id="cta-graphics"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
                >
                  <span>Graphic Designs</span>
                </a>

                <a
                  href="#contact"
                  id="cta-get-in-touch"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get In Touch</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
