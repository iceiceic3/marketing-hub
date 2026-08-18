import { Card, CardContent } from "@/components/ui/card";

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
      <CardContent className="p-6">
        <div
          className="w-full animate-pulse rounded-md bg-muted"
          style={{ height }}
        />
      </CardContent>
    </Card>
  );
}

export function KpiSkeleton() {
  return (
    <Card className="border-2 border-border shadow-[4px_4px_0px_1px_var(--color-brutal-shadow)]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="mt-2">
          <div className="h-8 w-20 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
