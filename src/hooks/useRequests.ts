import { useMutation } from '@tanstack/react-query';
import { apiService } from '../lib/api';

// Hook for creating article requests
export const useCreateArticleRequest = () => {
  
  return useMutation({
    mutationFn: (requestData: any) => apiService.createArticleRequest(requestData),
    onSuccess: () => {
      // Could invalidate related queries if needed
      console.log('Article request created successfully');
    },
    onError: (error) => {
      console.error('Failed to create article request:', error);
    },
  });
}; 