export * from './blog';
export * from './create';
export * from './landing';

// Team page component types
export type DevTeamMemberProps = {
  name: string;
  platform: string;
  imageSrc: string;
  githubId: string;
  index: number;
};

export type TeamKey = "current" | "firstGen";

// Landing page component types
export type CardProps = {
  title: string;
  description: string;
};

export type Card2Props = Record<string, never>;

// Layout component types
export interface NavigationWrapperProps {
  children: React.ReactNode;
}

export interface RouteLayoutConfig {
  overflow?: string;
}

// Skeleton component types
export interface SkeletonProps {
  className?: string;
}

// Loader component types
export interface LoaderProps {
  cursor: { x: number; y: number };
  cardRef: React.RefObject<HTMLElement>;
}
