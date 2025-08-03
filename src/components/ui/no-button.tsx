'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import AnimateIcon from "./animate-icon";

interface NoButtonProps {
  children: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
}

export function NoButton({
  children,
  disabled,
  icon,
  onClick,
  iconPosition = "right",
  className,
  variant = "default",
  size = "default",
}: NoButtonProps) {
  return (
    <Button
      className={cn("group px-2.5", className)}
      variant={variant}
      disabled={disabled}
      size={size}
      onClick={onClick}
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
  );
}
