import React from 'react';
import { Play, MessageSquare, Flame } from 'lucide-react';
import { AppConfig } from '../types';

interface HeroProps {
  config: AppConfig | null;
  onWatchClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onWatchClick }) => {
  const channelId = config?.youtubeChannelId || 'UCcM7Wk8_VTnrwQ-s2emhipA';
  const youtubeChannelUrl = `https://www.youtube.com/channel/${channelId}`;
  const discordUrl = config?.discordInviteUrl || 'https://discord.gg';

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Graphic & Misty Mountain Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Dark landscape image background with deep overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&auto=format&fit=crop&q=80')`,
          }}
        />
        {/* Radial dark gradient & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/80 via-[#070709]/90 to-[#070709]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-[#070709]" />
      </div>

      {/* Atmospheric Background Watermark: "TWO STACKED" */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-15 overflow-hidden"
        aria-hidden="true"
      >
        <div className="font-display font-black text-[12vw] sm:text-[14vw] tracking-wider text-white text-center leading-tight">
          TWO<br />STACKED
        </div>
      </div>

      {/* Subtle Red Ember Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center py-16 sm:py-24">
        
        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 uppercase leading-[0.95]">
          ROBLOX BEDWARS.<br />
          <span className="text-[#f43f5e] drop-shadow-[0_0_35px_rgba(244,63,94,0.4)]">
            STACKED DIFFERENT.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-medium max-w-2xl mx-auto mb-10 tracking-normal">
          Challenges, experiments, and chaotic BedWars gameplay.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto">
          {/* Watch on YouTube Button */}
          <button
            onClick={onWatchClick}
            id="hero-btn-watch-youtube"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#e11d48] hover:bg-[#f43f5e] text-white px-8 py-4 rounded-lg font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-200 shadow-xl shadow-red-950/50 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Play size={18} className="fill-white" />
            <span>Watch on YouTube</span>
          </button>

          {/* Join Discord Button */}
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-btn-join-discord"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#13131a] hover:bg-[#1c1c27] text-white border border-white/10 hover:border-white/20 px-8 py-4 rounded-lg font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare size={18} />
            <span>Join Discord</span>
          </a>
        </div>

      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070709] to-transparent pointer-events-none" />
    </section>
  );
};
