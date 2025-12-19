import useSWR, { type SWRResponse } from "swr";
import { API_KEYS } from "@/lib/api-keys";
import { fetcher } from "@/lib/fetcher";
import type { ArticleDetail } from "@/types/article";

interface UseArticleByIdOptions {
  id: string | null;
  password?: string;
}

interface UseArticleBySlugOptions {
  slug: string | null;
  password?: string;
}

export function useArticleById({
  id,
  password,
}: UseArticleByIdOptions): SWRResponse<ArticleDetail, Error> {
  const key = id ? API_KEYS.articles.byId(id) : null;

  return useSWR<ArticleDetail>(
    key,
    (url: string) =>
      fetcher<ArticleDetail>(url, {
        headers: password
          ? {
              "x-article-password": password,
            }
          : undefined,
      }),
    {
      revalidateOnMount: true,
      dedupingInterval: 10000,
    },
  );
}

export function useArticleBySlug({
  slug,
  password,
}: UseArticleBySlugOptions): SWRResponse<ArticleDetail, Error> {
  const key = slug ? API_KEYS.articles.bySlug(slug) : null;

  return useSWR<ArticleDetail>(
    key,
    (url: string) =>
      fetcher<ArticleDetail>(url, {
        headers: password
          ? {
              "x-article-password": password,
            }
          : undefined,
      }),
    {
      revalidateOnMount: true,
      dedupingInterval: 10000,
    },
  );
}
