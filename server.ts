import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const TWOSTACKED_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCcM7Wk8_VTnrwQ-s2emhipA';

// In-memory cache for YouTube API data
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache
let statsCache: CacheEntry<any> | null = null;
let videosCache: CacheEntry<any[]> | null = null;

// Initial real TwoStacked channel fallback data
const fallbackStats = {
  subscriberCount: 15400,
  viewCount: 1845200,
  videoCount: 78,
  hiddenSubscriberCount: false,
  channelTitle: 'TwoStacked',
  customUrl: '@TwoStacked',
  avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80',
  bannerUrl: '',
  fetchedAt: new Date().toISOString(),
  isRealData: false,
  isLiveApi: false,
};

const fallbackVideos = [
  {
    id: 'vid-twostacked-1',
    title: 'Trying Elektra for FIRST TIME in Roblox BedWars',
    description: 'We tested the newest Elektra kit in Roblox BedWars! Is this kit completely overpowered or did they ruin it?',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 150000,
    videoUrl: `https://www.youtube.com/channel/${TWOSTACKED_CHANNEL_ID}`,
  },
  {
    id: 'vid-twostacked-2',
    title: 'I Survived 100 Days in HARDCORE BedWars',
    description: '100 days of extreme BedWars survival challenge without dying once.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 300000,
    videoUrl: `https://www.youtube.com/channel/${TWOSTACKED_CHANNEL_ID}`,
  },
  {
    id: 'vid-twostacked-3',
    title: 'The ONLY Strategy You Need to Win',
    description: 'Mastering every single match using the ultimate team bed breaking strategy.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 1200000,
    videoUrl: `https://www.youtube.com/channel/${TWOSTACKED_CHANNEL_ID}`,
  },
  {
    id: 'vid-twostacked-4',
    title: 'NEW BedWars Update is INSANE',
    description: 'Reviewing every sword, block, and kit change in the massive new update.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1612287233215-6455ffb26a63?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 450000,
    videoUrl: `https://www.youtube.com/channel/${TWOSTACKED_CHANNEL_ID}`,
  },
  {
    id: 'vid-twostacked-5',
    title: 'Can I Win Without Taking Damage?',
    description: 'Zero damage taken challenge in squad BedWars match!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 200000,
    videoUrl: `https://www.youtube.com/channel/${TWOSTACKED_CHANNEL_ID}`,
  },
  {
    id: 'vid-twostacked-6',
    title: 'Best PVP Kits Ranked Tier List',
    description: 'Tier list ranking every single PvP kit currently in Roblox BedWars from F to S+ tier.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: 800000,
    videoUrl: `https://www.youtube.com/channel/${TWOSTACKED_CHANNEL_ID}`,
  },
];

// Config Endpoint
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    youtubeChannelId: TWOSTACKED_CHANNEL_ID,
    gfxApplicationUrl: process.env.GFX_APPLICATION_URL || 'https://forms.google.com',
    videoIdeaSubmissionUrl: process.env.VIDEO_IDEA_SUBMISSION_URL || 'https://forms.google.com',
    discordInviteUrl: process.env.DISCORD_INVITE_URL || 'https://discord.gg',
    hasYouTubeApiKey: Boolean(process.env.YOUTUBE_API_KEY && process.env.YOUTUBE_API_KEY.trim() !== ''),
  });
});

// YouTube Statistics Endpoint
app.get('/api/youtube/stats', async (req: Request, res: Response) => {
  const forceRefresh = req.query.refresh === 'true';
  const now = Date.now();

  if (!forceRefresh && statsCache && now - statsCache.timestamp < CACHE_TTL_MS) {
    return res.json({ ...statsCache.data, cached: true });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    // If no API key is provided, return baseline structure with clear status
    return res.json({
      ...fallbackStats,
      isLiveApi: false,
      message: 'YouTube API key not configured yet. Using baseline channel data. Configure YOUTUBE_API_KEY in Secrets to enable live sync.',
    });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${TWOSTACKED_CHANNEL_ID}&key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errText = await response.text();
      console.warn('YouTube API stats error status:', response.status);
      console.warn('YouTube API error body:', errText);
      if (statsCache) {
        return res.json({ ...statsCache.data, cached: true, warning: 'Stale cache served due to API response' });
      }
      return res.json({
        ...fallbackStats,
        isLiveApi: false,
        warning: `YouTube API returned status ${response.status}`,
      });
    }

    const json = await response.json();
    const item = json.items?.[0];

    if (!item) {
      if (statsCache) return res.json(statsCache.data);
      return res.json({ ...fallbackStats, isLiveApi: false, warning: 'Channel not found in API' });
    }

    const stats = {
      subscriberCount: parseInt(item.statistics?.subscriberCount || '0', 10),
      viewCount: parseInt(item.statistics?.viewCount || '0', 10),
      videoCount: parseInt(item.statistics?.videoCount || '0', 10),
      hiddenSubscriberCount: Boolean(item.statistics?.hiddenSubscriberCount),
      channelTitle: item.snippet?.title || 'TwoStacked',
      customUrl: item.snippet?.customUrl || '@TwoStacked',
      avatarUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || fallbackStats.avatarUrl,
      bannerUrl: item.brandingSettings?.image?.bannerExternalUrl || '',
      fetchedAt: new Date().toISOString(),
      isRealData: true,
      isLiveApi: true,
    };

    statsCache = {
      data: stats,
      timestamp: now,
    };

    return res.json(stats);
  } catch (error: any) {
    console.error('Error fetching YouTube channel stats:', error?.message || error);
    if (statsCache) {
      return res.json({ ...statsCache.data, cached: true });
    }
    return res.json({
      ...fallbackStats,
      isLiveApi: false,
      error: 'Failed to connect to YouTube Data API',
    });
  }
});

// YouTube Latest Videos Endpoint
app.get('/api/youtube/videos', async (req: Request, res: Response) => {
  const forceRefresh = req.query.refresh === 'true';
  const now = Date.now();

  if (!forceRefresh && videosCache && now - videosCache.timestamp < CACHE_TTL_MS) {
    return res.json({ videos: videosCache.data, cached: true });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return res.json({
      videos: fallbackVideos,
      isLiveApi: false,
      message: 'YouTube API key not configured yet. Using baseline uploads data.',
    });
  }

  try {
    // The uploads playlist ID for YouTube channels is channelId with 'UC' replaced by 'UU'
    const uploadsPlaylistId = TWOSTACKED_CHANNEL_ID.startsWith('UC')
      ? 'UU' + TWOSTACKED_CHANNEL_ID.substring(2)
      : TWOSTACKED_CHANNEL_ID;

    // Step 1: Fetch latest playlist items from uploads playlist (1 quota unit)
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=6&key=${apiKey}`;
    const playlistRes = await fetch(playlistUrl);

    let videoItems: any[] = [];

    if (playlistRes.ok) {
      const playlistData = await playlistRes.json();
      videoItems = playlistData.items || [];
    } else {
      // Fallback to search query if uploads playlist isn't accessible
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${TWOSTACKED_CHANNEL_ID}&maxResults=6&order=date&type=video&key=${apiKey}`;
      const searchRes = await fetch(searchUrl);
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        videoItems = searchData.items || [];
      }
    }

    if (!videoItems || videoItems.length === 0) {
      if (videosCache) return res.json({ videos: videosCache.data, cached: true });
      return res.json({ videos: fallbackVideos, isLiveApi: false });
    }

    // Extract video IDs to fetch detailed stats (views, likes, duration)
    const videoIds = videoItems
      .map((item: any) => item.contentDetails?.videoId || item.id?.videoId || item.snippet?.resourceId?.videoId)
      .filter(Boolean);

    let detailedStatsMap: Record<string, { viewCount?: number; likeCount?: number; duration?: string }> = {};

    if (videoIds.length > 0) {
      try {
        const videosDetailUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(',')}&key=${apiKey}`;
        const videosDetailRes = await fetch(videosDetailUrl);
        if (videosDetailRes.ok) {
          const detailData = await videosDetailRes.json();
          (detailData.items || []).forEach((vid: any) => {
            detailedStatsMap[vid.id] = {
              viewCount: vid.statistics?.viewCount ? parseInt(vid.statistics.viewCount, 10) : undefined,
              likeCount: vid.statistics?.likeCount ? parseInt(vid.statistics.likeCount, 10) : undefined,
              duration: vid.contentDetails?.duration,
            };
          });
        }
      } catch (detailErr) {
        console.warn('Failed to fetch detailed video statistics:', detailErr);
      }
    }

    const formattedVideos = videoItems.map((item: any) => {
      const vidId = item.contentDetails?.videoId || item.id?.videoId || item.snippet?.resourceId?.videoId;
      const snippet = item.snippet || {};
      const thumbnails = snippet.thumbnails || {};
      const thumbUrl =
        thumbnails.maxres?.url ||
        thumbnails.standard?.url ||
        thumbnails.high?.url ||
        thumbnails.medium?.url ||
        thumbnails.default?.url;

      const details = detailedStatsMap[vidId] || {};

      return {
        id: vidId,
        title: snippet.title || 'Untitled Video',
        description: snippet.description || '',
        thumbnailUrl: thumbUrl,
        publishedAt: snippet.publishedAt || new Date().toISOString(),
        viewCount: details.viewCount,
        likeCount: details.likeCount,
        duration: details.duration,
        videoUrl: `https://www.youtube.com/watch?v=${vidId}`,
      };
    });

    videosCache = {
      data: formattedVideos,
      timestamp: now,
    };

    return res.json({ videos: formattedVideos, isLiveApi: true, isRealData: true });
  } catch (error: any) {
    console.error('Error fetching YouTube latest videos:', error?.message || error);
    if (videosCache) {
      return res.json({ videos: videosCache.data, cached: true });
    }
    return res.json({ videos: fallbackVideos, isLiveApi: false });
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TwoStacked server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
