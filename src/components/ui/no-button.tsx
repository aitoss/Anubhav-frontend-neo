'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NoButtonProps } from "@/types/ui";
import AnimateIcon from "./animate-icon";

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
