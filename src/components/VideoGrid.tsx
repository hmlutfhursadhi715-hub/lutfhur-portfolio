import React, { useState, useEffect } from 'react';
import { Play, Film, ExternalLink, Plus, Youtube, Trash2, Sparkles, Upload } from 'lucide-react';
import { PORTFOLIO_VIDEOS } from '../data';
import { VideoProject } from '../types';
import { AddVideoModal } from './AddVideoModal';

const STORAGE_KEY = 'portfolio_custom_videos';

export const VideoGrid: React.FC = () => {
  const [customVideos, setCustomVideos] = useState<VideoProject[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load custom videos from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCustomVideos(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load custom videos:', e);
    }
  }, []);

  const handleAddVideo = (newVideo: VideoProject) => {
    const updated = [...customVideos, newVideo];
    setCustomVideos(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save video:', e);
    }
  };

  const handleRemoveCustomVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customVideos.filter((v) => v.id !== id);
    setCustomVideos(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to remove video:', err);
    }
  };

  const allVideos = [...PORTFOLIO_VIDEOS, ...customVideos];

  return (
    <section id="videos" className="py-12 sm:py-16 border-t border-neutral-200 dark:border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 mb-3 border border-amber-500/20">
              <Film className="w-3.5 h-3.5" />
              <span>Video Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white tracking-tight">
              Selected Video Edits
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Exploring narrative cuts, high-retention short-form reels, rhythmic pacing, and modern audio mixing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {allVideos.length} টি ভিডিও প্রজেক্ট
            </span>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-neutral-950 transition-all shadow-sm hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ ভিডিও যোগ করুন</span>
            </button>
          </div>
        </div>

        {/* Video Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {allVideos.map((video: VideoProject, index: number) => {
            const isCustom = video.id.startsWith('vid-custom');
            const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`;
            const directUrl = video.isShort
              ? `https://youtube.com/shorts/${video.youtubeId}`
              : `https://youtu.be/${video.youtubeId}`;

            return (
              <article
                key={video.id}
                id={`video-card-${index + 1}`}
                className="gradient-stroke-card video-hover-zoom group relative rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-2xl transition-all flex flex-col cursor-pointer"
              >
                <div className="relative z-10 w-full h-full rounded-[calc(1rem-2.5px)] sm:rounded-[calc(1.5rem-2.5px)] overflow-hidden bg-white dark:bg-neutral-900 flex flex-col justify-between">
                  {/* 16:9 Responsive iFrame Wrapper */}
                  <div className="relative w-full aspect-video bg-black overflow-hidden">
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      className="absolute inset-0 w-full h-full border-0 transition-opacity duration-300"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />

                    {/* Top Category Badge */}
                    <div className="absolute top-3 left-3 pointer-events-none z-10 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-neutral-900/85 backdrop-blur-md text-white border border-neutral-700/50 shadow">
                        {video.category}
                      </span>
                      {isCustom && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-neutral-950 shadow">
                          Newly Added
                        </span>
                      )}
                    </div>

                    {/* Delete button for custom added videos */}
                    {isCustom && (
                      <button
                        onClick={(e) => handleRemoveCustomVideo(video.id, e)}
                        title="ভিডিওটি মুছে ফেলুন"
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-neutral-900/80 hover:bg-red-600 text-white transition-colors z-20 shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                          {video.title}
                        </h3>
                        <a
                          href={directUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex-shrink-0"
                          title="Open directly on YouTube"
                          aria-label={`Open ${video.title} on YouTube`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                        {video.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center gap-1.5">
                      {video.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* DEDICATED NEW VIDEO UPLOAD SLOT / PLACEHOLDER */}
          <div
            id="new-video-upload-slot"
            onClick={() => setIsAddModalOpen(true)}
            className="group relative rounded-2xl sm:rounded-3xl border-2 border-dashed border-amber-500/60 hover:border-amber-500 bg-amber-500/5 hover:bg-amber-500/10 transition-all p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[380px] shadow-sm hover:shadow-xl"
          >
            {/* Top Indicator Pin / Badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-500 text-neutral-950 shadow-md">
              <span className="w-2 h-2 rounded-full bg-neutral-950 animate-ping" />
              <span>🎯 ভিডিও আপলোড করার নির্ধারিত জায়গা</span>
            </div>

            {/* Glowing Icon center */}
            <div className="relative mb-5 mt-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-500/15 group-hover:bg-amber-500/25 border-2 border-amber-500/40 group-hover:border-amber-500 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg shadow-amber-500/10">
                <Youtube className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 drop-shadow" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-black shadow-md border-2 border-white dark:border-neutral-900 group-hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
            </div>

            {/* Title & Subtext */}
            <h3 className="text-xl sm:text-2xl font-display font-black text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              এখানে আপনার নতুন ইউটিউব ভিডিও যোগ করুন
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              এখানে ক্লিক করে আপনার ইউটিউব ভিডিওর লিংক (URL) পেস্ট করুন। সাথে সাথে আপনার নতুন ভিডিওটি এখানে লাইভ চালু হয়ে যাবে!
            </p>

            {/* Click to Upload Button */}
            <div className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-sm shadow-md shadow-amber-500/25 transition-all group-hover:scale-105">
              <Upload className="w-4 h-4" />
              <span>+ ভিডিও লিংক পেস্ট করুন</span>
            </div>

            {/* Direct Chat Alternative Note */}
            <div className="mt-4 text-[11px] text-neutral-500 dark:text-neutral-400">
              অথবা চ্যাটেও আপনার ইউটিউব ভিডিওর লিংক পাঠাতে পারেন
            </div>
          </div>
        </div>
      </div>

      {/* Add Video Modal */}
      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVideo={handleAddVideo}
      />
    </section>
  );
};

