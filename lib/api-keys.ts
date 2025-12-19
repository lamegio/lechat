export const API_KEYS = {
  articles: {
    list: (params?: Record<string, string | number | boolean>): string => {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });
      }
      const query = searchParams.toString();
      return `article/list${query ? `?${query}` : ""}`;
    },
    byId: (id: string): string => `article/${id}`,
    bySlug: (slug: string): string => `article/slug/${slug}`,
    featured: (limit?: number): string =>
      `article/featured/list${limit ? `?limit=${limit}` : ""}`,
    popular: (limit?: number): string =>
      `article/popular/list${limit ? `?limit=${limit}` : ""}`,
    new: (limit?: number): string =>
      `article/new/list${limit ? `?limit=${limit}` : ""}`,
    related: (id: string, limit?: number): string =>
      `article/${id}/related${limit ? `?limit=${limit}` : ""}`,
  },
  auth: {
    github: "auth/github",
    google: "auth/google",
    me: "auth/me",
  },
} as const;
