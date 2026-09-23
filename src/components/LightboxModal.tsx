import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Tag } from 'lucide-react';
import { GraphicProject } from '../types';
import { useImages } from '../context/ImageContext';

interface LightboxModalProps {
  isOpen: boolean;
  project: GraphicProject | null;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  project,
  currentIndex,
  total,
  onClose,
  onNext,
  onPrev,
}) => {
  const { getImageSrc } = useImages();
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !project) return null;

  return (
    <div
      id="lightbox-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Image Preview Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-900/80 text-neutral-300 border border-neutral-700">
          {currentIndex + 1} / {total}
        </span>
        <button
          id="lightbox-close-button"
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-neutral-500 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
          aria-label="Close image modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        id="lightbox-prev-button"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-neutral-500 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        id="lightbox-next-button"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-neutral-500 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Modal Content Container */}
      <div
        className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large Image Preview (Uses exact local filename or uploaded original) */}
        <div className="relative w-full flex-1 max-h-[72vh] flex items-center justify-center bg-black/60 p-2 sm:p-4 overflow-hidden">
          <img
            id="lightbox-active-image"
            src={project.imageUrl || getImageSrc(project.id, project.filename)}
            alt={project.title}
            className="max-h-[68vh] max-w-full object-contain rounded-lg shadow-lg select-none"
          />
        </div>

        {/* Modal Footer Caption */}
        <div className="w-full p-4 sm:p-5 bg-neutral-900/90 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {project.category}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                {project.filename}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mt-0.5">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="text-[11px] font-medium px-2 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
