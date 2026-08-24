"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchCommandProps {
  /** Current search value (controlled). */
  value?: string;
  /** Called when the debounced value changes. */
  onChange?: (value: string) => void;
  /** Placeholder text shown inside the input. */
  placeholder?: string;
  /** Debounce delay in ms. Defaults to 300. */
  debounceMs?: number;
  /** Additional CSS classes on the outer wrapper. */
  className?: string;
  /** Whether to show a clear button when there is text. */
  showClear?: boolean;
}

/**
 * Reusable debounced search/filter input with neo-brutalism styling.
 *
 * Usage example:
 *
 * ```tsx
 * const [query, setQuery] = useState("");
 * const filtered = items.filter(i => i.name.includes(query));
 *
 * <SearchCommand value={query} onChange={setQuery} placeholder="Filter..." />
 * ```
 */
export function SearchCommand({
  value: controlledValue,
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
  className,
  showClear = true,
}: SearchCommandProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(controlledValue ?? "");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep internal state in sync when controlled
  useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
    }
  }, [isControlled, controlledValue]);

  const triggerChange = useCallback(
    (val: string) => {
      if (onChange) {
        onChange(val);
      }
    },
    [onChange]
  );

  const handleChange = (val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      triggerChange(val);
    }, debounceMs);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    triggerChange("");
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={internalValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />
      {showClear && internalValue.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
