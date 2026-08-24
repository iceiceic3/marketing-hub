"use client";

import { useEffect, useCallback, useRef } from "react";

type ShortcutHandler = (e: KeyboardEvent) => void;

interface ShortcutRegistration {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  handler: ShortcutHandler;
  description: string;
}

interface UseKeyboardShortcutsReturn {
  registerShortcut: (registration: ShortcutRegistration) => () => void;
}

/**
 * Custom hook that registers global keyboard shortcuts.
 *
 * Detects Ctrl (Windows/Linux) or Cmd (macOS) via the metaKey property,
 * so shortcuts work cross-platform without the caller needing to worry
 * about which modifier key to use.
 */
export function useKeyboardShortcuts(): UseKeyboardShortcutsReturn {
  const shortcutsRef = useRef<Map<string, ShortcutRegistration>>(new Map());

  const registerShortcut = useCallback(
    (registration: ShortcutRegistration): (() => void) => {
      const id = `${registration.ctrlKey || registration.metaKey ? "mod+" : ""}${registration.key}`;
      shortcutsRef.current.set(id, registration);

      return () => {
        shortcutsRef.current.delete(id);
      };
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const [, shortcut] of shortcutsRef.current) {
        const ctrlOrMeta =
          shortcut.ctrlKey || shortcut.metaKey
            ? e.ctrlKey || e.metaKey
            : true;

        const shiftMatch = shortcut.shiftKey ? e.shiftKey : true;
        const altMatch = shortcut.altKey ? e.altKey : true;
        const keyMatch =
          e.key.toLowerCase() === shortcut.key.toLowerCase() ||
          e.code.toLowerCase() === shortcut.key.toLowerCase();

        if (keyMatch && ctrlOrMeta && shiftMatch && altMatch) {
          e.preventDefault();
          shortcut.handler(e);
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { registerShortcut };
}

/**
 * Helper: check if the currently focused element is an input, textarea,
 * or contenteditable so we can avoid firing shortcuts while typing.
 */
export function isInputFocused(): boolean {
  const el = document.activeElement;
  if (!el) return false;

  const tag = el.tagName.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    (el as HTMLElement).isContentEditable === true
  );
}
