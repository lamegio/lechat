"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { JSX, type ReactNode, useState } from "react";
import { queryClient } from "@/lib/query-client";

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({
  children,
}: QueryProviderProps): JSX.Element {
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}
