import React from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';
import { AppConfig } from '../types';

interface DiscordSectionProps {
  config: AppConfig | null;
}

export const DiscordSection: React.FC<DiscordSectionProps> = ({ config }) => {
  const discordUrl = config?.discordInviteUrl || 'https://discord.gg';

  return (
    <section id="discord" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0b0b10] border border-white/10 rounded-2xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
        {/* Subtle background red glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-red-600/10 blur-[90px] pointer-events-none" />

        {/* Discord / Speech Bubble Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-900 border border-white/10 text-white mb-6">
          <MessageSquare size={26} className="text-white" />
        </div>

        {/* Headline */}
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
          JOIN THE STACK
        </h2>

        {/* Description */}
        <p className="text-neutral-300 text-base sm:text-lg max-w-xl mx-auto mb-8 font-medium leading-relaxed">
          Hang out, talk BedWars, and be part of the TwoStacked community. Find teammates and participate in video ideas.
        </p>

        {/* Join Discord CTA */}
        <div>
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-join-discord-section"
            className="inline-flex items-center justify-center gap-3 bg-[#e11d48] hover:bg-[#f43f5e] text-white px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-200 shadow-xl shadow-red-950/60 hover:shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare size={18} />
            <span>Join Discord</span>
            <ExternalLink size={15} className="opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
};
