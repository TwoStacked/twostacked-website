import React from 'react';
import { Info } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* Centered Glowing Info Icon */}
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-950/30 border border-red-800/40 text-red-500 mb-8 glow-red-sm">
        <Info size={24} />
      </div>

      {/* About Description Paragraph */}
      <p className="text-xl sm:text-2xl md:text-3xl text-neutral-300 font-medium leading-relaxed max-w-3xl mx-auto">
        TwoStacked is a Roblox BedWars channel focused on{' '}
        <span className="text-white font-bold underline decoration-red-500 decoration-2 underline-offset-8">
          challenges
        </span>
        , experiments, funny moments, and entertaining gameplay.
      </p>
    </section>
  );
};
