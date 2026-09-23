import React from 'react';
import { UserCheck, Flame, Compass, Headphones, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, SKILL_TAGS, SOFTWARE_TOOLS } from '../data';
import { useImages } from '../context/ImageContext';

export const AboutSection: React.FC = () => {
  const { getImageSrc } = useImages();
  const profileSrc = getImageSrc('profile', 'profile.jpg');
  return (
    <section id="about" className="py-12 sm:py-16 border-t border-neutral-200 dark:border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Avatar Card & Philosophy */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 mb-4 border border-amber-500/20">
              <UserCheck className="w-3.5 h-3.5" />
              <span>About The Editor</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white tracking-tight text-center sm:text-left">
              Visual Storytelling with Pure Dedication
            </h2>

            {/* Profile Avatar Card */}
            <div className="mt-6 w-full p-6 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-sm shadow-sm flex flex-col sm:flex-row items-center gap-5">
              <div className="relative w-24 h-24 flex-shrink-0">
                {/* Outer rotating halo */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-full avatar-stroke-glow pointer-events-none opacity-80"
                />

                {/* Base border stroke */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border-2 border-neutral-200 dark:border-neutral-700/80 pointer-events-none"
                />

                {/* Rotating light beam around the stroke */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full avatar-stroke-beam pointer-events-none"
                />

                {/* Inner image */}
                <div className="absolute inset-[3px] rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-inner z-10">
                  <img
                    src={profileSrc}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center sm:text-left">
                <div className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-yellow-400/25 to-amber-500/15 blur-lg opacity-70 name-glow-pulse pointer-events-none"
                  />
                  <h3 className="relative font-display font-black text-xl sm:text-2xl tracking-tight name-shimmer-text">
                    {PERSONAL_INFO.name}
                  </h3>
                </div>
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-0.5">
                  {PERSONAL_INFO.role}
                </p>
                <div className="mt-3 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Actively Practicing & Creating</span>
                </div>
              </div>
            </div>

            {/* Editing Focus Highlights */}
            <div className="mt-6 grid grid-cols-2 gap-3 w-full">
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40">
                <Flame className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Pacing & Flow</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Holding viewer attention with dynamic cadence.</p>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40">
                <Headphones className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Sound Design</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Punchy whooshes, risers, and impact SFX.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Honest Bio Text & Tool Stack */}
          <div className="lg:col-span-7 flex flex-col">
            {/* The User's Exact Honest Bio */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm relative">
              <div className="absolute top-6 right-6 text-amber-500/20 font-serif text-6xl leading-none select-none">
                “
              </div>

              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                My Philosophy & Dedication
              </span>

              <p className="mt-3 text-base sm:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                "{PERSONAL_INFO.bio}"
              </p>

              <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/90 flex items-center justify-between">
                <div>
                  <span className="block text-base font-display font-black tracking-wide text-neutral-900 dark:text-white">
                    {PERSONAL_INFO.name}
                  </span>
                  <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                    Video Editing & Graphic Design
                  </span>
                </div>
                <div className="text-xs font-mono text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Daily Learner • Relentless Worker
                </div>
              </div>
            </div>

            {/* Software Tools */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                Creative Software & Workflow
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SOFTWARE_TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 flex items-center gap-3 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {tool.name}
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                        {tool.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Pills */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                Specialized Craft & Disciplines
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILL_TAGS.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
                  >
                    <CheckCircle2 className="w-3 h-3 text-amber-500" />
                    <span>{skill.name}</span>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500">({skill.level})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
