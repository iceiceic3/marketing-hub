"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Copy, Check, Loader2, Trash2 } from "lucide-react";
import type { CopyPlatform, CopyTone, CopyResult } from "@/types/content";

const platforms: { value: CopyPlatform; label: string }[] = [
  { value: "instagram-caption", label: "Instagram Caption" },
  { value: "twitter-tweet", label: "Twitter / X Post" },
  { value: "linkedin-post", label: "LinkedIn Post" },
  { value: "email-subject", label: "Email Subject Line" },
  { value: "ad-copy", label: "Ad Copy" },
  { value: "product-description", label: "Product Description" },
  { value: "blog-outline", label: "Blog Outline" },
];

const tones: { value: CopyTone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "humorous", label: "Humorous" },
  { value: "urgent", label: "Urgent" },
  { value: "inspirational", label: "Inspirational" },
  { value: "formal", label: "Formal" },
];

export default function CopywritingPage() {
  const [productName, setProductName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [platform, setPlatform] = useState<CopyPlatform>("instagram-caption");
  const [tone, setTone] = useState<CopyTone>("professional");
  const [keywords, setKeywords] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CopyResult[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generate = async () => {
    if (!productName || !targetAudience) return;
    setLoading(true);

    // Simulate AI generation (replace with real API call)
    await new Promise((r) => setTimeout(r, 1500));

    const mockResults: CopyResult[] = generateMockCopy(platform, tone, productName, targetAudience);
    setResults((prev) => [...mockResults, ...prev]);
    setLoading(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteResult = (id: string) => {
    setResults((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Copywriting</h1>
        <p className="text-muted-foreground">
          Generate marketing copy for any platform and tone.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Generate Copy
            </CardTitle>
            <CardDescription>
              Fill in the details below to generate marketing copy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product / Service Name *</Label>
              <Input
                id="product"
                placeholder="e.g., Nike Air Max 2024"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience *</Label>
              <Input
                id="audience"
                placeholder="e.g., Young professionals aged 25-35"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select value={platform} onValueChange={(v) => setPlatform(v as CopyPlatform)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={(v) => setTone(v as CopyTone)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (optional)</Label>
              <Input
                id="keywords"
                placeholder="e.g., sustainable, comfortable, stylish"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional">Additional Info (optional)</Label>
              <Textarea
                id="additional"
                placeholder="Any specific points you want to include..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={generate}
              disabled={!productName || !targetAudience || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Copy
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider">
            Generated Copy {results.length > 0 && `(${results.length})`}
          </h2>
          {results.length === 0 ? (
            <Card className="border-2 border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Sparkles className="mb-4 h-12 w-12 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  Your generated copy will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {results.map((result) => (
                <Card key={result.id} className="border-2 border-border shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)]">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          {platforms.find((p) => p.value === result.platform)?.label}
                        </Badge>
                        <Badge variant="outline">
                          {tones.find((t) => t.value === result.tone)?.label}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(result.content, result.id)}
                        >
                          {copiedId === result.id ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteResult(result.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="whitespace-pre-wrap text-sm">{result.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function generateMockCopy(
  platform: CopyPlatform,
  tone: CopyTone,
  product: string,
  audience: string
): CopyResult[] {
  const templates: Record<CopyPlatform, string[]> = {
    "instagram-caption": [
      `Introducing ${product} — designed for ${audience} who demand excellence. \n\nEvery detail crafted with purpose. Every moment made to inspire. \n\n#Innovation #Quality #${product.replace(/\s+/g, "")}`,
      `${product} isn't just a product. It's a statement. \n\nBuilt for ${audience} who aren't afraid to stand out. Are you ready? \n\nLink in bio 👆`,
    ],
    "twitter-tweet": [
      `Just launched: ${product} 🚀\n\nBuilt for ${audience} who want more.\n\nWhat do you think? Drop your thoughts below 👇`,
      `Hot take: ${product} is about to change everything for ${audience}.\n\nAgree or disagree? 🤔`,
    ],
    "linkedin-post": [
      `I'm excited to share something we've been working on.\n\n${product} — built specifically for ${audience}.\n\nHere's what makes it different:\n→ Innovation-first approach\n→ User-centric design\n→ Proven results\n\nWhat challenges are you facing in this space?`,
    ],
    "email-subject": [
      `${product}: The upgrade you've been waiting for`,
      `For ${audience}: ${product} is here`,
      `Don't miss this — ${product} just dropped`,
    ],
    "ad-copy": [
      `${product} — Engineered for ${audience}. Limited time offer. Shop now.`,
      `Why ${audience} are switching to ${product}. Find out why →`,
    ],
    "product-description": [
      `${product} is the ultimate solution for ${audience}. Combining cutting-edge technology with sleek design, it delivers unmatched performance and style.`,
      `Designed with ${audience} in mind, ${product} offers premium quality, exceptional durability, and a seamless user experience.`,
    ],
    "blog-outline": [
      `# Why ${product} Is the Future for ${audience}\n\n## Introduction\n- The problem it solves\n- Who it's for\n\n## Key Features\n1. Feature 1\n2. Feature 2\n3. Feature 3\n\n## Benefits for ${audience}\n- Benefit 1\n- Benefit 2\n\n## Conclusion\n- Call to action`,
    ],
  };

  const variations = templates[platform] || templates["instagram-caption"];
  return variations.map((content, i) => ({
    id: `${Date.now()}-${i}`,
    content,
    platform,
    tone,
    createdAt: new Date().toISOString(),
  }));
}
