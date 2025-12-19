import { QueryClient, type DefaultOptions } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    retryDelay: (attemptIndex): number =>
      Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
  },
  mutations: {
    retry: 0,
    onError: (error): void => {
      console.error("Mutation error:", error);
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
}
