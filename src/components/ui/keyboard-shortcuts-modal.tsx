"use client";

import { useEffect, useCallback } from "react";
import { X, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KeyboardShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

const shortcuts = [
  {
    category: "Navigation",
    items: [
      { keys: ["Ctrl", "K"], description: "Focus search" },
      { keys: ["?"], description: "Show keyboard shortcuts" },
    ],
  },
  {
    category: "Appearance",
    items: [
      { keys: ["Ctrl", "D"], description: "Toggle dark mode" },
    ],
  },
  {
    category: "General",
    items: [
      { keys: ["Esc"], description: "Close modal / dialog" },
    ],
  },
];

function KeyBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-sm border-2 border-border bg-muted px-2 py-0.5 text-xs font-bold shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]">
      {children}
    </span>
  );
}

export function KeyboardShortcutsModal({ open, onClose }: KeyboardShortcutsModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        onClose();
      }
    },
    [open, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
        className="relative z-10 mx-4 w-full max-w-lg rounded-lg border-2 border-border bg-card p-6 shadow-[6px_6px_0px_1px_var(--color-brutal-shadow)] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold uppercase tracking-wider">Keyboard Shortcuts</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Shortcuts Table */}
        <div className="space-y-5">
          {shortcuts.map((group) => (
            <div key={group.category}>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {group.category}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <div
                    key={item.description}
                    className="flex items-center justify-between rounded-md border border-border/50 bg-background/50 px-3 py-2"
                  >
                    <span className="text-sm">{item.description}</span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((key, i) => (
                        <span key={key} className="flex items-center gap-1">
                          {i > 0 && (
                            <span className="text-xs text-muted-foreground">+</span>
                          )}
                          <KeyBadge>{key}</KeyBadge>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Press <KeyBadge>?</KeyBadge> or <KeyBadge>Esc</KeyBadge> to close
        </p>
      </div>
    </div>
  );
}
