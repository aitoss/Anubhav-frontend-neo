import { useQuery } from '@tanstack/react-query';
import { apiService } from '../lib/api';

// Hook for fetching companies count
export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies', 'count'],
    queryFn: () => apiService.getCompanies(),
    staleTime: 10 * 60 * 1000, // 10 minutes - companies don't change often
  });
};

// Hook for fetching all companies
export const useAllCompanies = () => {
  return useQuery({
    queryKey: ['companies', 'all'],
    queryFn: () => apiService.getAllCompanies(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}; 