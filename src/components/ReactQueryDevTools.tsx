'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ReactQueryDevTools = () => {
  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <ReactQueryDevtools initialIsOpen={false} />;
};

export default ReactQueryDevTools; 