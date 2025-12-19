"use client";

import { SWRConfig, type SWRConfiguration } from "swr";
import { JSX, type ReactNode } from "react";
import { fetcher } from "@/lib/fetcher";

interface SWRProviderProps {
  children: ReactNode;
  fallback?: Record<string, unknown>;
}

const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: true,
  errorRetryCount: 2,
  errorRetryInterval: 5000,
  dedupingInterval: 2000,
  onError: (error): void => {
    console.error("SWR Error:", error);
  },
};

export default function SWRProvider({
  children,
  fallback,
}: SWRProviderProps): JSX.Element {
  return <SWRConfig value={{ ...swrConfig, fallback }}>{children}</SWRConfig>;
}
