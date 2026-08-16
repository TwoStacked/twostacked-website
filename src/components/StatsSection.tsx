import React from 'react';
import { YouTubeStats } from '../types';
import { formatCompactNumber, formatFullNumber } from '../utils/formatters';
import { Users, Film, Eye, Sparkles } from 'lucide-react';

interface StatsSectionProps {
  stats: YouTubeStats | null;
  loading: boolean;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats, loading }) => {
  const subscribersFormatted = stats ? formatCompactNumber(stats.subscriberCount) : '0';
  const videosFormatted = stats ? formatFullNumber(stats.videoCount) : '0';
  const viewsFormatted = stats ? formatCompactNumber(stats.viewCount) : '0';

  return (
    <section id="stats" className="py-16 sm:py-24 bg-[#0a0a0e] border-y border-white/5 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-red-950/20 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Three Column Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          
          {/* Subscribers Stat */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.02]">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-neutral-400 mb-3">
              SUBSCRIBERS
            </p>
            {loading && !stats ? (
              <div className="h-14 w-36 bg-white/5 animate-pulse rounded-lg" />
            ) : (
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                {subscribersFormatted}
                <span className="text-red-500 font-bold">+</span>
              </div>
            )}
            {stats && (
              <span className="text-[11px] text-neutral-500 mt-2 font-mono">
                {formatFullNumber(stats.subscriberCount)} exact subscribers
              </span>
            )}
          </div>

          {/* Videos Stat */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.02]">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-neutral-400 mb-3">
              VIDEOS
            </p>
            {loading && !stats ? (
              <div className="h-14 w-36 bg-white/5 animate-pulse rounded-lg" />
            ) : (
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                {videosFormatted}
              </div>
            )}
            {stats && (
              <span className="text-[11px] text-neutral-500 mt-2 font-mono">
                Public BedWars uploads
              </span>
            )}
          </div>

          {/* Total Views Stat */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.02]">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-neutral-400 mb-3">
              TOTAL VIEWS
            </p>
            {loading && !stats ? (
              <div className="h-14 w-36 bg-white/5 animate-pulse rounded-lg" />
            ) : (
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                {viewsFormatted}
                <span className="text-red-500 font-bold">+</span>
              </div>
            )}
            {stats && (
              <span className="text-[11px] text-neutral-500 mt-2 font-mono">
                {formatFullNumber(stats.viewCount)} channel views
              </span>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
