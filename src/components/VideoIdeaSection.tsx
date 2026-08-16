import React from 'react';
import { Send, Lightbulb, ExternalLink } from 'lucide-react';
import { AppConfig } from '../types';

interface VideoIdeaSectionProps {
  config: AppConfig | null;
}

export const VideoIdeaSection: React.FC<VideoIdeaSectionProps> = ({ config }) => {
  const submissionUrl = config?.videoIdeaSubmissionUrl || 'https://forms.google.com';

  return (
    <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0b0b10] border border-white/10 rounded-2xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
        {/* Subtle background red glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-rose-600/10 blur-[90px] pointer-events-none" />

        {/* Eyebrow / Sub-label */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-neutral-400 mb-3">
          GOT AN IDEA?
        </p>

        {/* Headline */}
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-5 flex items-center justify-center gap-3">
          <span>GIVE US YOUR NEXT VIDEO IDEA</span>
          <span className="text-amber-400">💡</span>
        </h2>

        {/* Description */}
        <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
          Have a crazy Roblox BedWars challenge, experiment, or video concept? Send it to us — your idea could become a future TwoStacked video.
        </p>

        {/* Submit CTA Button */}
        <div className="flex flex-col items-center justify-center gap-3">
          <a
            href={submissionUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-submit-video-idea"
            className="inline-flex items-center justify-center gap-3 bg-[#e11d48] hover:bg-[#f43f5e] text-white px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-200 shadow-xl shadow-red-950/60 hover:shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send size={18} />
            <span>Submit a Video Idea</span>
            <ExternalLink size={15} className="opacity-70" />
          </a>

          {/* Subtext */}
          <span className="text-xs text-neutral-500 font-medium mt-2">
            The best ideas may appear in a future TwoStacked video.
          </span>
        </div>
      </div>
    </section>
  );
};
