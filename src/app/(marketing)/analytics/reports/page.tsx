"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download, TrendingUp, Eye, MousePointer, DollarSign } from "lucide-react";

interface Report {
  id: string;
  title: string;
  period: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    revenue: number;
  };
  generatedAt: string;
}

const sampleReports: Report[] = [
  {
    id: "1",
    title: "Q1 2024 Performance Report",
    period: "Jan - Mar 2024",
    metrics: { impressions: 125000, clicks: 8500, conversions: 620, spend: 6500, revenue: 24800 },
    generatedAt: "2024-04-01",
  },
  {
    id: "2",
    title: "Spring Campaign Report",
    period: "Mar - Apr 2024",
    metrics: { impressions: 89000, clicks: 6200, conversions: 445, spend: 4200, revenue: 18900 },
    generatedAt: "2024-04-15",
  },
  {
    id: "3",
    title: "Instagram Growth Report",
    period: "Apr 2024",
    metrics: { impressions: 45000, clicks: 3800, conversions: 180, spend: 2100, revenue: 8400 },
    generatedAt: "2024-05-01",
  },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30d");
  const [reports, setReports] = useState(sampleReports);

  const totalMetrics = reports.reduce(
    (acc, r) => ({
      impressions: acc.impressions + r.metrics.impressions,
      clicks: acc.clicks + r.metrics.clicks,
      conversions: acc.conversions + r.metrics.conversions,
      spend: acc.spend + r.metrics.spend,
      revenue: acc.revenue + r.metrics.revenue,
    }),
    { impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 }
  );

  const generateReport = () => {
    const newReport: Report = {
      id: Date.now().toString(),
      title: `Report - ${new Date().toLocaleDateString()}`,
      period: dateRange === "7d" ? "Last 7 Days" : dateRange === "30d" ? "Last 30 Days" : "Last 90 Days",
      metrics: {
        impressions: Math.floor(Math.random() * 50000) + 10000,
        clicks: Math.floor(Math.random() * 5000) + 1000,
        conversions: Math.floor(Math.random() * 300) + 50,
        spend: Math.floor(Math.random() * 3000) + 1000,
        revenue: Math.floor(Math.random() * 15000) + 5000,
      },
      generatedAt: new Date().toISOString(),
    };
    setReports((prev) => [newReport, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and view marketing performance reports.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-5">
        {[
          { label: "Impressions", value: totalMetrics.impressions.toLocaleString(), icon: <Eye className="h-4 w-4" /> },
          { label: "Clicks", value: totalMetrics.clicks.toLocaleString(), icon: <MousePointer className="h-4 w-4" /> },
          { label: "Conversions", value: totalMetrics.conversions.toLocaleString(), icon: <TrendingUp className="h-4 w-4" /> },
          { label: "Spend", value: `$${totalMetrics.spend.toLocaleString()}`, icon: <DollarSign className="h-4 w-4" /> },
          { label: "Revenue", value: `$${totalMetrics.revenue.toLocaleString()}`, icon: <DollarSign className="h-4 w-4" /> },
        ].map((stat) => (
          <Card key={stat.label} className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                {stat.icon}
                <p className="text-xs">{stat.label}</p>
              </div>
              <p className="mt-1 text-xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Generate Report */}
      <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate New Report
          </CardTitle>
          <CardDescription>Select a date range and generate a new performance report.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={(v) => v && setDateRange(v)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generateReport}>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report History */}
      <div>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">Report History</h2>
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-border shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)] bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-muted-foreground">{report.period}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{report.metrics.impressions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Impressions</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{report.metrics.clicks.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{report.metrics.revenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                  <Badge variant={report.metrics.revenue > report.metrics.spend ? "default" : "destructive"} className="shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]">
                    {report.metrics.revenue > report.metrics.spend ? "Profitable" : "Unprofitable"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
