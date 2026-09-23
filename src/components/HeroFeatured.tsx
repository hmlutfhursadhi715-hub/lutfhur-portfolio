import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Mail, MessageCircle, ArrowDown, Camera, Edit3, Youtube } from 'lucide-react';
import { PERSONAL_INFO, FEATURED_VIDEO } from '../data';
import { useImages } from '../context/ImageContext';
import { EditFeaturedModal, FeaturedVideoData } from './EditFeaturedModal';

const FEATURED_STORAGE_KEY = 'custom_featured_video';

export const HeroFeatured: React.FC = () => {
  const { getImageSrc, setIsUploadModalOpen, updateImage } = useImages();
  const profileSrc = getImageSrc('profile', 'profile.jpg');

  const [featuredVideo, setFeaturedVideo] = useState<FeaturedVideoData>(FEATURED_VIDEO);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(FEATURED_STORAGE_KEY);
      if (saved) {
        setFeaturedVideo(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load custom featured video:', e);
    }
  }, []);

  const handleSaveFeatured = (data: FeaturedVideoData) => {
    setFeaturedVideo(data);
    try {
      localStorage.setItem(FEATURED_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save featured video:', e);
    }
  };

  const handleResetFeatured = () => {
    setFeaturedVideo(FEATURED_VIDEO);
    try {
      localStorage.removeItem(FEATURED_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset featured video:', e);
    }
  };

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
        {/* Top Feature Pill & Edit Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Featured Best Work / Trailer</span>
            </div>

            {/* Change Video Button */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 hover:bg-amber-500 text-amber-900 dark:text-amber-200 hover:text-neutral-950 border border-amber-500/30 transition-all shadow-sm hover:scale-105"
              title="এই ভিডিওটি পরিবর্তন করুন"
            >
              <Edit3 className="w-3 h-3" />
              <span>ভিডিও পরিবর্তন করুন</span>
            </button>
          </div>

          <span className="hidden sm:inline-flex text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {featuredVideo.tagline}
          </span>
        </div>

        {/* 1. FEATURED VIDEO CONTAINER (16:9 Aspect Ratio) with Traveling Gradient Stroke */}
        <div
          id="featured-video-container"
          className="gradient-stroke-card video-hover-zoom relative w-full rounded-2xl sm:rounded-3xl shadow-2xl shadow-neutral-900/10 dark:shadow-amber-950/20 group"
        >
          <div className="relative z-10 w-full rounded-[calc(1rem-2.5px)] sm:rounded-[calc(1.5rem-2.5px)] overflow-hidden bg-black aspect-video">
            <iframe
              id="featured-video-iframe"
              src={featuredVideo.embedUrl}
              title={featuredVideo.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="eager"
            />

            {/* Floating Edit Badge at top right */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-amber-500 text-white hover:text-neutral-950 text-xs font-bold backdrop-blur-md border border-neutral-700/60 shadow-lg opacity-80 group-hover:opacity-100 transition-all z-20"
              title="এখানে ক্লিক করে ভিডিওটি পরিবর্তন করুন"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>ভিডিও বদলান</span>
            </button>
          </div>
        </div>

        {/* 2. SHORT GREETING & PROFILE PICTURE (Right Below Featured Video) */}
        <div
          id="hero-greeting"
          className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-md shadow-sm transition-all"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            {/* Profile Picture with orbiting rotating light stroke */}
            <div className="relative flex-shrink-0 group w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-300 group-hover:scale-105">
              {/* Outer soft ambient glow that orbits the stroke */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-full avatar-stroke-glow pointer-events-none opacity-85"
              />

              {/* Base border stroke */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-2 border-neutral-200 dark:border-neutral-700/80 pointer-events-none"
              />

              {/* The bright light beam rotating in a circle around the stroke */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full avatar-stroke-beam pointer-events-none"
              />

              {/* Inner profile image container */}
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-inner z-10">
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
                className="absolute -bottom-1 -right-1 z-20 px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-emerald-600 dark:text-emerald-400"
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
                <span className="relative inline-block overflow-hidden py-1 px-1 rounded-lg">
                  {/* Soft subtle ambient aura */}
                  <span
                    aria-hidden="true"
                    className="absolute -inset-1 rounded-xl bg-amber-500/15 blur-lg name-glow-pulse pointer-events-none"
                  />
                  
                  {/* The name with gentle shimmer */}
                  <span className="relative font-display font-black tracking-tight name-shimmer-text">
                    {PERSONAL_INFO.name}
                  </span>

                  {/* Soft delicate light runner passing across */}
                  <span
                    aria-hidden="true"
                    className="light-runner-beam"
                  />
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

      {/* Edit Featured Video Modal */}
      <EditFeaturedModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentVideo={featuredVideo}
        defaultVideo={FEATURED_VIDEO}
        onSave={handleSaveFeatured}
        onReset={handleResetFeatured}
      />
    </section>
  );
};
