"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[MarketingError]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div
        className="card-brutal max-w-md w-full bg-card p-8 text-center"
        role="alert"
        aria-labelledby="marketing-error-title"
        aria-describedby="marketing-error-desc"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-brutal-clay bg-brutal-clay/10 shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)]">
          <AlertTriangle className="h-7 w-7 text-brutal-clay" aria-hidden="true" />
        </div>

        <h2
          id="marketing-error-title"
          className="mb-2 text-xl font-bold tracking-tight"
        >
          Section Error
        </h2>

        <p
          id="marketing-error-desc"
          className="mb-6 text-sm text-muted-foreground"
        >
          This marketing section encountered an error. You can try reloading it
          or go back to the dashboard.
        </p>

        {error.message && (
          <div className="mb-6 rounded-md border-2 border-border bg-muted p-3 text-left text-xs font-mono text-muted-foreground shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]">
            <span className="font-bold text-foreground">Details: </span>
            {error.message}
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <Link href="/">
            <Button variant="outline" size="default" className="gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Button>
          </Link>
          <Button
            onClick={reset}
            variant="default"
            size="default"
            className="gap-2"
            aria-label="Try again to reload this section"
          >
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
