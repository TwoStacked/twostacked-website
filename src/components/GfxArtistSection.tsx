import React from 'react';
import { Paintbrush, ExternalLink } from 'lucide-react';
import { AppConfig } from '../types';

interface GfxArtistSectionProps {
  config: AppConfig | null;
}

export const GfxArtistSection: React.FC<GfxArtistSectionProps> = ({ config }) => {
  const applicationUrl = config?.gfxApplicationUrl || 'https://forms.google.com';

  return (
    <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0b0b10] border border-white/10 rounded-2xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
        {/* Subtle background red glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-red-600/10 blur-[90px] pointer-events-none" />

        {/* Eyebrow / Sub-label */}
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-neutral-400 mb-3">
          WANT TO JOIN TWOSTACKED?
        </p>

        {/* Headline */}
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-5">
          BECOME A TWOSTACKED GFX ARTIST
        </h2>

        {/* Description */}
        <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
          Think you can create insane thumbnails, renders, or graphics? Apply to become part of the TwoStacked creative team.
        </p>

        {/* Apply CTA Button */}
        <div className="flex flex-col items-center justify-center gap-3">
          <a
            href={applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-apply-gfx"
            className="inline-flex items-center justify-center gap-3 bg-[#e11d48] hover:bg-[#f43f5e] text-white px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-200 shadow-xl shadow-red-950/60 hover:shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Paintbrush size={18} />
            <span>Apply as GFX Artist</span>
            <ExternalLink size={15} className="opacity-70" />
          </a>

          {/* Subtext */}
          <span className="text-xs text-neutral-500 font-medium mt-2">
            Applications are reviewed by the TwoStacked team.
          </span>
        </div>
      </div>
    </section>
  );
};
