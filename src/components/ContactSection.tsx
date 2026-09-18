import React, { useState } from 'react';
import { Mail, MessageCircle, Copy, Check, Send, Sparkles, Phone, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Short-Form Reel / TikTok',
    message: '',
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate mailto link with pre-filled details
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Hm Lutfhur Sadhi,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}\n`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Hm Lutfhur Sadhi, I reviewed your video editing & graphic portfolio and would love to discuss a project with you!`
  );
  // Using direct WhatsApp wa.me link with email fallback
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-12 sm:py-20 border-t border-neutral-200 dark:border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 mb-3 border border-amber-500/20">
            <Send className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 dark:text-white tracking-tight">
            Let's Collaborate On Your Next Project
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Whether you need fast-paced YouTube reels, narrative video editing, podcast sound design, or high-CTR thumbnails, I'm ready to bring high energy and attention to detail.
          </p>
        </div>

        {/* Action Buttons Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {/* Email Action Card */}
          <div className="p-6 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Direct Email
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Reach me directly in my inbox for project briefs, quotes, or questions.
              </p>
              <div className="mt-3 font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-200 break-all select-all">
                {PERSONAL_INFO.email}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-3">
              <a
                id="btn-send-email"
                href={`mailto:${PERSONAL_INFO.email}?subject=Video%20Editing%20Project%20Inquiry`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>

              <button
                id="btn-copy-email"
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-all active:scale-95"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* WhatsApp / Fast Chat Card */}
          <div className="p-6 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Instant Chat / WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Fastest way to reach me for quick turnarounds, rough cuts, and real-time revisions.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Quick Response Time</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
              <a
                id="btn-whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Inquiry Form */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/60 backdrop-blur-md shadow-sm">
          <h3 className="text-lg sm:text-xl font-bold font-display text-neutral-900 dark:text-white mb-2">
            Send a Quick Project Brief
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            Fill out the details below and it will compose a direct inquiry ready to send.
          </p>

          {formSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-sm flex items-center gap-3">
              <Check className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Inquiry Prepared!</p>
                <p className="text-xs mt-0.5">Your email client has opened with the project details pre-filled. Look forward to connecting!</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-type" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Project Type
                </label>
                <select
                  id="contact-type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Short-Form Reel / TikTok">Short-Form Reels / TikToks</option>
                  <option value="YouTube Long-Form Video">YouTube Long-Form Video</option>
                  <option value="Commercial / Promo Video">Commercial & Brand Promo</option>
                  <option value="Sound Design & Audio Mix">Sound Design & Foley</option>
                  <option value="Graphic Poster / Thumbnail">Graphic Poster & Thumbnail</option>
                  <option value="Other Creative Work">Other Creative Editing Work</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Project Details / Raw Footage Length
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Tell me a bit about your video concept, pacing style, deadline, or raw files..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <button
                id="btn-submit-brief"
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-semibold text-sm bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry & Open Email</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
