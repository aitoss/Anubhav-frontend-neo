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
  style?: React.CSSProperties;
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
  style,
  ...props
}: NoButtonProps) {
  return (
    <Button
      className={cn("group px-2.5", className)}
      variant={variant}
      disabled={disabled}
      size={size}
      onClick={onClick}
      style={style}
      asChild
      {...props}
    >
      <div className="flex items-center">
        {iconPosition === "left" && icon && (
          <AnimateIcon>{icon}</AnimateIcon>
        )}
        {children}
        {iconPosition === "right" && icon && (
          <AnimateIcon>{icon}</AnimateIcon>
        )}
      </div>
    </Button>
  );
}
