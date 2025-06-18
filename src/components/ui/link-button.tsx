'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import AnimateIcon from "./animate-icon";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
}

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
