import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { apiService } from '../lib/api';

// Hook for searching blogs
export const useSearchBlogs = (query: string, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['search', query, page, limit],
    queryFn: () => apiService.searchBlogs(query, page, limit),
    enabled: !!query && query.trim().length > 0,
    staleTime: 1 * 60 * 1000, // 1 minute for search results
  });
};

// Hook for infinite scroll search results
export const useInfiniteSearch = (query: string, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['search', 'infinite', query],
    queryFn: ({ pageParam = 1 }) => apiService.searchBlogs(query, pageParam, limit),
    getNextPageParam: (lastPage) => {
      return lastPage.articles.length === limit ? (lastPage.currentPage || 0) + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!query && query.trim().length > 0,
    staleTime: 1 * 60 * 1000,
  });
};

// Hook for getting similar blogs (for search suggestions)
export const useSimilarBlogs = (params?: { q?: string; company?: string; tags?: string; blogId?: string }) => {
  return useQuery({
    queryKey: ['similar-blogs', params],
    queryFn: () => apiService.getSimilarBlogs(params),
    enabled: !!(params?.q || params?.blogId),
    staleTime: 5 * 60 * 1000, // 5 minutes for suggestions
  });
}; 