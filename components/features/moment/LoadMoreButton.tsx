"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  remainingCount?: number;
}

export default function LoadMoreButton({
  onLoadMore,
  isLoading,
  hasMore,
  remainingCount,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="text-center py-8 text-sm text-font-color-secondary/60">
        - 没有更多了 -
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="px-6 py-2.5 rounded-lg border border-gray-300/60 dark:border-gray-600/60 
                   text-font-color-secondary hover:border-gray-400 dark:hover:border-gray-500 
                   hover:bg-gray-50 dark:hover:bg-gray-800/30
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200
                   flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
            <span className="text-sm">加载中...</span>
          </>
        ) : (
          <span className="text-sm">
            加载更多动态
            {remainingCount !== undefined && remainingCount > 0 && (
              <span className="ml-1 text-font-color-secondary/60">
                (还有 {remainingCount} 条)
              </span>
            )}
          </span>
        )}
      </button>
    </div>
  );
}
