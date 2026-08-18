"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hash, Search, Copy, Check, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Hashtag {
  name: string;
  popularity: "high" | "medium" | "low";
  posts: string;
  category: string;
}

const mockHashtags: Hashtag[] = [
  { name: "#digitalmarketing", popularity: "high", posts: "52M", category: "Industry" },
  { name: "#marketingtips", popularity: "high", posts: "18M", category: "Industry" },
  { name: "#socialmediamarketing", popularity: "high", posts: "24M", category: "Industry" },
  { name: "#contentmarketing", popularity: "medium", posts: "8.5M", category: "Industry" },
  { name: "#growthhacking", popularity: "medium", posts: "3.2M", category: "Strategy" },
  { name: "#seotips", popularity: "medium", posts: "5.1M", category: "SEO" },
  { name: "#emailmarketing", popularity: "medium", posts: "6.8M", category: "Channel" },
  { name: "#branding", popularity: "high", posts: "15M", category: "Branding" },
  { name: "#startuplife", popularity: "low", posts: "1.8M", category: "Startup" },
  { name: "#entrepreneurmindset", popularity: "low", posts: "950K", category: "Mindset" },
  { name: "#markethacks", popularity: "low", posts: "420K", category: "Strategy" },
  { name: "#conversionrate", popularity: "low", posts: "280K", category: "Analytics" },
];

export default function HashtagsPage() {
  const [keyword, setKeyword] = useState("");
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const search = async () => {
    if (!keyword) return;
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setHashtags(mockHashtags);
  };

  const toggleTag = (name: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const copySingleTag = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedTag(name);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  const copySelected = () => {
    const text = Array.from(selectedTags).join(" ");
    copyToClipboard(text);
  };

  const getPopularityIcon = (popularity: string) => {
    if (popularity === "high") return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (popularity === "medium") return <Minus className="h-3 w-3 text-yellow-500" />;
    return <TrendingDown className="h-3 w-3 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hashtag Research</h1>
        <p className="text-muted-foreground">
          Find the best hashtags for your social media posts.
        </p>
      </div>

      {/* Search */}
      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Find Hashtags
          </CardTitle>
          <CardDescription>Enter a keyword to find related hashtags.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., digital marketing, fitness, food..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
            />
            <Button onClick={search} disabled={!keyword}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {hashtags.length > 0 && (
        <div className="space-y-4">
          {/* Selected Tags */}
          {selectedTags.size > 0 && (
            <Card className="border-2 border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {Array.from(selectedTags).map((tag) => (
                      <Badge key={tag} variant="default" className="cursor-pointer" onClick={() => toggleTag(tag)}>
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" onClick={copySelected}>
                    {copiedAll ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copy All ({selectedTags.size})
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hashtag Grid */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {hashtags.map((tag) => (
              <Card
                key={tag.name}
                className={`cursor-pointer transition-colors border-2 border-border shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)] ${
                  selectedTags.has(tag.name) ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => toggleTag(tag.name)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{tag.name}</p>
                      <p className="text-sm text-muted-foreground">{tag.posts} posts</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPopularityIcon(tag.popularity)}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          copySingleTag(tag.name);
                        }}
                      >
                        {copiedTag === tag.name ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {tag.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {hashtags.length === 0 && (
        <Card className="border-2 border-border">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Hash className="mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground">
              Search for a keyword to find relevant hashtags.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
