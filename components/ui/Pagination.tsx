"use client";

import { JSX } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps): JSX.Element {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // 生成页码数组
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const showPages = 5; // 显示的页码数量

    if (totalPages <= showPages + 2) {
      // 总页数少，显示全部
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总页数多，显示部分 + 省略号
      pages.push(1);

      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
      } else if (currentPage >= totalPages - 2) {
        pages.push("...");
        for (let i = totalPages - 3; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {/* 上一页按钮 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev || isLoading}
        className="
          px-4 py-2 rounded-lg font-medium
          bg-theme-color text-font-color
          hover:opacity-80 active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200
          shadow-sm hover:shadow-md
        "
      >
        ←
      </button>

      {/* 页码按钮 */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-font-color opacity-50"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              disabled={isLoading}
              className={`
                min-w-[40px] h-[40px] rounded-lg font-medium
                transition-all duration-200
                ${
                  isActive
                    ? "bg-theme-color text-font-color scale-110 shadow-lg"
                    : "bg-theme-color/20 text-font-color hover:bg-theme-color/40 hover:scale-105"
                }
                active:scale-95 disabled:cursor-not-allowed
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext || isLoading}
        className="
          px-4 py-2 rounded-lg font-medium
          bg-theme-color text-font-color
          hover:opacity-80 active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200
          shadow-sm hover:shadow-md
        "
      >
        →
      </button>
    </div>
  );
}
