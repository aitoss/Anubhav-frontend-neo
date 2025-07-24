// types/logo.types.ts
import { RefObject } from "react";
import { ReactNode } from "react";

export interface ViewBlogProps {
    params: {
    id: string;
  };
}

export interface ArticleAuthor {
    name: string;
  }
  
export interface Article {
    _id: string;
    title: string;
    imageUrl: string;
    author?: ArticleAuthor;
    companyName?: string;
    description: string;
    createdAt: string;
  }
  
export interface ArticlesProps {
    similarArticles: Article[];
  }

export interface BlogCardProps {
    id: string;
    link: string;
    Title: string;
    imagesrc: string | { src: string };
    author: string;
    company: string;
    description?: string;
    readingTime: number;
    date: string;
  }

export interface DragAndDropImageUploadProps {
    file: File | null;
    setFile: (file: File | null) => void;
    setbannerImage: (image: string | ArrayBuffer | null) => void;
  }
  

export interface LogoProps {
  cursor: { x: number; y: number };
  cardRef: RefObject<HTMLElement>;
}

export interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export interface ButtonV5Props {
  title?: string;
  color?: string;
  icon?: boolean;
  textColor?: string;
  disabled?: boolean;
  borderRadius?: string;
  children?: React.ReactNode;
}

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