import { ArrowPathIcon } from "@heroicons/react/24/solid";
import type React from "react";
import { cn } from "@workspace/ui/lib/utils";

export function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof ArrowPathIcon>): React.ReactElement {
  return (
    <ArrowPathIcon
      aria-label="Loading"
      // Without a size the svg stretches to whatever box it lands in, which
      // turned every bare <Spinner /> into a full-page arrow.
      className={cn("size-4 shrink-0 animate-spin", className)}
      role="status"
      {...props}
    />
  );
}
