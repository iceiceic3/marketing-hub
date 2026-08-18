"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Loader2, Calendar, Target, Sparkles } from "lucide-react";

interface IdeaResult {
  pillars: string[];
  ideas: { title: string; description: string; platform: string }[];
  calendar: { week: string; topics: string[] }[];
}

export default function IdeasPage() {
  const [industry, setIndustry] = useState("");
  const [audience, setAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IdeaResult | null>(null);

  const generate = async () => {
    if (!industry || !audience) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    const mockResult: IdeaResult = {
      pillars: [
        "Industry Trends & News",
        "How-To Guides & Tutorials",
        "Case Studies & Success Stories",
        "Behind-the-Scenes",
        "User-Generated Content",
      ],
      ideas: [
        { title: "Top 5 Trends in " + industry + " for 2024", description: "A comprehensive look at what's shaping the industry this year.", platform: "Blog / LinkedIn" },
        { title: "How [Brand] Achieved 10x Growth", description: "A case study highlighting strategies that worked.", platform: "Blog / Twitter" },
        { title: "Day in the Life of Our Team", description: "Behind-the-scenes content showing company culture.", platform: "Instagram / TikTok" },
        { title: "Myth vs Reality in " + industry, description: "Debunk common misconceptions in your industry.", platform: "LinkedIn / Twitter" },
        { title: "Customer Spotlight: " + audience + " Success Story", description: "Feature a real customer and their journey.", platform: "Instagram / Blog" },
        { title: "Quick Tips for " + audience, description: "Short, actionable tips your audience can use today.", platform: "Twitter / Instagram Reels" },
        { title: "Industry Predictions for Next Year", description: "Share your expert predictions to establish thought leadership.", platform: "LinkedIn / Blog" },
        { title: "FAQ: Answering " + audience + "'s Top Questions", description: "Address the most common questions your audience has.", platform: "Blog / YouTube" },
      ],
      calendar: [
        { week: "Week 1", topics: ["Industry Trends Post", "How-To Guide", "Behind-the-Scenes"] },
        { week: "Week 2", topics: ["Case Study", "Customer Spotlight", "Quick Tips Thread"] },
        { week: "Week 3", topics: ["Myth vs Reality", "FAQ Post", "Team Introduction"] },
        { week: "Week 4", topics: ["Month Recap", "Industry Predictions", "User Poll / Engagement"] },
      ],
    };

    setResult(mockResult);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Ideation</h1>
        <p className="text-muted-foreground">
          Generate content ideas, pillar topics, and a 4-week content calendar.
        </p>
      </div>

      {/* Input */}
      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Generate Ideas
          </CardTitle>
          <CardDescription>Tell us about your niche and audience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry / Niche *</Label>
              <Input
                id="industry"
                placeholder="e.g., SaaS, E-commerce, Health & Fitness"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience *</Label>
              <Input
                id="audience"
                placeholder="e.g., Small business owners, Fitness enthusiasts"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={generate} disabled={!industry || !audience || loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Content Ideas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Content Pillars */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Content Pillars
              </CardTitle>
              <CardDescription>Core themes to base your content around.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.pillars.map((pillar, i) => (
                  <Badge key={i} variant="secondary" className="text-sm">
                    {pillar}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Ideas */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Content Ideas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {result.ideas.map((idea, i) => (
                  <div key={i} className="rounded-md border-2 border-border shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)] p-4">
                    <h3 className="font-medium">{idea.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{idea.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {idea.platform}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                4-Week Content Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {result.calendar.map((week, i) => (
                  <div key={i} className="rounded-md border-2 border-border shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)] p-4">
                    <h3 className="mb-2 font-medium">{week.week}</h3>
                    <ul className="space-y-1">
                      {week.topics.map((topic, j) => (
                        <li key={j} className="text-sm text-muted-foreground">
                          • {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
