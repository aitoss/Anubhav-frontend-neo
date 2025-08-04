'use client';

import { QueryProviderProps } from "@/types/ui";
import { QueryClientProvider } from '@tanstack/react-query';
import ReactQueryDevTools from '../components/ReactQueryDevTools';
import { queryClient } from '../lib/queryClient';

const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevTools />
    </QueryClientProvider>
  );
};

export default QueryProvider; 