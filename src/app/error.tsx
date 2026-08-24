"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div
        className="card-brutal max-w-lg w-full bg-card p-8 text-center"
        role="alert"
        aria-labelledby="global-error-title"
        aria-describedby="global-error-desc"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg border-2 border-destructive bg-destructive/10 shadow-[3px_3px_0px_1px_var(--color-brutal-shadow)]">
          <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
        </div>

        <h1
          id="global-error-title"
          className="mb-2 text-2xl font-bold tracking-tight"
        >
          Something went wrong
        </h1>

        <p
          id="global-error-desc"
          className="mb-6 text-sm text-muted-foreground"
        >
          An unexpected error occurred. Please try again or contact support if
          the problem persists.
        </p>

        {error.message && (
          <div className="mb-6 rounded-md border-2 border-border bg-muted p-3 text-left text-xs font-mono text-muted-foreground shadow-[2px_2px_0px_1px_var(--color-brutal-shadow)]">
            <span className="font-bold text-foreground">Error: </span>
            {error.message}
          </div>
        )}

        {error.digest && (
          <p className="mb-4 text-[10px] text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        <Button
          onClick={reset}
          variant="default"
          size="lg"
          className="gap-2"
          aria-label="Try again to recover from the error"
        >
          <RefreshCcw className="h-4 w-4" aria-hidden="true" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
