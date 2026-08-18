export type CopyPlatform =
  | "instagram-caption"
  | "twitter-tweet"
  | "linkedin-post"
  | "email-subject"
  | "ad-copy"
  | "product-description"
  | "blog-outline";

export type CopyTone =
  | "professional"
  | "casual"
  | "humorous"
  | "urgent"
  | "inspirational"
  | "formal";

export interface CopyRequest {
  productName: string;
  targetAudience: string;
  platform: CopyPlatform;
  tone: CopyTone;
  keywords?: string;
  additionalInfo?: string;
}

export interface CopyResult {
  id: string;
  content: string;
  platform: CopyPlatform;
  tone: CopyTone;
  createdAt: string;
}

export interface SeoRequest {
  keyword: string;
  content: string;
}

export interface SeoResult {
  score: number;
  readability: string;
  keywordDensity: string;
  suggestions: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface ContentIdeaRequest {
  industry: string;
  targetAudience: string;
  pillars?: string[];
}

export interface ContentIdeaResult {
  pillars: string[];
  ideas: { title: string; description: string; platform: string }[];
  calendar: { week: string; topics: string[] }[];
}
