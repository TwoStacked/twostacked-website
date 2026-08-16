import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LatestVideos } from './components/LatestVideos';
import { StatsSection } from './components/StatsSection';
import { ChallengeBoard } from './components/ChallengeBoard';
import { AboutSection } from './components/AboutSection';
import { OwnersSection } from './components/OwnersSection';
import { GfxArtistSection } from './components/GfxArtistSection';
import { VideoIdeaSection } from './components/VideoIdeaSection';
import { DiscordSection } from './components/DiscordSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { AppConfig, YouTubeStats, YouTubeVideo } from './types';

export default function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [stats, setStats] = useState<YouTubeStats | null>(null);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);
  const [videosLoading, setVideosLoading] = useState<boolean>(true);
  const [videosError, setVideosError] = useState<string | null>(null);
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  // Fetch App Configuration
  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (err) {
      console.warn('Failed to load app config:', err);
    }
  }, []);

  // Fetch Channel Stats from Backend YouTube Data API
  const fetchStats = useCallback(async (forceRefresh = false) => {
    setStatsLoading(true);
    try {
      const res = await fetch(`/api/youtube/stats${forceRefresh ? '?refresh=true' : ''}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        if (data.isLiveApi) {
          setIsLiveApi(true);
        }
      }
    } catch (err: any) {
      console.error('Failed to load stats:', err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch Latest Uploads from Backend YouTube Data API
  const fetchVideos = useCallback(async (forceRefresh = false) => {
    setVideosLoading(true);
    setVideosError(null);
    try {
      const res = await fetch(`/api/youtube/videos${forceRefresh ? '?refresh=true' : ''}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.videos)) {
          setVideos(data.videos);
        }
        if (data.isLiveApi) {
          setIsLiveApi(true);
        }
        if (data.warning) {
          setVideosError(data.warning);
        }
      } else {
        setVideosError('Unable to sync live videos from YouTube API.');
      }
    } catch (err: any) {
      console.error('Failed to load videos:', err);
      setVideosError('Failed to fetch videos from server.');
    } finally {
      setVideosLoading(false);
    }
  }, []);

  // Initial Data Fetch
  useEffect(() => {
    fetchConfig();
    fetchStats();
    fetchVideos();

    // Auto-refresh stats and videos periodically every 15 minutes
    const interval = setInterval(() => {
      fetchStats();
      fetchVideos();
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchConfig, fetchStats, fetchVideos]);

  const handleManualRefresh = () => {
    fetchStats(true);
    fetchVideos(true);
  };

  const handleHeroWatchClick = () => {
    const videosSection = document.getElementById('videos');
    if (videosSection) {
      videosSection.scrollIntoView({ behavior: 'smooth' });
    } else if (config?.youtubeChannelId) {
      window.open(`https://www.youtube.com/channel/${config.youtubeChannelId}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col selection:bg-red-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar config={config} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero 
          config={config} 
          onWatchClick={handleHeroWatchClick} 
        />

        {/* 2. Latest Videos Section (with real YouTube Data API sync) */}
        <LatestVideos
          videos={videos}
          loading={videosLoading}
          error={videosError}
          onRefresh={handleManualRefresh}
          onSelectVideo={(video) => setSelectedVideo(video)}
          isLiveApi={isLiveApi}
        />

        {/* 3. Real YouTube Statistics Section */}
        <StatsSection 
          stats={stats} 
          loading={statsLoading} 
        />

        {/* 4. The Challenge Board */}
        <ChallengeBoard />

        {/* 5. About TwoStacked Section */}
        <AboutSection />

        {/* 6. The Owners (Sha and Max) Section */}
        <OwnersSection />

        {/* 7. Become a TwoStacked GFX Artist Application */}
        <GfxArtistSection config={config} />

        {/* 8. Video Idea Submission */}
        <VideoIdeaSection config={config} />

        {/* 9. Join The Stack (Discord) */}
        <DiscordSection config={config} />
      </main>

      {/* Footer */}
      <Footer config={config} />

      {/* Video Modal Player */}
      <VideoModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </div>
  );
}
