"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface TimelineArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  year: string;
  category: string;
  readTime: string;
  coverImage?: string;
}

// 测试数据
const timelineArticles: TimelineArticle[] = [
  {
    id: "1",
    title: "深入理解 React Hooks",
    slug: "react-hooks-deep-dive",
    excerpt: "从基础到进阶，全面掌握 React Hooks 的使用方法和最佳实践",
    date: "2025-12-15",
    year: "2025",
    category: "前端开发",
    readTime: "8 分钟",
    coverImage: "/bg-light.png",
  },
  {
    id: "2",
    title: "CSS Grid 布局完全指南",
    slug: "css-grid-guide",
    excerpt: "Grid 布局是现代 CSS 中最强大的布局系统，本文将详细介绍其用法",
    date: "2025-12-10",
    year: "2025",
    category: "前端开发",
    readTime: "12 分钟",
  },
  {
    id: "3",
    title: "Next.js 14 新特性解析",
    slug: "nextjs-14-features",
    excerpt: "Next.js 14 带来了许多令人兴奋的新特性",
    date: "2025-12-05",
    year: "2025",
    category: "前端开发",
    readTime: "10 分钟",
    coverImage: "/bg-light.png",
  },
  {
    id: "4",
    title: "TypeScript 类型体操实战",
    slug: "typescript-type-gymnastics",
    excerpt: "通过实际案例学习 TypeScript 的高级类型技巧",
    date: "2025-11-28",
    year: "2025",
    category: "前端开发",
    readTime: "15 分钟",
  },
  {
    id: "5",
    title: "Node.js 性能优化技巧",
    slug: "nodejs-performance",
    excerpt: "深入探讨 Node.js 应用的性能优化方法",
    date: "2024-11-20",
    year: "2024",
    category: "后端开发",
    readTime: "10 分钟",
    coverImage: "/bg-light.png",
  },
];

export default function ArchiveTimeline() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // 提取所有年份并去重
  const years = Array.from(new Set(timelineArticles.map((a) => a.year))).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  // 为每个年份找到第一篇文章的索引
  const yearIndices = years.map((year) =>
    timelineArticles.findIndex((a) => a.year === year),
  );

  return (
    <div className="relative pb-12">
      {/* 中间时间轴 */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300/40 dark:bg-gray-600/40 -translate-x-1/2" />

      {/* 文章列表 */}
      <div className="space-y-12">
        {timelineArticles.map((article, index) => {
          const isLeft = index % 2 === 0;
          const isYearStart = yearIndices.includes(index);
          const isLast = index === timelineArticles.length - 1;
          const isHovered = hoveredId === article.id;

          return (
            <div key={article.id}>
              {/* 年份节点 */}
              {isYearStart && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="relative flex justify-center mb-12"
                >
                  <div className="relative z-10 px-6 py-2 bg-theme-color text-white rounded-full font-bold text-lg shadow-lg">
                    {article.year}
                  </div>
                </motion.div>
              )}

              {/* 文章卡片 */}
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* 左侧或右侧卡片 */}
                <div className="w-[calc(50%-2rem)]">
                  <Link
                    href={`/article/${article.slug}`}
                    className="group block"
                    onMouseEnter={() => setHoveredId(article.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="h-48 bg-background-color-card rounded-xl overflow-hidden border border-gray-300/40 dark:border-gray-600/40 transition-all duration-300 hover:-translate-y-1 relative">
                      {/* 背景图 */}
                      {article.coverImage && (
                        <>
                          <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                          {/* 深色遮罩 */}
                          <div className="absolute inset-0 bg-black/50" />
                        </>
                      )}

                      {/* 无背景图时的 hover 效果 */}
                      {!article.coverImage && (
                        <div
                          className={`absolute inset-0 bg-theme-color/5 transform ${isLeft ? "-translate-x-full" : "translate-x-full"} group-hover:translate-x-0 transition-transform duration-500 ease-out`}
                        />
                      )}

                      {/* 内容区 */}
                      <div className="relative h-full p-5 flex flex-col justify-between">
                        {/* 上半部分 */}
                        <div>
                          {/* 日期 */}
                          <div
                            className={`text-xs mb-2 ${article.coverImage ? "text-white/80" : "text-font-color-secondary/60"}`}
                          >
                            {article.date}
                          </div>

                          {/* 标题 */}
                          <h3
                            className={`text-lg font-semibold mb-2 group-hover:text-theme-color transition-colors line-clamp-2 ${article.coverImage ? "text-white" : "text-font-color"}`}
                          >
                            {article.title}
                          </h3>

                          {/* 摘要 */}
                          <p
                            className={`text-sm leading-relaxed line-clamp-2 ${article.coverImage ? "text-white/90" : "text-font-color-secondary"}`}
                          >
                            {article.excerpt}
                          </p>
                        </div>

                        {/* 下半部分：元信息 */}
                        <div
                          className={`flex items-center gap-3 text-xs ${article.coverImage ? "text-white/80" : "text-font-color-secondary/60"}`}
                        >
                          <span
                            className={`px-2 py-0.5 rounded ${article.coverImage ? "bg-white/20 backdrop-blur-sm" : "bg-gray-200/50 dark:bg-gray-700/50"}`}
                          >
                            {article.category}
                          </span>
                          <span>·</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* 中间时间节点 */}
                <div className="relative shrink-0">
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.3 : 1,
                      boxShadow: isHovered
                        ? "0 0 20px rgba(var(--theme-color-rgb, 59, 130, 246), 0.6)"
                        : "0 0 0 rgba(0, 0, 0, 0)",
                    }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-full bg-theme-color border-4 border-background-color-page ${isLast ? "w-6 h-6" : "w-4 h-4"}`}
                  />
                </div>

                {/* 占位空间 */}
                <div className="w-[calc(50%-2rem)]" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
