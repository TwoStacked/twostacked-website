export interface YouTubeStats {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  hiddenSubscriberCount: boolean;
  channelTitle: string;
  customUrl: string;
  avatarUrl: string;
  bannerUrl?: string;
  fetchedAt: string;
  isRealData: boolean;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount?: number;
  likeCount?: number;
  duration?: string;
  videoUrl: string;
}

export interface AppConfig {
  youtubeChannelId: string;
  gfxApplicationUrl: string;
  videoIdeaSubmissionUrl: string;
  discordInviteUrl: string;
  hasYouTubeApiKey: boolean;
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'COMING SOON';
  badgeColor: string;
}
