"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LinkIcon, Copy, Check, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface UtmLink {
  id: string;
  url: string;
  utmUrl: string;
  source: string;
  medium: string;
  campaign: string;
  createdAt: string;
}

const presets = [
  { label: "Instagram Bio", source: "instagram", medium: "social", campaign: "ig-bio" },
  { label: "Facebook Ad", source: "facebook", medium: "cpc", campaign: "fb-ad" },
  { label: "Google Ads", source: "google", medium: "cpc", campaign: "gads" },
  { label: "Newsletter", source: "newsletter", medium: "email", campaign: "newsletter" },
  { label: "Twitter Post", source: "twitter", medium: "social", campaign: "tweet" },
];

export default function UtmPage() {
  const { toast } = useToast();
  const [baseUrl, setBaseUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [links, setLinks] = useState<UtmLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const buildUtmUrl = () => {
    if (!baseUrl || !source || !medium || !campaign) return "";
    const params = new URLSearchParams();
    params.set("utm_source", source);
    params.set("utm_medium", medium);
    params.set("utm_campaign", campaign);
    if (term) params.set("utm_term", term);
    if (content) params.set("utm_content", content);
    return `${baseUrl}?${params.toString()}`;
  };

  const saveLink = () => {
    const utmUrl = buildUtmUrl();
    if (!utmUrl) return;
    const newLink: UtmLink = {
      id: Date.now().toString(),
      url: baseUrl,
      utmUrl,
      source,
      medium,
      campaign,
      createdAt: new Date().toISOString(),
    };
    setLinks((prev) => [newLink, ...prev]);
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
    toast({ title: "UTM link saved!", variant: "success" });
  };

  const applyPreset = (preset: (typeof presets)[0]) => {
    setSource(preset.source);
    setMedium(preset.medium);
    setCampaign(preset.campaign);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "Link copied!", variant: "success" });
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const utmUrl = buildUtmUrl();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">UTM Builder</h1>
        <p className="text-muted-foreground">
          Create trackable URLs with UTM parameters for your campaigns.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Builder */}
        <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Build UTM Link
            </CardTitle>
            <CardDescription>Fill in the fields to generate a UTM-tagged URL.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseUrl">Website URL *</Label>
              <Input
                id="baseUrl"
                placeholder="https://example.com/landing-page"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <Label>Quick Presets</Label>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <Badge
                    key={preset.label}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]"
                    onClick={() => applyPreset(preset)}
                  >
                    {preset.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">UTM Source *</Label>
                <Input
                  id="source"
                  placeholder="e.g., google, facebook"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medium">UTM Medium *</Label>
                <Input
                  id="medium"
                  placeholder="e.g., cpc, social, email"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign">UTM Campaign *</Label>
              <Input
                id="campaign"
                placeholder="e.g., spring-sale-2024"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="term">UTM Term (optional)</Label>
                <Input
                  id="term"
                  placeholder="e.g., running shoes"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">UTM Content (optional)</Label>
                <Input
                  id="content"
                  placeholder="e.g., banner-top"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>

            {/* Preview */}
            {utmUrl && (
              <div className="rounded-lg border-2 border-border bg-muted p-3">
                <p className="text-xs text-muted-foreground mb-1">Generated URL:</p>
                <p className="break-all text-sm font-mono">{utmUrl}</p>
              </div>
            )}

            <Button onClick={saveLink} disabled={!utmUrl} className="w-full">
              Save Link
            </Button>
          </CardContent>
        </Card>

        {/* Saved Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider">Saved Links ({links.length})</h2>
          {links.length === 0 ? (
            <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <LinkIcon className="mb-4 h-12 w-12 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  Your UTM links will appear here after you save them.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {links.map((link) => (
                <Card key={link.id} className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]">{link.source}</Badge>
                        <Badge variant="outline" className="shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]">{link.medium}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(link.utmUrl, link.id)}
                        >
                          {copiedId === link.id ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteLink(link.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="mb-1 text-xs text-muted-foreground">{link.url}</p>
                    <p className="break-all font-mono text-xs">{link.utmUrl}</p>
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
