interface FetcherError extends Error {
  info?: unknown;
  status?: number;
}

export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
  error?: string;
  timestamp?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  list: T[];
  meta: PaginationMeta;
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

function handleUnauthorized(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
  window.location.href = "/login";
}

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const fullURL = url.startsWith("http") ? url : `${baseURL}/${url}`;

  const token = getAuthToken();
  const headers = new Headers(options?.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // if (process.env.NODE_ENV === "development") {
  //   console.log("🚀 Fetcher Request:", fullURL);
  // }

  const response = await fetch(fullURL, {
    ...options,
    headers,
  });

  // if (process.env.NODE_ENV === "development") {
  //   console.log("✅ Fetcher Response:", response.status);
  // }

  if (!response.ok) {
    if (response.status === 401) {
      handleUnauthorized();
    }

    const error: FetcherError = new Error(
      "An error occurred while fetching the data.",
    );

    try {
      const errorData = (await response.json()) as ApiResponse;
      error.message = errorData.message || errorData.error || "Request failed";
      error.info = errorData;
    } catch {
      error.message = `HTTP ${response.status}: ${response.statusText}`;
    }

    error.status = response.status;

    if (process.env.NODE_ENV === "development") {
      console.error("❌ Fetcher Error:", error.message);
    }

    throw error;
  }

  const data = (await response.json()) as ApiResponse<T>;

  if (!data.success) {
    throw new Error(data.message || data.error || "Request failed");
  }

  return data.data;
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_token", token);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
}
