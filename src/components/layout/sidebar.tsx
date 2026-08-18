"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  PenTool,
  BarChart3,
  Share2,
  LayoutDashboard,
  Sparkles,
  Search,
  Lightbulb,
  LinkIcon,
  Calculator,
  FileText,
  Calendar,
  Send,
  Hash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/", icon: <LayoutDashboard className="h-4 w-4" /> },
    ],
  },
  {
    title: "Content & Copywriting AI",
    items: [
      { label: "Overview", href: "/content", icon: <PenTool className="h-4 w-4" /> },
      { label: "Copywriting", href: "/content/copywriting", icon: <Sparkles className="h-4 w-4" /> },
      { label: "SEO Optimizer", href: "/content/seo", icon: <Search className="h-4 w-4" /> },
      { label: "Content Ideas", href: "/content/ideas", icon: <Lightbulb className="h-4 w-4" /> },
    ],
  },
  {
    title: "Analytics & Reporting",
    items: [
      { label: "Overview", href: "/analytics", icon: <BarChart3 className="h-4 w-4" /> },
      { label: "UTM Builder", href: "/analytics/utm", icon: <LinkIcon className="h-4 w-4" /> },
      { label: "ROI Calculator", href: "/analytics/roi", icon: <Calculator className="h-4 w-4" /> },
      { label: "Reports", href: "/analytics/reports", icon: <FileText className="h-4 w-4" /> },
    ],
  },
  {
    title: "Social Media",
    items: [
      { label: "Overview", href: "/social", icon: <Share2 className="h-4 w-4" /> },
      { label: "Calendar", href: "/social/calendar", icon: <Calendar className="h-4 w-4" /> },
      { label: "Scheduler", href: "/social/scheduler", icon: <Send className="h-4 w-4" /> },
      { label: "Hashtags", href: "/social/hashtags", icon: <Hash className="h-4 w-4" /> },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r-2 border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center justify-between border-b-2 border-border px-4">
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight">⬡ MarketingHub</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 shadow-none hover:shadow-none"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {navGroups.map((group, idx) => (
          <div key={group.title} className="mb-3">
            {idx > 0 && <Separator className="my-3" />}
            {!collapsed && (
              <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {group.title}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md border-2 border-transparent px-2.5 py-2 text-sm font-semibold transition-all hover:border-border hover:shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]",
                      pathname === item.href
                        ? "border-border bg-primary text-primary-foreground shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)]"
                        : "text-muted-foreground hover:text-foreground",
                      collapsed && "justify-center px-0"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t-2 border-border p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">v1.0</p>
        </div>
      )}
    </aside>
  );
}
