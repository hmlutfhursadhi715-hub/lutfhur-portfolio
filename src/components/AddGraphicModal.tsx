import React, { useState, useRef } from 'react';
import { X, Image as ImageIcon, Plus, Link as LinkIcon, Upload, Check, AlertCircle, Sparkles } from 'lucide-react';
import { GraphicProject } from '../types';

interface AddGraphicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGraphic: (graphic: GraphicProject, imageSrc: string) => void;
  targetSlotNumber?: number;
}

export const AddGraphicModal: React.FC<AddGraphicModalProps> = ({
  isOpen,
  onClose,
  onAddGraphic,
  targetSlotNumber,
}) => {
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Commercial Product Poster');
  const [description, setDescription] = useState<string>('');
  const [tools, setTools] = useState<string>('Photoshop, Illustrator');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        setError('অনুগ্রহ করে একটি সঠিক ছবির ফাইল (JPG, PNG, WebP) নির্বাচন করুন');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
          if (!title) {
            setTitle(file.name.replace(/\.[^/.]+$/, ''));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (val: string) => {
    setImageUrl(val);
    if (val.trim()) {
      setImagePreview(val.trim());
      setError('');
    } else {
      setImagePreview('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImage = tab === 'upload' ? imagePreview : imageUrl.trim();

    if (!finalImage) {
      setError('অনুগ্রহ করে একটি ছবি আপলোড করুন অথবা ছবির লিংক দিন!');
      return;
    }

    const slotNum = targetSlotNumber || Date.now();
    const newGraphic: GraphicProject = {
      id: `graphic-custom-${Date.now()}`,
      filename: `graphic_custom_${slotNum}.jpg`,
      title: title.trim() || `Graphic Artwork #${slotNum}`,
      category: category.trim() || 'Visual Artwork',
      description:
        description.trim() ||
        'Creative graphic design artwork focusing on aesthetic composition, typography, and visual balance.',
      tools: tools
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onAddGraphic(newGraphic, finalImage);
    setImagePreview('');
    setImageUrl('');
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <ImageIcon className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-white flex items-center gap-2">
                <span>নতুন গ্রাফিক্স আপলোড ও যোগ করুন</span>
                {targetSlotNumber && (
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500 text-neutral-950">
                    Slot #{targetSlotNumber}
                  </span>
                )}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                ছবি সরাসরি ডিভাইস থেকে আপলোড করুন বা লিংক দিন
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

        {/* Tab switch: File Upload vs Image Link */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-6 pt-3 bg-neutral-50/50 dark:bg-neutral-900/50">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`flex items-center gap-2 pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              tab === 'upload'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>ছবি ফাইল আপলোড</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('url')}
            className={`flex items-center gap-2 pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              tab === 'url'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>ছবির লিংক (Image URL)</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {tab === 'upload' ? (
            /* Upload Drop Area */
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                ছবি নির্বাচন করুন (Select Image File) <span className="text-red-500">*</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-amber-500/50 hover:border-amber-500 bg-amber-500/5 hover:bg-amber-500/10 rounded-2xl p-6 text-center transition-all group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-amber-500" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                  এখানে ক্লিক করে ছবি নির্বাচন করুন
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  JPG, PNG, WebP (ব্যানার, পোস্টার, থাম্বনেইল)
                </p>
              </div>
            </div>
          ) : (
            /* URL Input */
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                ছবির ওয়েব লিংক (Image URL) <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... অথবা আপনার ছবির পাবলিক লিংক"
                value={imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}

          {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{error}</span>
            </p>
          )}

          {/* Live Preview */}
          {imagePreview && (
            <div className="rounded-xl overflow-hidden border border-amber-500/40 bg-black aspect-[4/3] relative shadow-inner">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-emerald-600/90 text-white text-[11px] font-semibold flex items-center gap-1 shadow">
                <Check className="w-3 h-3" />
                <span>ছবির প্রিভিউ তৈরি!</span>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              গ্রাফিক্সের নাম বা শিরোনাম (Title)
            </label>
            <input
              type="text"
              placeholder="যেমন: Minimalist Brand Poster / New Product Launch"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Category & Tools */}
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
                <option value="Commercial Product Poster">Commercial Product Poster</option>
                <option value="Social Media Banner">Social Media Banner</option>
                <option value="YouTube Thumbnail Design">YouTube Thumbnail Design</option>
                <option value="Event Branding & Poster">Event Branding & Poster</option>
                <option value="Typography & Vector Art">Typography & Vector Art</option>
                <option value="Creative Artwork">Creative Artwork</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                টুলস (Tools used)
              </label>
              <input
                type="text"
                placeholder="Photoshop, Illustrator"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
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
              placeholder="এই ডিজাইনের উদ্দেশ্য ও বিশেষত্ব সংক্ষেপে লিখুন..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          {/* Tip */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
            💡 <strong>সহজ টিপস:</strong> আপনি চাইলে সরাসরি কোনো ছবির লিংক বা ছবির ফাইল আমাকে চ্যাটে পাঠিয়ে দিতে পারেন, আমি কোডের মধ্যে স্থায়ীভাবে যোগ করে দেব!
          </div>

          {/* Buttons */}
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
              <span>গ্রাফিক্স যুক্ত করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
