"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  coverImage?: string;
}

// 模拟搜索结果
const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "深入理解 React Hooks",
    slug: "react-hooks-deep-dive",
    excerpt: "从基础到进阶，全面掌握 React Hooks 的使用方法和最佳实践...",
    category: "前端开发",
    tags: ["React", "Hooks", "前端"],
    date: "2025-12-15",
    coverImage: "/bg-light.png",
  },
  {
    id: "2",
    title: "Next.js 14 新特性解析",
    slug: "nextjs-14-features",
    excerpt: "Next.js 14 带来了许多令人兴奋的新特性...",
    category: "前端开发",
    tags: ["Next.js", "React", "全栈"],
    date: "2025-12-10",
  },
  {
    id: "3",
    title: "TypeScript 类型体操实战",
    slug: "typescript-type-gymnastics",
    excerpt: "通过实际案例学习 TypeScript 的高级类型技巧...",
    category: "前端开发",
    tags: ["TypeScript", "类型系统"],
    date: "2025-11-28",
    coverImage: "/bg-light.png",
  },
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "React Hooks",
    "Next.js",
    "TypeScript",
  ]);

  // 自动聚焦
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // ESC 键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // 模拟搜索
  useEffect(() => {
    if (searchQuery.trim()) {
      // 这里应该调用真实的搜索 API
      const filtered = mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 添加到最近搜索
      setRecentSearches((prev) => [
        searchQuery,
        ...prev.filter((q) => q !== searchQuery).slice(0, 4),
      ]);
    }
  };

  const popularTags = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "前端开发",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100 bg-black/40 backdrop-blur-md flex items-start justify-center pt-20 md:pt-32 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 搜索框容器 */}
            <div className="bg-background-color-transparent-1 backdrop-blur-sm rounded-xl shadow-chat-card-shadow border border-theme-color/30 overflow-hidden max-h-[70vh] flex flex-col">
              {/* 搜索输入区 */}
              <form onSubmit={handleSearch}>
                <div className="flex items-center gap-4 p-4 md:p-6">
                  <Search className="w-6 h-6 md:w-8 md:h-8 text-theme-color shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索文章、标签..."
                    className="flex-1 bg-transparent outline-none text-xl md:text-3xl placeholder:text-font-color-navbar/50"
                  />
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 hover:bg-theme-color rounded-md transition-colors duration-200 shrink-0"
                    aria-label="关闭搜索"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
              </form>

              <div className="h-px bg-theme-color/30" />

              {/* 内容区域 - 可滚动 */}
              <div className="flex-1 overflow-y-auto">
                {!searchQuery ? (
                  // 未搜索时：显示最近搜索和热门标签
                  <div className="p-4 md:p-6 space-y-6">
                    {/* 最近搜索 */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-font-color-navbar/70 mb-3">
                          <Clock className="w-4 h-4" />
                          <span>最近搜索</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((query, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setSearchQuery(query)}
                              className="px-3 py-1.5 text-sm bg-background-color-card hover:bg-theme-color/20 rounded-full transition-colors duration-200 border border-gray-300/20 dark:border-gray-600/20"
                            >
                              {query}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 热门标签 */}
                    <div>
                      <div className="flex items-center gap-2 text-sm text-font-color-navbar/70 mb-3">
                        <TrendingUp className="w-4 h-4" />
                        <span>热门标签</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSearchQuery(tag)}
                            className="px-3 py-1.5 text-sm bg-theme-color/20 hover:bg-theme-color hover:text-link-hover-font-color rounded-full transition-colors duration-200"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // 搜索时：显示搜索结果
                  <div className="p-4 md:p-6">
                    {searchResults.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-sm text-font-color-navbar/70 mb-4">
                          找到 {searchResults.length} 个结果
                        </p>
                        {searchResults.map((result) => (
                          <Link
                            key={result.id}
                            href={`/article/${result.slug}`}
                            onClick={onClose}
                            className="block group"
                          >
                            <div className="bg-background-color-card rounded-lg p-4 border border-gray-300/20 dark:border-gray-600/20 hover:border-theme-color/40 transition-all duration-200 relative overflow-hidden">
                              {/* 背景图 */}
                              {result.coverImage && (
                                <>
                                  <Image
                                    src={result.coverImage}
                                    alt={result.title}
                                    fill
                                    className="object-cover opacity-20"
                                  />
                                  <div className="absolute inset-0 bg-background-color-card/80" />
                                </>
                              )}

                              {/* 内容 */}
                              <div className="relative">
                                <h3 className="text-base font-semibold text-font-color mb-2 group-hover:text-theme-color transition-colors">
                                  {result.title}
                                </h3>
                                <p className="text-sm text-font-color-secondary line-clamp-2 mb-3">
                                  {result.excerpt}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-font-color-secondary/60">
                                  <span className="px-2 py-0.5 rounded bg-gray-200/50 dark:bg-gray-700/50">
                                    {result.category}
                                  </span>
                                  <span>·</span>
                                  <span>{result.date}</span>
                                  <span>·</span>
                                  <div className="flex gap-1">
                                    {result.tags.slice(0, 2).map((tag) => (
                                      <span key={tag}>#{tag}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-font-color-secondary">
                          未找到相关结果
                        </p>
                        <p className="text-sm text-font-color-secondary/60 mt-2">
                          试试其他关键词
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 提示文字 */}
            <p className="text-center text-sm text-white/70 mt-4">
              按 <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd> 关闭
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
