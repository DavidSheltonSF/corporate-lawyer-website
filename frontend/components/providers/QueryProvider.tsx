'use client';
import { UnauthorizedError } from '@/errors/UnauthorizedError';
import { handleLogout } from '@/lib/handleLogout';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

export function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onError: (error) => {
            if (error instanceof UnauthorizedError) {
              handleLogout();
            }
          },
        }),
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof UnauthorizedError) {
              handleLogout();
            }
          },
        }),
        defaultOptions: {
          queries: {
            retry: 1,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
