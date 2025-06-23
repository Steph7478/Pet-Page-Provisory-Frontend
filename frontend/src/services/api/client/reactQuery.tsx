"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";
import {refreshAuthToken} from "./refreshToken";

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

export function ReactQueryProvider({children}: ReactQueryProviderProps) {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
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

    client.getQueryCache().subscribe((event) => {
      if (event.type === "updated") {
        const query = event.query;
        if (query.state.status === "error") {
          const error = query.state.error;
          if (error?.response?.status === 401) {
            refreshAuthToken();
          }
        }
      }
    });

    client.getMutationCache().subscribe((event) => {
      if (event.mutation?.state.status === "error") {
        const error = event.mutation.state.error;
        if (error?.response?.status === 401) {
          refreshAuthToken();
        }
      }
    });

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
