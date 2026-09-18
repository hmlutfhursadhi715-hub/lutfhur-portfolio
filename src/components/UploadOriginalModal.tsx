import React, { useState, useRef } from 'react';
import { X, UploadCloud, CheckCircle2, Image as ImageIcon, RotateCcw, Sparkles, FolderUp, HelpCircle } from 'lucide-react';
import { useImages } from '../context/ImageContext';
import { GRAPHIC_PROJECTS } from '../data';

interface SlotInfo {
  id: string;
  name: string;
  expectedFile: string;
  originalNameHint: string;
  defaultSrc: string;
}

const SLOTS: SlotInfo[] = [
  {
    id: 'profile',
    name: 'Profile Picture / Avatar',
    expectedFile: 'profile.jpg',
    originalNameHint: 'WhatsApp Image 2026-08-16... / Your portrait photo',
    defaultSrc: 'profile.jpg',
  },
  {
    id: 'graphic1',
    name: 'Graphic 1 — Chanel Perfume',
    expectedFile: 'graphic1.jpg',
    originalNameHint: '3746 Lutfhur .png / Bleu De Chanel Poster',
    defaultSrc: 'graphic1.jpg',
  },
  {
    id: 'graphic2',
    name: 'Graphic 2 — Noise Buds N1 Pro',
    expectedFile: 'graphic2.jpg',
    originalNameHint: 'airbuds [Recovered] - Copy.png',
    defaultSrc: 'graphic2.jpg',
  },
  {
    id: 'graphic3',
    name: 'Graphic 3 — Ice Cream Promo',
    expectedFile: 'graphic3.jpg',
    originalNameHint: 'NEW Facebook post.png / Mint & Chocolate Ice Cream',
    defaultSrc: 'graphic3.jpg',
  },
  {
    id: 'graphic4',
    name: 'Graphic 4 — Dawah Workshop Standee',
    expectedFile: 'graphic4.jpg',
    originalNameHint: 'poster 1.png / Workshop Banner',
    defaultSrc: 'graphic4.jpg',
  },
  {
    id: 'graphic5',
    name: 'Graphic 5 — $10,000 AI Thumbnail',
    expectedFile: 'graphic5.jpg',
    originalNameHint: 'thumbnail-1 .png / High CTR Thumbnail',
    defaultSrc: 'graphic5.jpg',
  },
  {
    id: 'graphic6',
    name: 'Graphic 6 — Islamic Calligraphy Poster',
    expectedFile: 'graphic6.jpg',
    originalNameHint: 'যেদিন হিসাব কায়েম হবে-Recovered-Recovered.png',
    defaultSrc: 'graphic6.jpg',
  },
];

export const UploadOriginalModal: React.FC = () => {
  const {
    isUploadModalOpen,
    setIsUploadModalOpen,
    customImages,
    updateImage,
    bulkAutoMatch,
    resetImage,
    resetAllImages,
    getImageSrc,
  } = useImages();

  const [dragActive, setDragActive] = useState(false);
  const [matchResult, setMatchResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadModalOpen) return null;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const result = await bulkAutoMatch(files);
    if (result.matched > 0) {
      setMatchResult(`সফলভাবে ${result.matched}টি মূল ছবি যুক্ত ও সেট হয়েছে!`);
    } else {
      setMatchResult('কোনো পরিচিত ফাইলের সাথে মিল পাওয়া যায়নি। নিচের স্লটগুলোর যেকোনোটিতে সরাসরি সিলেক্ট করে দিন।');
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  const handleSingleSlotUpload = (id: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        await updateImage(id, target.files[0]);
        setMatchResult(`${id} এর জন্য ছবি আপডেট করা হয়েছে!`);
      }
    };
    input.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={() => setIsUploadModalOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-1">
              <FolderUp className="w-3.5 h-3.5" />
              <span>আপনার আসল ছবি ম্যানেজার (Original Images)</span>
            </div>
            <h3 className="text-xl font-bold font-display text-neutral-900 dark:text-white">
              আসল গ্রাফিক্স ও প্রোফাইল ছবি যুক্ত করুন
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              আপনার কম্পিউটার থেকে ৭টি আসল ফাইল এখানে ড্রপ করুন অথবা যেকোনো স্লটের জন্য আলাদা ছবি বেছে নিন।
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsUploadModalOpen(false)}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Multi-file Drag and Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-amber-500 bg-amber-500/10'
                : 'border-neutral-300 dark:border-neutral-700 hover:border-amber-500/50 bg-neutral-50 dark:bg-neutral-950/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
              সবগুলো আসল ছবি একসাথে এখানে ড্র্যাগ অ্যান্ড ড্রপ করুন
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              অথবা আপনার কম্পিউটার থেকে ব্রাউজ করতে এখানে ক্লিক করুন (PNG, JPG, JPEG)
            </p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-[11px] font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              💡 ফাইল নামের উপর ভিত্তি করে স্বয়ংক্রিয়ভাবে সঠিক স্লটে মিলে যাবে
            </span>
          </div>

          {matchResult && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{matchResult}</span>
            </div>
          )}

          {/* Slots List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                ৭টি পিকচার স্লট ও বর্তমান স্ট্যাটাস
              </h4>
              {Object.keys(customImages).length > 0 && (
                <button
                  type="button"
                  onClick={resetAllImages}
                  className="text-xs text-rose-500 hover:text-rose-600 font-medium inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>সব রিসেট করুন</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SLOTS.map((slot) => {
                const isCustom =
                  !!customImages[slot.id] ||
                  !!customImages[slot.expectedFile] ||
                  !!customImages[slot.id.replace('graphic', 'graphic-')];
                const activeSrc = getImageSrc(slot.id, slot.defaultSrc);

                return (
                  <div
                    key={slot.id}
                    className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                      isCustom
                        ? 'border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-500/10'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-950 flex-shrink-0 border border-neutral-300 dark:border-neutral-700 relative">
                      <img
                        src={activeSrc}
                        alt={slot.name}
                        className="w-full h-full object-cover"
                      />
                      {isCustom && (
                        <span className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-tl p-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                          {slot.name}
                        </span>
                      </div>
                      <span className="block text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                        {slot.expectedFile}
                      </span>
                      <span className="block text-[10px] text-amber-600 dark:text-amber-400/80 truncate">
                        মূল ফাইল: {slot.originalNameHint}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSingleSlotUpload(slot.id)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                      >
                        {isCustom ? 'পরিবর্তন' : 'আপলোড'}
                      </button>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => resetImage(slot.id)}
                          className="px-2 py-0.5 text-[10px] text-neutral-400 hover:text-rose-500 text-center"
                        >
                          রিসেট
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cloud/AI Studio File Explorer Help Card */}
          <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 text-xs text-neutral-600 dark:text-neutral-300">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white mb-1.5">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>পরামর্শ: চিরস্থায়ীভাবে প্রজেক্টে যুক্ত করার নিয়ম</span>
            </div>
            <p className="leading-relaxed">
              আপনি চাইলে AI Studio-এর বামদিকের <strong>File Explorer</strong> থেকে সরাসরি <code className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white font-mono text-[11px]">public</code> ফোল্ডারে আপনার মূল ছবিগুলো <code className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white font-mono text-[11px]">profile.jpg</code>, <code className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white font-mono text-[11px]">graphic1.jpg</code> থেকে <code className="px-1 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white font-mono text-[11px]">graphic6.jpg</code> নামে ড্রপ করে দিতে পারেন।
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-between">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            ছবিগুলো আপনার ব্রাউজারের IndexedDB মেমোরিতে নিরাপদে সংরক্ষিত থাকে।
          </span>
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(false)}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-black shadow transition-colors"
          >
            সম্পন্ন
          </button>
        </div>
      </div>
    </div>
  );
};
