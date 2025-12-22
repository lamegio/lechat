"use client";

import { useState } from "react";
import type { PaginatedData } from "@/lib/fetcher";
import type { MomentItem } from "@/types/moment";
import { useMoments } from "@/hooks/useMoment";
import MomentCard from "./MomentCard";
import LoadMoreButton from "./LoadMoreButton";

interface MomentPageClientProps {
  initialData: PaginatedData<MomentItem>;
}

export default function MomentPageClient({
  initialData,
}: MomentPageClientProps) {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // 使用 SWR 获取数据，初始数据来自 SSR
  const { data, isLoading } = useMoments({ page, pageSize });

  // 合并所有已加载的数据
  const [allMoments, setAllMoments] = useState<MomentItem[]>(initialData.list);

  // 当 SWR 返回新数据时，合并到列表中
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    // 等待 SWR 重新验证后，合并数据
    if (data && data.list.length > 0) {
      setAllMoments((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newMoments = data.list.filter((m) => !existingIds.has(m.id));
        return [...prev, ...newMoments];
      });
    }
  };

  const currentMeta = data?.meta || initialData.meta;
  const hasMore = page < currentMeta.totalPages;
  const remainingCount = currentMeta.total - allMoments.length;

  return (
    <div className="space-y-6">
      {/* 动态列表 */}
      <div className="space-y-6">
        {allMoments.map((moment, index) => (
          <MomentCard key={moment.id} moment={moment} index={index} />
        ))}
      </div>

      {/* 加载更多按钮 */}
      {allMoments.length > 0 && (
        <LoadMoreButton
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
          hasMore={hasMore}
          remainingCount={remainingCount}
        />
      )}

      {/* 空状态 */}
      {allMoments.length === 0 && !isLoading && (
        <div className="text-center py-12 text-font-color-secondary/60">
          <p className="text-sm">还没有任何动态</p>
        </div>
      )}
    </div>
  );
}
