import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../lib/api';

// Hook for fetching blogs with pagination
export const useBlogs = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['blogs', page, limit],
    queryFn: () => apiService.getBlogs(page, limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook for fetching latest blogs
export const useLatestBlogs = () => {
  return useQuery({
    queryKey: ['blogs', 'latest'],
    queryFn: () => apiService.getLatestBlogs(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for infinite scroll blogs
export const useInfiniteBlogs = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['blogs', 'infinite'],
    queryFn: ({ pageParam = 1 }) => apiService.getBlogs(pageParam, limit),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage || (lastPage.currentPage || 0) + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000,
  });
};

// Hook for fetching a single blog by ID
export const useBlogById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => apiService.getBlogById(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes for individual blogs
  });
};

// Hook for creating a new blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (blogData: any) => apiService.createBlog(blogData),
    onSuccess: () => {
      // Invalidate and refetch blogs queries
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      console.error('Failed to create blog:', error);
    },
  });
}; 