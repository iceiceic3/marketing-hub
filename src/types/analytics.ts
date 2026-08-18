export interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: "active" | "paused" | "completed";
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  startDate: string;
  endDate: string;
}

export interface UtmParams {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

export interface RoiInput {
  adSpend: number;
  revenue: number;
  leads: number;
}

export interface RoiResult {
  roi: number;
  costPerLead: number;
  costPerConversion: number;
  profitMargin: number;
}
