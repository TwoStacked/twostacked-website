import React from 'react';
import { Play, Eye, Clock, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';
import { YouTubeVideo } from '../types';
import { formatCompactNumber, formatRelativeTime } from '../utils/formatters';

interface LatestVideosProps {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onSelectVideo: (video: YouTubeVideo) => void;
  isLiveApi?: boolean;
}

export const LatestVideos: React.FC<LatestVideosProps> = ({
  videos,
  loading,
  error,
  onRefresh,
  onSelectVideo,
  isLiveApi,
}) => {
  return (
    <section id="videos" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Title and Live Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
              LATEST VIDEOS
            </h2>
            {isLiveApi && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950/60 text-red-400 border border-red-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                LIVE SYNC
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-400">
            Real uploads from the official TwoStacked YouTube channel.
          </p>
        </div>

        {/* Refresh Action */}
        <button
          onClick={onRefresh}
          disabled={loading}
          id="btn-refresh-videos"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white bg-[#13131a] hover:bg-[#1a1a24] border border-white/5 hover:border-white/15 rounded-lg transition-all disabled:opacity-50 cursor-pointer self-start sm:self-auto"
          title="Refresh latest videos from YouTube"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-red-500' : ''} />
          <span>{loading ? 'Fetching...' : 'Sync Videos'}</span>
        </button>
      </div>

      {/* Error State with fallback banner */}
      {error && (
        <div className="mb-8 p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-300 text-sm flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">{error}</p>
            <p className="text-xs text-amber-400/80 mt-0.5">
              Displaying cached uploads. Configure YOUTUBE_API_KEY in Secrets for live channel syncing.
            </p>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {loading && videos.length === 0 ? (
          // Skeleton loaders
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="bg-[#121217] rounded-xl overflow-hidden border border-white/5 animate-pulse"
            >
              <div className="aspect-video bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))
        ) : videos.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-[#121217] rounded-2xl border border-white/5">
            <p className="text-neutral-400 text-base">No videos found. Click "Sync Videos" to reload.</p>
          </div>
        ) : (
          videos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              id={`video-card-${video.id}`}
              className="group bg-[#0e0e13] hover:bg-[#15151d] rounded-xl overflow-hidden border border-white/5 hover:border-red-900/40 transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/30"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback thumbnail if broken
                    (e.target as HTMLElement).setAttribute(
                      'src',
                      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80'
                    );
                  }}
                />

                {/* Dark Vignette & Play Icon Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg shadow-black/60 group-hover:scale-115 group-hover:bg-red-500 transition-all duration-300">
                    <Play size={20} className="fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Optional Duration badge */}
                {video.duration && (
                  <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    {video.duration.replace('PT', '').replace('M', ':').replace('S', '')}
                  </div>
                )}
              </div>

              {/* Video Info Content */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <h3 className="font-semibold text-base sm:text-lg text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug mb-3">
                  {video.title}
                </h3>

                {/* Meta details (Views & Date) */}
                <div className="flex items-center gap-3 text-xs text-neutral-400 font-medium pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Eye size={13} className="text-neutral-500" />
                    <span>{video.viewCount !== undefined ? `${formatCompactNumber(video.viewCount)} Views` : 'Latest'}</span>
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-neutral-500" />
                    <span>{formatRelativeTime(video.publishedAt)}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
