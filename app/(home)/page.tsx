import { fetcher, type PaginatedData } from "@/lib/fetcher";
import { API_KEYS } from "@/lib/api-keys";
import type { ArticleListItem } from "@/types/article";
import HomePageClient from "@/components/features/home/HomePageClient";

interface HomeProps {
  searchParams: {
    page?: string;
    pageSize?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 4;

  // 服务端预取当前页数据
  const articles = await fetcher<PaginatedData<ArticleListItem>>(
    API_KEYS.articles.list({ page, pageSize }),
  );

  return (
    <HomePageClient
      initialPage={page}
      initialPageSize={pageSize}
      initialData={articles}
    />
  );
}
