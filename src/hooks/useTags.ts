import { useQuery } from '@tanstack/react-query';
import { apiService } from '../lib/api';

// Hook for fetching tags
export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => apiService.getTags(),
    staleTime: 15 * 60 * 1000, // 15 minutes - tags don't change often
  });
}; 