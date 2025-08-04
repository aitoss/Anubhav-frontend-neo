import { type LucideIcon } from "lucide-react";

// Editor selector types
export type SelectorItem = {
  name: string;
  icon: LucideIcon;
  command: (editor: any) => void;
  isActive: (editor: any) => boolean;
};

export interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface LinkSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Color selector types
export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

export interface ColorSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
