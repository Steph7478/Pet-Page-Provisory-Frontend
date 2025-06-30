import {mutationErrorHandler, queryErrorHandler} from "@/utils/errorHandler";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {ReactNode} from "react";

interface ReactQueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
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
});

export function ReactQueryProvider({children}: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
