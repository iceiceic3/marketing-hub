export type SocialPlatform = "instagram" | "twitter" | "linkedin" | "facebook" | "tiktok";

export interface SocialPost {
  id: string;
  content: string;
  platform: SocialPlatform;
  scheduledDate: string;
  scheduledTime: string;
  status: "draft" | "scheduled" | "published" | "failed";
  hashtags: string[];
  createdAt: string;
}

export interface HashtagGroup {
  id: string;
  name: string;
  hashtags: string[];
  popularity: "high" | "medium" | "low";
}
