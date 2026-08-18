"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", impressions: 18000, clicks: 1200, conversions: 89 },
  { month: "Feb", impressions: 22000, clicks: 1500, conversions: 112 },
  { month: "Mar", impressions: 28000, clicks: 1900, conversions: 145 },
  { month: "Apr", impressions: 35000, clicks: 2400, conversions: 178 },
  { month: "May", impressions: 42000, clicks: 3100, conversions: 234 },
  { month: "Jun", impressions: 48000, clicks: 3800, conversions: 289 },
];

const platformData = [
  { name: "Instagram", value: 35, color: "#E1306C" },
  { name: "Facebook", value: 25, color: "#4267B2" },
  { name: "Twitter", value: 20, color: "#1DA1F2" },
  { name: "LinkedIn", value: 15, color: "#0A66C2" },
  { name: "TikTok", value: 5, color: "#000000" },
];

const campaignPerformance = [
  { campaign: "Spring Sale", ctr: 4.2, roas: 3.8 },
  { campaign: "Brand Awareness", ctr: 2.8, roas: 2.1 },
  { campaign: "Product Launch", ctr: 5.1, roas: 4.5 },
  { campaign: "Newsletter", ctr: 3.6, roas: 5.2 },
  { campaign: "Retargeting", ctr: 6.3, roas: 7.1 },
];

export function MonthlyTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="month" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="impressions" stroke="#4a6741" strokeWidth={2} name="Impressions" />
        <Line type="monotone" dataKey="clicks" stroke="#7b9bab" strokeWidth={2} name="Clicks" />
        <Line type="monotone" dataKey="conversions" stroke="#c49a6c" strokeWidth={2} name="Conversions" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PlatformPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={platformData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {platformData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function CampaignBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={campaignPerformance}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="campaign" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        <Bar dataKey="ctr" fill="#4a6741" name="CTR %" radius={[4, 4, 0, 0]} />
        <Bar dataKey="roas" fill="#7b9bab" name="ROAS" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
