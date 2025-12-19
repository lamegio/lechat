import useSWR, { type SWRResponse } from "swr";
import { API_KEYS } from "@/lib/api-keys";
import type { PaginatedData } from "@/lib/fetcher";
import type { ArticleListItem, ArticleListParams } from "@/types/article";

export function useArticles(
  params?: ArticleListParams,
): SWRResponse<PaginatedData<ArticleListItem>, Error> {
  const key = API_KEYS.articles.list(
    params as Record<string, string | number | boolean>,
  );

  return useSWR<PaginatedData<ArticleListItem>>(key, {
    revalidateOnMount: true,
    dedupingInterval: 3000,
  });
}

export function useFeaturedArticles(
  limit?: number,
): SWRResponse<ArticleListItem[], Error> {
  const key = API_KEYS.articles.featured(limit);

  return useSWR<ArticleListItem[]>(key, {
    revalidateOnMount: true,
    dedupingInterval: 5000,
  });
}

export function usePopularArticles(
  limit?: number,
): SWRResponse<ArticleListItem[], Error> {
  const key = API_KEYS.articles.popular(limit);

  return useSWR<ArticleListItem[]>(key, {
    revalidateOnMount: true,
    dedupingInterval: 5000,
  });
}

export function useNewArticles(
  limit?: number,
): SWRResponse<ArticleListItem[], Error> {
  const key = API_KEYS.articles.new(limit);

  return useSWR<ArticleListItem[]>(key, {
    revalidateOnMount: true,
    dedupingInterval: 2000,
  });
}

export function useRelatedArticles(
  id: string | null,
  limit?: number,
): SWRResponse<ArticleListItem[], Error> {
  const key = id ? API_KEYS.articles.related(id, limit) : null;

  return useSWR<ArticleListItem[]>(key, {
    revalidateOnMount: true,
    dedupingInterval: 10000,
  });
}
