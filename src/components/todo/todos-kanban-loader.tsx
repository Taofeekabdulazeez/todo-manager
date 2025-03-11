import type * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function TodosKanbanLoader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="grid grid-cols-3 w-full gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 3 }).map((_, columnIndex) => (
          <ColumnLoader key={columnIndex} />
        ))}
      </div>
    </div>
  );
}

function ColumnLoader() {
  return (
    <div className="flex h-full shrink-0 flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="flex flex-col gap-2 p-2">
        {Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map(
          (_, cardIndex) => (
            <CardLoader key={cardIndex} />
          )
        )}
      </div>
    </div>
  );
}

function CardLoader() {
  return (
    <div className="rounded-md border bg-background p-3 shadow-sm">
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
    </div>
  );
}
