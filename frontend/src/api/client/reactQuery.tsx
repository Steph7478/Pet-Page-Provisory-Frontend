"use client";

import {ReactNode, useState} from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {mutationErrorHandler, queryErrorHandler} from "@/utils/errorHandler";

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({children}: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: false,
          },
        },
        mutationCache: new MutationCache({
          onError: mutationErrorHandler,
        }),
        queryCache: new QueryCache({
          onError: queryErrorHandler,
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
