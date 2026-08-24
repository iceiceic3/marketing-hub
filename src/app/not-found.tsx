import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div
        className="card-brutal max-w-lg w-full bg-card p-8 text-center"
        role="status"
        aria-labelledby="notfound-title"
        aria-describedby="notfound-desc"
      >
        {/* Illustration / Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-xl border-2 border-border bg-brutal-lavender/15 shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
          <span
            className="select-none text-5xl font-black tracking-tighter text-brutal-lavender"
            aria-hidden="true"
          >
            404
          </span>
        </div>

        <h1
          id="notfound-title"
          className="mb-2 text-3xl font-black tracking-tight"
        >
          Page Not Found
        </h1>

        <p
          id="notfound-desc"
          className="mb-8 text-sm text-muted-foreground max-w-sm mx-auto"
        >
          Oops! The page you are looking for does not exist or has been moved.
          Let us get you back on track.
        </p>

        <Link href="/" aria-label="Return to dashboard">
          <Button variant="default" size="lg" className="gap-2">
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
