import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Send, Hash, TrendingUp } from "lucide-react";

const stats = [
  { label: "Scheduled Posts", value: "12", icon: <Calendar className="h-4 w-4" />, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Published This Week", value: "8", icon: <Send className="h-4 w-4" />, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Avg Engagement", value: "4.2%", icon: <TrendingUp className="h-4 w-4" />, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Hashtag Groups", value: "6", icon: <Hash className="h-4 w-4" />, color: "text-orange-500", bg: "bg-orange-500/10" },
];

const upcomingPosts = [
  { platform: "instagram", content: "Check out our latest product launch! 🚀", date: "Today, 2:00 PM", status: "scheduled" as const },
  { platform: "twitter", content: "5 tips for growing your business in 2024...", date: "Today, 5:30 PM", status: "scheduled" as const },
  { platform: "linkedin", content: "We're excited to announce our new partnership...", date: "Tomorrow, 9:00 AM", status: "draft" as const },
  { platform: "facebook", content: "Join us for our upcoming webinar on marketing trends", date: "Tomorrow, 1:00 PM", status: "scheduled" as const },
  { platform: "instagram", content: "Behind the scenes at our office 📸", date: "Wed, 12:00 PM", status: "draft" as const },
];

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500",
  twitter: "bg-sky-500",
  linkedin: "bg-blue-600",
  facebook: "bg-blue-500",
  tiktok: "bg-black",
};

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Media Management</h1>
        <p className="text-muted-foreground">
          Manage your social media presence across all platforms.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-2 border-border shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Posts */}
      <Card className="border-2 border-border">
        <CardHeader>
          <CardTitle>Upcoming Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingPosts.map((post, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border-2 border-border p-3 shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)]">
                <div className={`h-2 w-2 rounded-full ${platformColors[post.platform]}`} />
                <div className="flex-1">
                  <p className="text-sm">{post.content}</p>
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                </div>
                <Badge variant={post.status === "scheduled" ? "default" : "secondary"}>
                  {post.status}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {post.platform}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
