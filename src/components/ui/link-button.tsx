'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LinkButtonProps } from "@/types/ui";
import Link from "next/link";
import AnimateIcon from "./animate-icon";

export function LinkButton({
  href,
  children,
  icon,
  iconPosition = "right",
  className,
  variant = "default",
  size = "default",
}: LinkButtonProps) {
  return (
    <Link href={href}>
      <Button
        className={cn("group px-2.5", className)}
        variant={variant}
        size={size}
        asChild
      >
        <span className="flex items-center">
          {iconPosition === "left" && icon && (
            <AnimateIcon>{icon}</AnimateIcon>
          )}
          {children}
          {iconPosition === "right" && icon && (
            <AnimateIcon>{icon}</AnimateIcon>
          )}
        </span>
      </Button>
    </Link>
  );
}
