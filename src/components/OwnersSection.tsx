import React from 'react';
import shaImage from '../assets/images/sha.png';
import maxImage from '../assets/images/max.png';

export const OwnersSection: React.FC = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <div className="text-center mb-14">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
          THE OWNERS
        </h2>
      </div>

      {/* Owners Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* SHA Card */}
        <div
          id="owner-card-sha"
          className="group relative bg-[#0c0c11] rounded-2xl overflow-hidden border border-white/10 hover:border-red-600/50 transition-all duration-500 aspect-[4/5] flex flex-col justify-end p-8 shadow-2xl hover:shadow-red-950/40"
        >
          {/* Ambient Background & Character Visual */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Dark Red Atmospheric Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-900/20 blur-[90px] rounded-full pointer-events-none" />
            
            {/* Character Graphic - Sha */}
            <div className="absolute inset-0 flex items-center justify-center pt-4">
              <img
                src={shaImage}
                alt="Sha - TwoStacked Owner"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_35px_rgba(220,38,38,0.4)] group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
              />
            </div>

            {/* Existing transparent-to-opaque bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
          </div>

          {/* Card Foreground Content */}
          <div className="relative z-20">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-red-600/20 text-red-400 border border-red-500/30">
                Co-Founder • BedWars Lead
              </span>
            </div>
            <h3 className="font-display text-5xl sm:text-6xl font-black text-white tracking-wider uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              SHA
            </h3>
          </div>
        </div>

        {/* MAX Card */}
        <div
          id="owner-card-max"
          className="group relative bg-[#0c0c11] rounded-2xl overflow-hidden border border-white/10 hover:border-red-600/50 transition-all duration-500 aspect-[4/5] flex flex-col justify-end p-8 shadow-2xl hover:shadow-red-950/40"
        >
          {/* Ambient Background & Character Visual */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Dark Magenta/Red Atmospheric Glow */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-rose-900/20 blur-[90px] rounded-full pointer-events-none" />

            {/* Character Graphic - Max */}
            <div className="absolute inset-0 flex items-center justify-center pt-4">
              <img
                src={maxImage}
                alt="Max - TwoStacked Owner"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_15px_35px_rgba(244,63,94,0.4)] group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
              />
            </div>

            {/* Existing transparent-to-opaque bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
          </div>

          {/* Card Foreground Content */}
          <div className="relative z-20">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-rose-600/20 text-rose-300 border border-rose-500/30">
                Co-Founder • Content Creator
              </span>
            </div>
            <h3 className="font-display text-5xl sm:text-6xl font-black text-white tracking-wider uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              MAX
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
};
