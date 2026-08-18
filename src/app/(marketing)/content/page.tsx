import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Search, Lightbulb, ArrowRight } from "lucide-react";

const tools = [
  {
    title: "AI Copywriting",
    description: "Generate compelling marketing copy for any platform with AI. Choose your tone, audience, and platform.",
    href: "/content/copywriting",
    icon: <Sparkles className="h-6 w-6" />,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "SEO Content Optimizer",
    description: "Analyze your content for SEO performance. Get keyword density, readability scores, and improvement suggestions.",
    href: "/content/seo",
    icon: <Search className="h-6 w-6" />,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Content Ideation",
    description: "Generate content ideas, pillar topics, and calendar suggestions based on your industry and audience.",
    href: "/content/ideas",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
];

export default function ContentPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content & Copywriting AI</h1>
        <p className="text-muted-foreground">
          Create better content faster with AI-powered tools.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="group h-full border-2 border-border transition-colors hover:border-primary/50 hover:shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
              <CardHeader>
                <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-lg ${tool.bgColor} ${tool.color}`}>
                  {tool.icon}
                </div>
                <CardTitle className="flex items-center gap-2">
                  {tool.title}
                  <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
