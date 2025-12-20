"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里添加搜索逻辑
    console.log("搜索:", searchQuery);
  };

  // 示例热门标签
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
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-start justify-center pt-20 md:pt-32 px-4"
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
            <div className="bg-background-color-transparent-1 backdrop-blur-sm rounded-xl shadow-chat-card-shadow border border-theme-color/30 overflow-hidden">
              {/* 搜索输入区 */}
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center gap-4 p-4 md:p-6">
                  <Search className="w-6 h-6 md:w-8 md:h-8 text-theme-color flex-shrink-0" />
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
                    className="p-2 hover:bg-theme-color rounded-md transition-colors duration-200 flex-shrink-0"
                    aria-label="关闭搜索"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>

                {/* 分隔线 */}
                <div className="h-px bg-theme-color/30" />

                {/* 热门标签 */}
                <div className="p-4 md:p-6">
                  <p className="text-sm text-font-color-navbar/70 mb-3">
                    热门标签
                  </p>
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
              </form>

              {/* 搜索结果区域（可选，暂时注释） */}
              {/* {searchQuery && (
                <div className="border-t border-theme-color/30 p-4 md:p-6 max-h-96 overflow-y-auto">
                  <p className="text-sm text-font-color-navbar/70">搜索结果将显示在这里</p>
                </div>
              )} */}
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
