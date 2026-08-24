"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, DollarSign, Users, Percent } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function RoiPage() {
  const { toast } = useToast();
  const [adSpend, setAdSpend] = useState("");
  const [revenue, setRevenue] = useState("");
  const [leads, setLeads] = useState("");
  const [calculated, setCalculated] = useState(false);

  const spend = parseFloat(adSpend) || 0;
  const rev = parseFloat(revenue) || 0;
  const numLeads = parseInt(leads) || 0;

  const roi = spend > 0 ? ((rev - spend) / spend) * 100 : 0;
  const costPerLead = numLeads > 0 ? spend / numLeads : 0;
  const costPerConversion = numLeads > 0 ? spend / numLeads : 0;
  const profitMargin = rev > 0 ? ((rev - spend) / rev) * 100 : 0;
  const profit = rev - spend;

  const calculate = () => {
    if (spend > 0 && rev > 0) {
      setCalculated(true);
      toast({ title: "ROI calculated!", description: `Your ROI is ${roi.toFixed(1)}%`, variant: roi >= 100 ? "success" : "warning" });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ROI Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your marketing return on investment and key performance metrics.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Campaign Data
            </CardTitle>
            <CardDescription>Enter your campaign financials to calculate ROI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="spend">Total Ad Spend ($) *</Label>
              <Input
                id="spend"
                type="number"
                placeholder="e.g., 5000"
                value={adSpend}
                onChange={(e) => setAdSpend(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenue Generated ($) *</Label>
              <Input
                id="revenue"
                type="number"
                placeholder="e.g., 15000"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leads">Number of Leads / Conversions</Label>
              <Input
                id="leads"
                type="number"
                placeholder="e.g., 250"
                value={leads}
                onChange={(e) => setLeads(e.target.value)}
              />
            </div>
            <Button onClick={calculate} disabled={spend <= 0 || rev <= 0} className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate ROI
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {calculated ? (
            <>
              {/* Main ROI */}
              <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 border-border shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)] ${roi >= 0 ? "bg-green-500/10" : "bg-red-500/10"}`}>
                      <TrendingUp className={`h-8 w-8 ${roi >= 0 ? "text-green-500" : "text-red-500"}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Return on Investment</p>
                      <p className={`text-4xl font-bold ${roi >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {roi.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-border shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)] bg-green-500/10">
                        <DollarSign className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Net Profit</p>
                        <p className={`text-lg font-bold ${profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                          ${profit.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-border shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)] bg-blue-500/10">
                        <Percent className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Profit Margin</p>
                        <p className="text-lg font-bold">{profitMargin.toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-border shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)] bg-purple-500/10">
                        <Users className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Cost Per Lead</p>
                        <p className="text-lg font-bold">
                          {numLeads > 0 ? `$${costPerLead.toFixed(2)}` : "N/A"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-border shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)] bg-orange-500/10">
                        <DollarSign className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">ROAS</p>
                        <p className="text-lg font-bold">
                          {spend > 0 ? `${(rev / spend).toFixed(1)}x` : "N/A"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Benchmarks */}
              <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
                <CardHeader>
                  <CardTitle>Industry Benchmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: "Average ROI", benchmark: "200%", description: "For every $1 spent, $3 returned" },
                      { label: "Average CPL", benchmark: "$30-50", description: "Varies by industry" },
                      { label: "Average ROAS", benchmark: "4x", description: "Healthy e-commerce target" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-lg border-2 border-border p-3 shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                        <span className="text-sm font-semibold">{item.benchmark}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calculator className="mb-4 h-12 w-12 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  Enter your campaign data and click Calculate to see ROI metrics.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
