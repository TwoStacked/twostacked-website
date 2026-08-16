import React, { useState } from 'react';
import { Menu, X, Play, MessageSquare, ExternalLink } from 'lucide-react';
import { AppConfig } from '../types';

interface NavbarProps {
  config: AppConfig | null;
}

export const Navbar: React.FC<NavbarProps> = ({ config }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const discordUrl = config?.discordInviteUrl || 'https://discord.gg';

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070709]/85 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2 group cursor-pointer"
          id="navbar-brand-logo"
        >
          <span className="font-display text-2xl font-black tracking-tight text-white group-hover:text-red-400 transition-colors">
            Two<span className="text-red-600">Stacked</span>
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-300">
          <button
            onClick={() => scrollToSection('videos')}
            id="nav-link-videos"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Videos
          </button>
          <button
            onClick={() => scrollToSection('challenges')}
            id="nav-link-challenges"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Challenges
          </button>
          <button
            onClick={() => scrollToSection('stats')}
            id="nav-link-stats"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Stats
          </button>
          <button
            onClick={() => scrollToSection('discord')}
            id="nav-link-discord"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Discord
          </button>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-cta-join"
            className="bg-[#e11d48] hover:bg-[#f43f5e] text-white px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 shadow-lg shadow-red-950/40 hover:shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Join Now
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-menu-toggle"
            className="p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d12] border-b border-white/10 px-4 pt-3 pb-6 space-y-4">
          <button
            onClick={() => scrollToSection('videos')}
            className="block w-full text-left py-2 text-base font-semibold text-neutral-300 hover:text-white"
          >
            Videos
          </button>
          <button
            onClick={() => scrollToSection('challenges')}
            className="block w-full text-left py-2 text-base font-semibold text-neutral-300 hover:text-white"
          >
            Challenges
          </button>
          <button
            onClick={() => scrollToSection('stats')}
            className="block w-full text-left py-2 text-base font-semibold text-neutral-300 hover:text-white"
          >
            Stats
          </button>
          <button
            onClick={() => scrollToSection('discord')}
            className="block w-full text-left py-2 text-base font-semibold text-neutral-300 hover:text-white"
          >
            Discord
          </button>
          <div className="pt-2">
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#e11d48] hover:bg-[#f43f5e] text-white py-3 rounded-lg font-bold text-sm tracking-wide"
            >
              Join Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
