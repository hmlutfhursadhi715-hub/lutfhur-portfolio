import React from 'react';
import { Play, Film, ExternalLink } from 'lucide-react';
import { PORTFOLIO_VIDEOS } from '../data';
import { VideoProject } from '../types';

export const VideoGrid: React.FC = () => {
  return (
    <section id="videos" className="py-12 sm:py-16 border-t border-neutral-200 dark:border-neutral-800">
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

          <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Showing {PORTFOLIO_VIDEOS.length} Video Projects
          </div>
        </div>

        {/* Video Responsive Grid (2 columns on sm/md, 2 or 3 columns on large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PORTFOLIO_VIDEOS.map((video: VideoProject, index: number) => {
            const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`;
            const directUrl = video.isShort
              ? `https://youtube.com/shorts/${video.youtubeId}`
              : `https://youtu.be/${video.youtubeId}`;

            return (
              <article
                key={video.id}
                id={`video-card-${index + 1}`}
                className="group relative rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-all duration-300 flex flex-col"
              >
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
                  <div className="absolute top-3 left-3 pointer-events-none z-10">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-neutral-900/85 backdrop-blur-md text-white border border-neutral-700/50 shadow">
                      {video.category}
                    </span>
                  </div>
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
