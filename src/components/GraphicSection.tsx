import React, { useState, useEffect, useRef } from 'react';
import { Palette, Maximize2, ExternalLink, UploadCloud, CheckCircle2, Camera, Plus, Link as LinkIcon, Trash2, Image as ImageIcon } from 'lucide-react';
import { GRAPHIC_PROJECTS } from '../data';
import { GraphicProject } from '../types';
import { LightboxModal } from './LightboxModal';
import { useImages } from '../context/ImageContext';
import { AddGraphicModal } from './AddGraphicModal';

const GRAPHICS_STORAGE_KEY = 'portfolio_custom_graphics';

export const GraphicSection: React.FC = () => {
  const { getImageSrc, setIsUploadModalOpen, customImages, updateImage } = useImages();
  const [customGraphics, setCustomGraphics] = useState<GraphicProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<GraphicProject | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [targetSlotNum, setTargetSlotNum] = useState<number | undefined>(undefined);

  // Load custom graphics from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(GRAPHICS_STORAGE_KEY);
      if (saved) {
        setCustomGraphics(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load custom graphics:', e);
    }
  }, []);

  const allGraphics: GraphicProject[] = [...GRAPHIC_PROJECTS, ...customGraphics];

  const handleAddGraphic = (newGraphic: GraphicProject, imageSrc: string) => {
    // Attach imageUrl directly to graphic object for immediate URL rendering
    newGraphic.imageUrl = imageSrc;

    const updated = [...customGraphics, newGraphic];
    setCustomGraphics(updated);
    try {
      localStorage.setItem(GRAPHICS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save custom graphic:', e);
    }
  };

  const handleRemoveCustomGraphic = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customGraphics.filter((g) => g.id !== id);
    setCustomGraphics(updated);
    try {
      localStorage.setItem(GRAPHICS_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to remove custom graphic:', err);
    }
  };

  const openAddModal = (slotNumber?: number) => {
    setTargetSlotNum(slotNumber);
    setIsAddModalOpen(true);
  };

  const openLightbox = (project: GraphicProject, index: number) => {
    setSelectedProject(project);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allGraphics.length;
    setCurrentIndex(nextIdx);
    setSelectedProject(allGraphics[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allGraphics.length) % allGraphics.length;
    setCurrentIndex(prevIdx);
    setSelectedProject(allGraphics[prevIdx]);
  };

  // Helper to trigger fast direct file upload into a new slot
  const handleDirectSlotUpload = (slotNumber: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageSrc = event.target.result as string;
          const newGraphic: GraphicProject = {
            id: `graphic-custom-${Date.now()}`,
            filename: `graphic_custom_${slotNumber}.jpg`,
            title: file.name.replace(/\.[^/.]+$/, '') || `Artwork Slot #${slotNumber}`,
            category: 'Commercial Poster Design',
            description: 'Custom uploaded graphic artwork showcasing visual layout and creative typography.',
            tools: ['Photoshop', 'Illustrator'],
            imageUrl: imageSrc,
          };
          handleAddGraphic(newGraphic, imageSrc);
        }
      };
      reader.readAsDataURL(file);
    }
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

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openAddModal(allGraphics.length + 1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ নতুন গ্রাফিক্স যোগ করুন</span>
            </button>

            <button
              type="button"
              id="btn-open-image-manager"
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-white border border-neutral-300 dark:border-neutral-700 transition-all active:scale-95"
            >
              <UploadCloud className="w-4 h-4 text-amber-500" />
              <span>আসল ছবি ম্যানেজার</span>
            </button>

            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {allGraphics.length} Poster Designs
            </span>
          </div>
        </div>

        {/* Graphic Cards Grid with Multi-Color Gradient Beams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allGraphics.map((project: GraphicProject, index: number) => {
            const isCustomGraphic = project.id.startsWith('graphic-custom');
            const activeSrc = project.imageUrl || getImageSrc(project.id, project.filename);
            const isCustom =
              isCustomGraphic ||
              !!customImages[project.id] ||
              !!customImages[project.filename] ||
              !!customImages[project.id.replace('-', '')] ||
              !!customImages[`graphic${index + 1}`];

            return (
              <div
                key={project.id}
                id={`graphic-card-${index + 1}`}
                onClick={() => openLightbox(project, index)}
                className="gradient-stroke-card video-hover-zoom group cursor-pointer rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col relative"
              >
                <div className="relative z-10 w-full h-full rounded-[calc(1rem-2.5px)] sm:rounded-[calc(1.5rem-2.5px)] overflow-hidden bg-white dark:bg-neutral-900 flex flex-col justify-between">
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
                          <span>{isCustomGraphic ? 'নতুন গ্রাফিক্স' : 'মূল ছবি সেট'}</span>
                        </span>
                      )}
                    </div>

                    {/* Top Right Action: Delete if custom, or change image if default */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                      {isCustomGraphic ? (
                        <button
                          onClick={(e) => handleRemoveCustomGraphic(project.id, e)}
                          title="এই গ্রাফিক্সটি মুছে ফেলুন"
                          className="p-1.5 rounded-lg bg-neutral-900/85 hover:bg-red-600 text-white transition-colors shadow-md backdrop-blur-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
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
                      )}
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
              </div>
            );
          })}

          {/* DEDICATED GRAPHIC UPLOAD SLOT 1 (Slot #7) */}
          <div
            id="new-graphic-slot-1"
            className="gradient-stroke-card video-hover-zoom group cursor-pointer rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col relative"
          >
            <div className="relative z-10 w-full h-full rounded-[calc(1rem-2.5px)] sm:rounded-[calc(1.5rem-2.5px)] overflow-hidden bg-white/95 dark:bg-neutral-900/95 p-6 sm:p-7 flex flex-col justify-between items-center text-center border border-amber-500/30">
              {/* Top Indicator Badge */}
              <div className="w-full flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-amber-500 text-neutral-950 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-neutral-950 animate-ping" />
                  <span>🎯 গ্রাফিক্স আপলোড স্থান #{allGraphics.length + 1}</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Available Slot</span>
              </div>

              {/* Glowing Center Icon */}
              <div
                onClick={() => openAddModal(allGraphics.length + 1)}
                className="relative my-3 cursor-pointer group-hover:scale-105 transition-transform"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/15 border-2 border-dashed border-amber-500/60 flex items-center justify-center text-amber-500 shadow-md">
                  <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-black shadow-md border-2 border-white dark:border-neutral-900">
                  <Plus className="w-4 h-4" />
                </div>
              </div>

              {/* Heading & Subtext */}
              <div onClick={() => openAddModal(allGraphics.length + 1)} className="cursor-pointer">
                <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  নতুন গ্রাফিক্স আপলোড করুন
                </h3>
                <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
                  ডিভাইস থেকে সরাসরি ছবি আপলোড করুন অথবা কোনো ছবির ওয়েব লিংক দিয়ে দিন
                </p>
              </div>

              {/* Action Buttons: File Upload + Image URL */}
              <div className="mt-5 w-full pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center gap-2">
                <label className="flex-1 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold transition-all shadow-sm hover:scale-[1.02] cursor-pointer">
                  <Camera className="w-3.5 h-3.5" />
                  <span>+ ছবি আপলোড</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleDirectSlotUpload(allGraphics.length + 1, e)}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => openAddModal(allGraphics.length + 1)}
                  className="flex-1 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold border border-neutral-300 dark:border-neutral-700 transition-all hover:scale-[1.02]"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>+ ছবির লিংক</span>
                </button>
              </div>
            </div>
          </div>

          {/* DEDICATED GRAPHIC UPLOAD SLOT 2 (Slot #8) */}
          <div
            id="new-graphic-slot-2"
            className="gradient-stroke-card video-hover-zoom group cursor-pointer rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col relative"
          >
            <div className="relative z-10 w-full h-full rounded-[calc(1rem-2.5px)] sm:rounded-[calc(1.5rem-2.5px)] overflow-hidden bg-white/95 dark:bg-neutral-900/95 p-6 sm:p-7 flex flex-col justify-between items-center text-center border border-amber-500/30">
              {/* Top Indicator Badge */}
              <div className="w-full flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide bg-amber-500 text-neutral-950 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-neutral-950 animate-ping" />
                  <span>🎯 গ্রাফিক্স আপলোড স্থান #{allGraphics.length + 2}</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Available Slot</span>
              </div>

              {/* Glowing Center Icon */}
              <div
                onClick={() => openAddModal(allGraphics.length + 2)}
                className="relative my-3 cursor-pointer group-hover:scale-105 transition-transform"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/15 border-2 border-dashed border-amber-500/60 flex items-center justify-center text-amber-500 shadow-md">
                  <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-black shadow-md border-2 border-white dark:border-neutral-900">
                  <Plus className="w-4 h-4" />
                </div>
              </div>

              {/* Heading & Subtext */}
              <div onClick={() => openAddModal(allGraphics.length + 2)} className="cursor-pointer">
                <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  আরেকটি ডিজাইন যোগ করুন
                </h3>
                <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
                  সোশ্যাল মিডিয়া পোস্টার, থাম্বনেইল বা পণ্যের ব্যানার ছবি এখানে যোগ করুন
                </p>
              </div>

              {/* Action Buttons: File Upload + Image URL */}
              <div className="mt-5 w-full pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center gap-2">
                <label className="flex-1 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold transition-all shadow-sm hover:scale-[1.02] cursor-pointer">
                  <Camera className="w-3.5 h-3.5" />
                  <span>+ ছবি আপলোড</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleDirectSlotUpload(allGraphics.length + 2, e)}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => openAddModal(allGraphics.length + 2)}
                  className="flex-1 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold border border-neutral-300 dark:border-neutral-700 transition-all hover:scale-[1.02]"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>+ ছবির লিংক</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Modal Component */}
        <LightboxModal
          isOpen={!!selectedProject}
          project={selectedProject}
          currentIndex={currentIndex}
          total={allGraphics.length}
          onClose={closeLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
        />

        {/* Add Graphic Modal (Upload & URL) */}
        <AddGraphicModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddGraphic={handleAddGraphic}
          targetSlotNumber={targetSlotNum}
        />
      </div>
    </section>
  );
};

