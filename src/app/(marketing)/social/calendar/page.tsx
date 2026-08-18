"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import type { SocialPost } from "@/types/social";

const initialPosts: SocialPost[] = [
  { id: "1", content: "Product launch announcement 🚀", platform: "instagram", scheduledDate: "2024-06-15", scheduledTime: "10:00", status: "scheduled", hashtags: ["launch", "new"], createdAt: "2024-06-10" },
  { id: "2", content: "Weekly tips thread", platform: "twitter", scheduledDate: "2024-06-17", scheduledTime: "14:00", status: "scheduled", hashtags: ["tips"], createdAt: "2024-06-10" },
  { id: "3", content: "Team spotlight post", platform: "linkedin", scheduledDate: "2024-06-18", scheduledTime: "09:00", status: "draft", hashtags: ["team", "culture"], createdAt: "2024-06-11" },
  { id: "4", content: "Behind the scenes video", platform: "instagram", scheduledDate: "2024-06-20", scheduledTime: "12:00", status: "scheduled", hashtags: ["bts"], createdAt: "2024-06-12" },
  { id: "5", content: "Industry news share", platform: "facebook", scheduledDate: "2024-06-22", scheduledTime: "16:00", status: "scheduled", hashtags: ["news"], createdAt: "2024-06-12" },
];

const platformColors: Record<string, string> = {
  instagram: "border-l-pink-500",
  twitter: "border-l-sky-500",
  linkedin: "border-l-blue-600",
  facebook: "border-l-blue-500",
  tiktok: "border-l-black",
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [posts] = useState<SocialPost[]>(initialPosts);

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart);
    const calEnd = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentMonth]);

  const getPostsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return posts.filter((p) => p.scheduledDate === dateStr);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
          <p className="text-muted-foreground">Plan and manage your social media content schedule.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Card className="border-2 border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, idx) => {
              const dayPosts = getPostsForDate(day);
              const inMonth = isSameMonth(day, currentMonth);
              const today = isToday(day);

              return (
                <div
                  key={idx}
                  className={`min-h-[100px] rounded-lg border-2 border-border p-1.5 ${
                    inMonth ? "bg-card" : "bg-muted/30"
                  } ${today ? "border-primary ring-1 ring-primary/20" : ""}`}
                >
                  <p className={`text-xs font-medium mb-1 ${inMonth ? "" : "text-muted-foreground"}`}>
                    {format(day, "d")}
                  </p>
                  <div className="space-y-1">
                    {dayPosts.slice(0, 3).map((post) => (
                      <div
                        key={post.id}
                        className={`rounded border-l-2 bg-muted/50 px-1.5 py-0.5 ${platformColors[post.platform] || ""}`}
                      >
                        <p className="truncate text-[10px]">{post.content}</p>
                      </div>
                    ))}
                    {dayPosts.length > 3 && (
                      <p className="text-[10px] text-muted-foreground">+{dayPosts.length - 3} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(platformColors).map(([platform, color]) => (
          <div key={platform} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded border-l-2 ${color}`} />
            <span className="text-xs capitalize text-muted-foreground">{platform}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
