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
    <div className="flex items-center justify-center gap-2 py-8 text-font-color">
      {/* 上一页按钮 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev || isLoading}
        className="
          px-2 py-1 h-8 min-w-8 rounded-lg font-medium
          bg-background-color-transparent-1
          hover:bg-theme-color active:scale-95 hover:text-link-hover-font-color
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200
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
                className="px-2 py-1 h-8 min-w-8 text-font-color opacity-50"
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
                px-2 py-1 h-8 min-w-8 rounded-lg font-medium
                transition-all duration-200 hover:text-link-hover-font-color
                ${
                  isActive
                    ? "bg-theme-color text-link-hover-font-color"
                    : "bg-background-color-transparent-1 hover:bg-theme-color"
                }
                active:disabled:cursor-not-allowed
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
          px-2 py-1 h-8 min-w-8 rounded-lg font-medium
          bg-background-color-transparent-1
          hover:bg-theme-color active:scale-95 hover:text-link-hover-font-color
          disabled:opacity-40 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        →
      </button>
    </div>
  );
}
