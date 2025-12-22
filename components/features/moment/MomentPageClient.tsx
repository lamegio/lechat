"use client";

import { useEffect, useState } from "react";
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
  const pageSize = 5;
  const [allMoments, setAllMoments] = useState<MomentItem[]>(initialData.list);

  const { data, isLoading } = useMoments({ page, pageSize });

  useEffect(() => {
    if (data && page > 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAllMoments((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newMoments = data.list.filter((m) => !existingIds.has(m.id));
        return [...prev, ...newMoments];
      });
    }
  }, [data, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
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
