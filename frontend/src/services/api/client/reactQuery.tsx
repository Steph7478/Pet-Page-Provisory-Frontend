"use client";

import React, {useState, useRef, useEffect} from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import {refreshAuthToken} from "./refreshToken";
import {AxiosError} from "axios";

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

export function ReactQueryProvider({children}: ReactQueryProviderProps) {
  const queryClientRef = useRef<QueryClient | null>(null);

  const queryCache = new QueryCache({
    onError: async (error: unknown, query) => {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        try {
          await refreshAuthToken();
          if (queryClientRef.current && query.queryKey) {
            await queryClientRef.current.refetchQueries({
              queryKey: query.queryKey,
              type: "active",
            });
          }
        } catch {}
      }
    },
  });

  const mutationCache = new MutationCache({
    onError: async (error: unknown) => {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        try {
          await refreshAuthToken();
        } catch {}
      }
    },
  });

  const [queryClient] = useState(() => {
    return new QueryClient({
      queryCache,
      mutationCache,
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
  });

  useEffect(() => {
    queryClientRef.current = queryClient;
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
