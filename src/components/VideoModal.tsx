import React, { useEffect } from 'react';
import { X, ExternalLink, Eye, Clock } from 'lucide-react';
import { YouTubeVideo } from '../types';
import { formatCompactNumber, formatRelativeTime } from '../utils/formatters';

interface VideoModalProps {
  video: YouTubeVideo | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const isRealYouTubeId = video.id && !video.id.startsWith('vid-twostacked-');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#0e0e13] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
        {/* Modal Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/10 bg-[#14141c]">
          <h3 className="font-semibold text-sm sm:text-base text-white line-clamp-1 pr-4">
            {video.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close video player"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Embed Player or Fallback */}
        <div className="relative aspect-video w-full bg-black">
          {isRealYouTubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0a0a0f]">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover opacity-40 absolute inset-0"
              />
              <div className="relative z-10 max-w-md bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <h4 className="font-bold text-white text-lg mb-2">{video.title}</h4>
                <p className="text-sm text-neutral-300 mb-6">
                  {video.description || 'Watch on official YouTube channel.'}
                </p>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#e11d48] hover:bg-[#f43f5e] text-white px-6 py-3 rounded-lg font-bold text-sm tracking-wide transition-all"
                >
                  <span>Open Video on YouTube</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Info Footer */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111117] border-t border-white/5">
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            {video.viewCount !== undefined && (
              <span className="flex items-center gap-1.5 font-medium">
                <Eye size={14} className="text-neutral-500" />
                <span>{formatCompactNumber(video.viewCount)} Views</span>
              </span>
            )}
            <span className="flex items-center gap-1.5 font-medium">
              <Clock size={14} className="text-neutral-500" />
              <span>{formatRelativeTime(video.publishedAt)}</span>
            </span>
          </div>

          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors self-start sm:self-auto"
          >
            <span>View on YouTube</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
