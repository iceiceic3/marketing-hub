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
import { Send, Calendar, Clock, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import type { SocialPost, SocialPlatform } from "@/types/social";

const platforms: { value: SocialPlatform; label: string; color: string }[] = [
  { value: "instagram", label: "Instagram", color: "bg-pink-500" },
  { value: "twitter", label: "Twitter / X", color: "bg-sky-500" },
  { value: "linkedin", label: "LinkedIn", color: "bg-blue-600" },
  { value: "facebook", label: "Facebook", color: "bg-blue-500" },
  { value: "tiktok", label: "TikTok", color: "bg-black" },
];

const bestTimes: Record<SocialPlatform, string[]> = {
  instagram: ["9:00 AM", "12:00 PM", "5:00 PM", "7:00 PM"],
  twitter: ["8:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"],
  linkedin: ["7:30 AM", "10:00 AM", "12:00 PM", "5:00 PM"],
  facebook: ["9:00 AM", "1:00 PM", "3:00 PM"],
  tiktok: ["7:00 AM", "12:00 PM", "7:00 PM", "9:00 PM"],
};

export default function SchedulerPage() {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState<SocialPlatform>("instagram");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  const schedulePost = () => {
    if (!content || !date || !time) return;
    const newPost: SocialPost = {
      id: Date.now().toString(),
      content,
      platform,
      scheduledDate: date,
      scheduledTime: time,
      status: "scheduled",
      hashtags: [],
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
    setContent("");
    setDate("");
    setTime("");
    toast({ title: "Post scheduled!", description: `Scheduled for ${date} at ${time}.`, variant: "success" });
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Post removed", variant: "default" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Post Scheduler</h1>
        <p className="text-muted-foreground">
          Create and schedule social media posts across platforms.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Create Post */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Create Post
            </CardTitle>
            <CardDescription>Write your content and schedule it for posting.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Platform *</Label>
              <Select value={platform} onValueChange={(v) => setPlatform(v as SocialPlatform)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${p.color}`} />
                        {p.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Post Content *</Label>
              <Textarea
                id="content"
                placeholder="What do you want to share?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">{content.length} characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  <Calendar className="mr-1 inline h-3 w-3" />
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">
                  <Clock className="mr-1 inline h-3 w-3" />
                  Time *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            {/* Best times */}
            <div className="rounded-lg bg-muted p-3">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Best times to post on {platforms.find((p) => p.value === platform)?.label}:
              </p>
              <div className="flex flex-wrap gap-2">
                {bestTimes[platform].map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="cursor-pointer text-xs hover:bg-accent"
                    onClick={() => setTime(t.toLowerCase().replace(/\s/g, ""))}
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <Button onClick={schedulePost} disabled={!content || !date || !time} className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
          </CardContent>
        </Card>

        {/* Scheduled Posts */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider">Scheduled Posts ({posts.length})</h2>
          {posts.length === 0 ? (
            <Card className="border-2 border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Send className="mb-4 h-12 w-12 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  Your scheduled posts will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <Card key={post.id} className="border-2 border-border shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)]">
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${platforms.find((p) => p.value === post.platform)?.color}`} />
                        <Badge variant="outline" className="capitalize">
                          {post.platform}
                        </Badge>
                        <Badge variant="secondary">{post.status}</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deletePost(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mb-2 text-sm">{post.content}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.scheduledDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.scheduledTime}
                      </span>
                    </div>
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
