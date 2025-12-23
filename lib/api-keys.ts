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

  config: {
    public: (category?: string): string =>
      `config${category ? `?category=${category}` : ""}`,
    publicByKey: (key: string): string => `config/${key}`,
  },

  friends: {
    list: (category?: string): string =>
      `friends${category ? `?category=${category}` : ""}`,
  },

  moments: {
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
      return `moment/list${query ? `?${query}` : ""}`;
    },
    byId: (id: string): string => `moment/${id}`,
    like: (id: string): string => `moment/${id}/like`,
    unlike: (id: string): string => `moment/${id}/unlike`,
  },

  comments: {
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
      return `comment/list${query ? `?${query}` : ""}`;
    },
    byId: (id: string): string => `comment/${id}`,
    create: "comment/create",
    like: (id: string): string => `comment/${id}/like`,
    unlike: (id: string): string => `comment/${id}/unlike`,
    delete: (id: string): string => `comment/${id}`,
  },
} as const;
