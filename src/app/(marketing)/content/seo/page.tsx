"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, CheckCircle2, AlertCircle, Info } from "lucide-react";

interface SeoAnalysis {
  score: number;
  readability: string;
  keywordDensity: string;
  wordCount: number;
  suggestions: { type: "good" | "warning" | "error"; text: string }[];
  metaTitle: string;
  metaDescription: string;
}

export default function SeoPage() {
  const [keyword, setKeyword] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SeoAnalysis | null>(null);

  const analyze = async () => {
    if (!keyword || !content) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const wordCount = content.split(/\s+/).length;
    const keywordCount = content.toLowerCase().split(keyword.toLowerCase()).length - 1;
    const density = ((keywordCount / wordCount) * 100).toFixed(1);

    const suggestions: SeoAnalysis["suggestions"] = [];
    if (wordCount < 300) {
      suggestions.push({ type: "warning", text: "Content is short. Aim for 300+ words for better SEO." });
    }
    if (wordCount >= 300) {
      suggestions.push({ type: "good", text: `Good word count: ${wordCount} words.` });
    }
    if (parseFloat(density) < 0.5) {
      suggestions.push({ type: "warning", text: "Keyword density is low. Try including your keyword more naturally." });
    } else if (parseFloat(density) > 2.5) {
      suggestions.push({ type: "error", text: "Keyword density is too high. This may be flagged as keyword stuffing." });
    } else {
      suggestions.push({ type: "good", text: `Keyword density is good: ${density}%.` });
    }
    if (!content.includes(`<h1`) && !content.startsWith("#")) {
      suggestions.push({ type: "warning", text: "Consider adding a heading (H1) with your keyword." });
    }
    if (!content.includes(keyword)) {
      suggestions.push({ type: "error", text: "Keyword not found in content." });
    }

    const score = Math.min(100, Math.max(20,
      50 +
      (wordCount >= 300 ? 15 : 0) +
      (parseFloat(density) >= 0.5 && parseFloat(density) <= 2.5 ? 20 : 0) +
      (content.includes(keyword) ? 15 : 0)
    ));

    setAnalysis({
      score,
      readability: wordCount > 500 ? "Good" : wordCount > 200 ? "Average" : "Needs improvement",
      keywordDensity: `${density}%`,
      wordCount,
      suggestions,
      metaTitle: `${keyword} - Everything You Need to Know | Your Brand`,
      metaDescription: `Discover everything about ${keyword}. Learn the key benefits, features, and why it matters for ${keyword.includes(" ") ? "your needs" : "you"}. Read more.`,
    });
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO Content Optimizer</h1>
        <p className="text-muted-foreground">
          Analyze your content and get actionable SEO improvement suggestions.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Content Analysis
            </CardTitle>
            <CardDescription>Enter your target keyword and content to analyze.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">Target Keyword *</Label>
              <Input
                id="keyword"
                placeholder="e.g., digital marketing"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                placeholder="Paste your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
              />
              <p className="text-xs text-muted-foreground">
                {content.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>
            <Button onClick={analyze} disabled={!keyword || !content || loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze SEO
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {analysis ? (
            <>
              {/* Score */}
              <Card className="border-2 border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
                      {analysis.score}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">SEO Score</p>
                      <p className="text-lg font-semibold">
                        {analysis.score >= 80 ? "Great!" : analysis.score >= 50 ? "Needs work" : "Poor"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{analysis.wordCount}</p>
                      <p className="text-xs text-muted-foreground font-medium">Words</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{analysis.keywordDensity}</p>
                      <p className="text-xs text-muted-foreground font-medium">Keyword Density</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{analysis.readability}</p>
                      <p className="text-xs text-muted-foreground font-medium">Readability</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions */}
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle>Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {analysis.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {s.type === "good" && <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />}
                      {s.type === "warning" && <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-500" />}
                      {s.type === "error" && <AlertCircle className="mt-0.5 h-4 w-4 text-red-500" />}
                      <p className="text-sm">{s.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Meta Tags */}
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Suggested Meta Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Meta Title</Label>
                    <p className="rounded bg-muted p-2 text-sm">{analysis.metaTitle}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Meta Description</Label>
                    <p className="rounded bg-muted p-2 text-sm">{analysis.metaDescription}</p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-2 border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="mb-4 h-12 w-12 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  Enter your keyword and content to get SEO analysis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
