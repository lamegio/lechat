"use client";

import { JSX, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useArticles } from "@/hooks/useArticle";
import FixedFullScreenBackground from "./FixedFullScreenBackground";
import HomeBanner from "./BannerMain";
import HomeScrollDown from "./ScrollDown";
import HomeContainer from "./Container";
import Pagination from "@/components/ui/Pagination";
import type { PaginatedData } from "@/lib/fetcher";
import type { ArticleListItem } from "@/types/article";

interface HomePageClientProps {
  initialPage: number;
  initialPageSize: number;
  initialData: PaginatedData<ArticleListItem>;
}

export default function HomePageClient({
  initialPage,
  initialPageSize,
  initialData,
}: HomePageClientProps): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(initialPage);

  const { data, isLoading } = useArticles({ page, pageSize: initialPageSize });

  const articles = data || initialData;

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/?${params.toString()}`);

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="flex flex-col justify-start">
      <FixedFullScreenBackground />
      <HomeBanner />
      <HomeScrollDown />
      <HomeContainer articles={articles.list} />

      <Pagination
        currentPage={page}
        totalPages={articles.meta.totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </main>
  );
}
