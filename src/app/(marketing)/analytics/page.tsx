"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Eye, MousePointer, DollarSign, Users } from "lucide-react";
import { ChartSkeleton } from "@/components/analytics/chart-skeleton";

const MonthlyTrendChart = dynamic(
  () => import("@/components/analytics/charts").then((m) => m.MonthlyTrendChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const PlatformPieChart = dynamic(
  () => import("@/components/analytics/charts").then((m) => m.PlatformPieChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

const CampaignBarChart = dynamic(
  () => import("@/components/analytics/charts").then((m) => m.CampaignBarChart),
  { ssr: false, loading: () => <ChartSkeleton height={300} /> }
);

const kpis = [
  { label: "Total Impressions", value: "245,892", change: "+12.5%", icon: <Eye className="h-4 w-4" />, up: true },
  { label: "Total Clicks", value: "18,432", change: "+8.3%", icon: <MousePointer className="h-4 w-4" />, up: true },
  { label: "Conversions", value: "1,247", change: "+23.1%", icon: <Users className="h-4 w-4" />, up: true },
  { label: "Total Spend", value: "$12,450", change: "-5.2%", icon: <DollarSign className="h-4 w-4" />, up: false },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your marketing performance across all channels.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-border bg-primary/10 text-primary shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]">
                  {kpi.icon}
                </div>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-2xl font-bold">{kpi.value}</p>
                <span className={`text-xs font-medium ${kpi.up ? "text-green-500" : "text-red-500"}`}>
                  {kpi.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyTrendChart />
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
          <CardHeader>
            <CardTitle>Traffic by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <PlatformPieChart />
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignBarChart />
        </CardContent>
      </Card>
    </div>
  );
}
