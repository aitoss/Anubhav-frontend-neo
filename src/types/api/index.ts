import { AxiosResponse } from 'axios';

// Generic API response types
export type ApiResponse<T = any> = AxiosResponse<T>;
export type ApiError = any;

// Blog related types
export interface Blog {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  author?: {
    name: string;
  };
  companyName: string;
  createdAt: string;
  tags?: string[];
}

export interface BlogsResponse {
  articles: Blog[];
  totalArticles: number;
  hasMore: boolean;
}

export interface SearchBlogsParams {
  q?: string;
  company?: string;
  tags?: string;
  blogId?: string;
}

// Company related types
export interface Company {
  _id: string;
  name: string;
  count: number;
}

export interface CompaniesResponse {
  data: Company[];
}

// Tag related types
export interface Tag {
  _id: string;
  name: string;
}

// Request related types
export interface ArticleRequestData {
  name: string;
  email: string;
  company: string;
  position: string;
  message?: string;
}
