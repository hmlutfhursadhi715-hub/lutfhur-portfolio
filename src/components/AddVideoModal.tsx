import React, { useState } from 'react';
import { X, Youtube, Plus, Film, Check, AlertCircle } from 'lucide-react';
import { VideoProject } from '../types';
import { parseYouTubeUrl } from '../utils/youtube';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (video: VideoProject) => void;
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({ isOpen, onClose, onAddVideo }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cinematic / Narrative');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Pacing, Sound Design, Color Grade');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const parsed = parseYouTubeUrl(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parsed) {
      setError('দয়া করে একটি সঠিক ইউটিউব লিংক বা ভিডিও আইডি দিন (যেমন: https://youtu.be/...)');
      return;
    }

    const newVideo: VideoProject = {
      id: `vid-custom-${Date.now()}`,
      title: title.trim() || 'My New Video Edit',
      youtubeId: parsed.id,
      category: category.trim() || 'Cinematic',
      tags: tags
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean),
      description: description.trim() || 'Visual edit showcasing pacing, transitions, and audio-visual storytelling.',
      isShort: parsed.isShort,
    };

    onAddVideo(newVideo);
    setUrl('');
    setTitle('');
    setDescription('');
    setError('');
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
            <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center border border-red-500/20">
              <Youtube className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white flex items-center gap-2">
                <span>নতুন ইউটিউব ভিডিও আপলোড</span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  New Slot
                </span>
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                ইউটিউব ভিডিওর লিংক দিয়ে সরাসরি যুক্ত করুন
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
          {/* YouTube URL input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              ইউটিউব ভিডিওর লিংক (YouTube Video Link) <span className="text-red-500">*</span>
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

          {/* Live Preview if ID is recognized */}
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
                <span>ভিডিও প্রিভিউ রেডি!</span>
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
              placeholder="যেমন: Cinematic Travel Vlog / Dynamic Ad Edit"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                ক্যাটাগরি (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Cinematic / Narrative">Cinematic / Narrative</option>
                <option value="Shorts / Reels">Shorts / Reels</option>
                <option value="Creative Cut">Creative Cut</option>
                <option value="Commercial / Promo">Commercial / Promo</option>
                <option value="YouTube Showcase">YouTube Showcase</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                ট্যাগসমূহ (Tags - কমা দিয়ে লিখুন)
              </label>
              <input
                type="text"
                placeholder="Pacing, Sound FX, Color"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              সংক্ষিপ্ত বিবরণ (Description)
            </label>
            <textarea
              rows={2}
              placeholder="এই ভিডিও এডিটিং-এ আপনার বিশেষ কী কাজ ছিল তা সংক্ষেপে লিখুন..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          {/* Helpful Chat Prompt tip */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
            💡 <strong>সহজ টিপস:</strong> আপনি চাইলে শুধু আপনার ইউটিউব লিংকটি আমাকে এখানে চ্যাটেও পাঠিয়ে দিতে পারেন, আমি সরাসরি কোডের ভেতরে স্থায়ীভাবে ভিডিওটি যুক্ত করে দেব!
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-100 dark:border-neutral-800">
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
              <Plus className="w-4 h-4" />
              <span>ভিডিও যুক্ত করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
