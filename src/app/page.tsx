import Link from "next/link";
import {
  PenTool,
  BarChart3,
  Share2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const modules = [
  {
    title: "Content & Copywriting AI",
    description:
      "Generate compelling copy, optimize for SEO, and brainstorm content ideas with AI assistance.",
    href: "/content",
    icon: <PenTool className="h-6 w-6" />,
    color: "text-[#4a6741]",
    bgColor: "bg-[#6b8f71]/15",
    features: ["AI Copywriting", "SEO Optimizer", "Content Ideas"],
  },
  {
    title: "Analytics & Reporting",
    description:
      "Track campaign performance, build UTM links, calculate ROI, and generate reports.",
    href: "/analytics",
    icon: <BarChart3 className="h-6 w-6" />,
    color: "text-[#7b9bab]",
    bgColor: "bg-[#7b9bab]/15",
    features: ["Campaign Dashboard", "UTM Builder", "ROI Calculator"],
  },
  {
    title: "Social Media Management",
    description:
      "Plan content calendars, schedule posts, research hashtags, and manage your social presence.",
    href: "/social",
    icon: <Share2 className="h-6 w-6" />,
    color: "text-[#c49a6c]",
    bgColor: "bg-[#c49a6c]/15",
    features: ["Content Calendar", "Post Scheduler", "Hashtag Research"],
  },
];

const stats = [
  { label: "Content Generated", value: "1,234", icon: <Sparkles className="h-4 w-4" /> },
  { label: "Campaigns Tracked", value: "56", icon: <TrendingUp className="h-4 w-4" /> },
  { label: "Posts Scheduled", value: "89", icon: <Users className="h-4 w-4" /> },
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to MarketingHub. Your all-in-one marketing toolkit.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-border bg-primary/10 font-bold text-primary shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">Tools</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {modules.map((mod) => (
            <Link key={mod.href} href={mod.href}>
              <Card className="group h-full">
                <CardHeader>
                  <div
                    className={`mb-2 flex h-12 w-12 items-center justify-center rounded-md border-2 border-border ${mod.bgColor} ${mod.color} shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]`}
                  >
                    {mod.icon}
                  </div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {mod.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>{mod.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mod.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-sm border-[1.5px] border-border bg-muted px-2 py-0.5 text-xs font-semibold shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
