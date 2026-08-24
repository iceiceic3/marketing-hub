"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { KeyboardShortcutsModal } from "@/components/ui/keyboard-shortcuts-modal";
import { useKeyboardShortcuts, isInputFocused } from "@/hooks/use-keyboard-shortcuts";

interface KeyboardShortcutsProviderProps {
  children: React.ReactNode;
}

export function KeyboardShortcutsProvider({ children }: KeyboardShortcutsProviderProps) {
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { registerShortcut } = useKeyboardShortcuts();

  // Register Ctrl/Cmd + D for dark mode toggle
  useEffect(() => {
    const unsub = registerShortcut({
      key: "d",
      ctrlKey: true,
      description: "Toggle dark mode",
      handler: () => {
        setTheme(theme === "dark" ? "light" : "dark");
      },
    });
    return unsub;
  }, [registerShortcut, theme, setTheme]);

  // Register Ctrl/Cmd + K for focus search (placeholder - focuses first input on page)
  useEffect(() => {
    const unsub = registerShortcut({
      key: "k",
      ctrlKey: true,
      description: "Focus search",
      handler: () => {
        const searchInput =
          document.querySelector<HTMLInputElement>('[type="search"]') ||
          document.querySelector<HTMLInputElement>('input[placeholder*="Search"]') ||
          document.querySelector<HTMLInputElement>('input[placeholder*="search"]');
        if (searchInput) {
          searchInput.focus();
        }
      },
    });
    return unsub;
  }, [registerShortcut]);

  // Register ? for shortcuts modal (only when not in an input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !isInputFocused()) {
        e.preventDefault();
        setShortcutsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Escape closes the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && shortcutsOpen) {
        e.preventDefault();
        setShortcutsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcutsOpen]);

  return (
    <>
      {children}
      <KeyboardShortcutsModal
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </>
  );
}
