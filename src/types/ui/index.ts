import { ReactNode } from "react";
import { type UseInViewOptions } from "motion/react";

// Button component types
export interface LinkButtonProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
}

export interface NoButtonProps {
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

// Animation component types
export type MarginType = UseInViewOptions["margin"];

export interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
  preservePosition?: boolean;
}

// Wrapper component types
export interface FadeWrapperProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export interface MaskWrapperProps {
  children: ReactNode;
  className?: string;
}

export interface MaskTextProps {
  textPhrase: string[];
}

// Badge component types
export interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

// Query provider types
export interface QueryProviderProps {
  children: ReactNode;
}
