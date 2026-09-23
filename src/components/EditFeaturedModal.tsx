import React, { useState, useEffect } from 'react';
import { X, Youtube, Check, AlertCircle, Sparkles, RotateCcw } from 'lucide-react';
import { parseYouTubeUrl } from '../utils/youtube';

export interface FeaturedVideoData {
  title: string;
  youtubeId: string;
  embedUrl: string;
  tagline: string;
}

interface EditFeaturedModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVideo: FeaturedVideoData;
  defaultVideo: FeaturedVideoData;
  onSave: (data: FeaturedVideoData) => void;
  onReset: () => void;
}

export const EditFeaturedModal: React.FC<EditFeaturedModalProps> = ({
  isOpen,
  onClose,
  currentVideo,
  defaultVideo,
  onSave,
  onReset,
}) => {
  const [url, setUrl] = useState(`https://youtu.be/${currentVideo.youtubeId}`);
  const [title, setTitle] = useState(currentVideo.title);
  const [tagline, setTagline] = useState(currentVideo.tagline);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUrl(`https://youtu.be/${currentVideo.youtubeId}`);
      setTitle(currentVideo.title);
      setTagline(currentVideo.tagline);
      setError('');
    }
  }, [isOpen, currentVideo]);

  if (!isOpen) return null;

  const parsed = parseYouTubeUrl(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parsed) {
      setError('দয়া করে একটি সঠিক ইউটিউব ভিডিও লিংক বা আইডি দিন (যেমন: https://youtu.be/...)');
      return;
    }

    const updatedData: FeaturedVideoData = {
      title: title.trim() || 'Featured Best Work & Showreel',
      youtubeId: parsed.id,
      embedUrl: `https://www.youtube.com/embed/${parsed.id}?rel=0&modestbranding=1`,
      tagline: tagline.trim() || 'Precision Pacing • Seamless Sound Design • Visual Rhythm',
    };

    onSave(updatedData);
    onClose();
  };

  const handleReset = () => {
    onReset();
    setUrl(`https://youtu.be/${defaultVideo.youtubeId}`);
    setTitle(defaultVideo.title);
    setTagline(defaultVideo.tagline);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-100 dark:border-neutral-800 bg-amber-500/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Youtube className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white flex items-center gap-2">
                <span>প্রধান ভিডিও পরিবর্তন করুন</span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Featured Video
                </span>
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                ওয়েবসাইটের সবার উপরের বড় ভিডিওটি বদলান
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* YouTube Link Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              নতুন ইউটিউব ভিডিওর লিংক (YouTube Link) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="https://youtu.be/xxx অথবা https://www.youtube.com/watch?v=xxx"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {error && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Live Preview */}
          {parsed && (
            <div className="rounded-xl overflow-hidden border border-amber-500/30 bg-black aspect-video relative shadow-inner">
              <iframe
                src={`https://www.youtube.com/embed/${parsed.id}?rel=0&modestbranding=1`}
                title="Preview"
                className="w-full h-full border-0"
                allowFullScreen
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600/90 text-white text-[11px] font-semibold flex items-center gap-1 shadow">
                <Check className="w-3 h-3" />
                <span>নতুন ভিডিও প্রিভিউ</span>
              </div>
            </div>
          )}

          {/* Video Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              ভিডিওর শিরোনাম (Title)
            </label>
            <input
              type="text"
              placeholder="Featured Best Work & Showreel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              ট্যাগলাইন বা বিবরণ (Tagline)
            </label>
            <input
              type="text"
              placeholder="Precision Pacing • Seamless Sound Design • Visual Rhythm"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Helpful Chat Prompt tip */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
            💡 <strong>সবচেয়ে সহজ পদ্ধতি:</strong> আপনি চাইলে শুধু আপনার নতুন ভিডিওটির ইউটিউব লিংকটি আমাকে এখানে চ্যাটে পাঠিয়ে দিতে পারেন, আমি কোডের ভেতরে সরাসরি এই বড় ভিডিওটির জায়গায় আপনার নতুন ভিডিওটি সেট করে দেব!
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-500 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="ডিফল্ট ভিডিওতে রিসেট করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>রিসেট করুন</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]"
              >
                <Check className="w-4 h-4" />
                <span>ভিডিও পরিবর্তন করুন</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
