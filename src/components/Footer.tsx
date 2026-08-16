import React from 'react';
import { Youtube, MessageSquare, Gamepad2 } from 'lucide-react';
import { AppConfig } from '../types';

interface FooterProps {
  config: AppConfig | null;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const channelId = config?.youtubeChannelId || 'UCcM7Wk8_VTnrwQ-s2emhipA';
  const youtubeUrl = `https://www.youtube.com/channel/${channelId}`;
  const discordUrl = config?.discordInviteUrl || 'https://discord.gg';
  const robloxUrl = 'https://www.roblox.com/games/6872265039/BedWars';

  return (
    <footer className="border-t border-white/5 bg-[#050507] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left branding and copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <a href="#" className="flex items-center gap-1.5 font-display text-xl font-black text-white">
            Two<span className="text-red-600">Stacked</span>
          </a>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <p className="text-xs text-neutral-500 font-medium">
            © 2026 TwoStacked. All rights reserved.
          </p>
        </div>

        {/* Right Navigation & Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-neutral-400">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-link-youtube"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Youtube size={16} className="text-red-500" />
            <span>YouTube</span>
          </a>

          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-link-discord"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <MessageSquare size={15} />
            <span>Discord</span>
          </a>

          <a
            href={robloxUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-link-roblox"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Gamepad2 size={15} />
            <span>Roblox</span>
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('TwoStacked is a community fan and creator channel for Roblox BedWars.');
            }}
            className="hover:text-white transition-colors"
          >
            Terms
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('TwoStacked does not collect personal data. All public statistics are retrieved via the official YouTube Data API.');
            }}
            className="hover:text-white transition-colors"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};
