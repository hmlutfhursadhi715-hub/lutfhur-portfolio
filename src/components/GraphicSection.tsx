import React, { useState } from 'react';
import { Palette, Maximize2, ExternalLink, UploadCloud, CheckCircle2, Camera } from 'lucide-react';
import { GRAPHIC_PROJECTS } from '../data';
import { GraphicProject } from '../types';
import { LightboxModal } from './LightboxModal';
import { useImages } from '../context/ImageContext';

export const GraphicSection: React.FC = () => {
  const { getImageSrc, setIsUploadModalOpen, customImages, updateImage } = useImages();
  const [selectedProject, setSelectedProject] = useState<GraphicProject | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openLightbox = (project: GraphicProject, index: number) => {
    setSelectedProject(project);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % GRAPHIC_PROJECTS.length;
    setCurrentIndex(nextIdx);
    setSelectedProject(GRAPHIC_PROJECTS[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + GRAPHIC_PROJECTS.length) % GRAPHIC_PROJECTS.length;
    setCurrentIndex(prevIdx);
    setSelectedProject(GRAPHIC_PROJECTS[prevIdx]);
  };

  return (
    <section id="graphics" className="py-12 sm:py-16 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 mb-3 border border-amber-500/20">
              <Palette className="w-3.5 h-3.5" />
              <span>Graphic & Poster Designs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-neutral-900 dark:text-white tracking-tight">
              Visual & Commercial Artwork
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Thumbnails, commercial ads, social promos, and typography posters designed with bold aesthetics and visual balance. Click any card to inspect in full resolution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              type="button"
              id="btn-open-image-manager"
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-black shadow-md transition-all active:scale-95"
            >
              <UploadCloud className="w-4 h-4" />
              <span>আসল ছবিগুলো আপলোড করুন</span>
              {Object.keys(customImages).length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black text-amber-400">
                  {Object.keys(customImages).length}/7 সেট করা
                </span>
              )}
            </button>

            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              6 Poster Designs • Interactive Lightbox
            </span>
          </div>
        </div>

        {/* 6 Graphic Cards Grid (Exact filenames graphic1.jpg to graphic6.jpg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GRAPHIC_PROJECTS.map((project: GraphicProject, index: number) => {
            const activeSrc = getImageSrc(project.id, project.filename);
            const isCustom =
              !!customImages[project.id] ||
              !!customImages[project.filename] ||
              !!customImages[project.id.replace('-', '')] ||
              !!customImages[`graphic${index + 1}`];

            return (
              <div
                key={project.id}
                id={`graphic-card-${index + 1}`}
                onClick={() => openLightbox(project, index)}
                className="group cursor-pointer rounded-2xl border border-neutral-200 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/50 dark:hover:border-amber-500/40 transition-all duration-300 flex flex-col relative"
              >
                {/* Image Container with Exact Filename or Uploaded Original */}
                <div className="relative w-full aspect-[4/3] bg-neutral-950 overflow-hidden">
                  <img
                    id={`graphic-img-${index + 1}`}
                    src={activeSrc}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Hover Overlay with Lightbox Indicator */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-neutral-900/90 text-neutral-950 dark:text-white text-xs font-semibold shadow-lg backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-amber-500" />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>

                  {/* Top Category Tag */}
                  <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide bg-neutral-900/80 backdrop-blur-md text-white border border-neutral-700/60 shadow">
                      {project.category}
                    </span>
                    {isCustom && (
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wide bg-emerald-500 text-white shadow flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>মূল ছবি সেট</span>
                      </span>
                    )}
                  </div>

                  {/* Direct Change/Upload button on card */}
                  <div className="absolute top-3 right-3 z-10">
                    <label
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-neutral-900/85 hover:bg-black text-amber-400 border border-neutral-700/70 shadow-md backdrop-blur-sm flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                      title="এই কার্ডের আসল ছবি বেছে নিন"
                    >
                      <Camera className="w-3 h-3" />
                      <span>{isCustom ? 'পরিবর্তন' : 'ছবি আপলোড'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            updateImage(project.id, e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        {project.filename}
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-display text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vanilla Lightbox Modal Component */}
        <LightboxModal
          isOpen={!!selectedProject}
          project={selectedProject}
          currentIndex={currentIndex}
          total={GRAPHIC_PROJECTS.length}
          onClose={closeLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </section>
  );
};
