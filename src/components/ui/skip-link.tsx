"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function SkipLink() {
  const [focused, setFocused] = useState(false);

  return (
    <a
      href="#main-content"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={cn(
        "fixed left-4 top-4 z-[9999] rounded-md border-2 border-border bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)] transition-transform",
        focused
          ? "translate-y-0 opacity-100"
          : "-translate-y-[120%] opacity-0"
      )}
    >
      Skip to main content
    </a>
  );
}
