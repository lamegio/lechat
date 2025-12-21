"use client";

import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Hash, Calendar, TrendingUp } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  month: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readTime: string;
}

interface RelatedTag {
  name: string;
  slug: string;
  count: number;
}

// 测试数据
const tagData = {
  name: "React",
  slug: "react",
  count: 15,
  description: "用于构建用户界面的 JavaScript 库",
  firstUsed: "2024-03-15",
  lastUsed: "2025-12-15",
};

const articles: Article[] = [
  {
    id: "1",
    title: "深入理解 React Hooks",
    slug: "react-hooks-deep-dive",
    excerpt: "从基础到进阶，全面掌握 React Hooks 的使用方法和最佳实践",
    date: "2025-12-15",
    month: "2025-12",
    category: "前端开发",
    tags: ["React", "Hooks", "JavaScript"],
    coverImage: "/bg-light.png",
    readTime: "8 分钟",
  },
  {
    id: "2",
    title: "React 性能优化实战",
    slug: "react-performance",
    excerpt: "掌握 React 应用性能优化的关键技巧",
    date: "2025-11-20",
    month: "2025-11",
    category: "前端开发",
    tags: ["React", "性能优化", "前端"],
    readTime: "10 分钟",
  },
  {
    id: "3",
    title: "React Server Components 详解",
    slug: "react-server-components",
    excerpt: "探索 React 18 的 Server Components 新特性",
    date: "2025-11-05",
    month: "2025-11",
    category: "前端开发",
    tags: ["React", "Next.js", "SSR"],
    coverImage: "/bg-light.png",
    readTime: "12 分钟",
  },
];

const relatedTags: RelatedTag[] = [
  { name: "Next.js", slug: "nextjs", count: 8 },
  { name: "JavaScript", slug: "javascript", count: 12 },
  { name: "TypeScript", slug: "typescript", count: 10 },
  { name: "Hooks", slug: "hooks", count: 6 },
  { name: "前端开发", slug: "frontend", count: 15 },
];

export default function TagDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // 按月份分组
  const groupedArticles = articles.reduce(
    (acc, article) => {
      if (!acc[article.month]) {
        acc[article.month] = [];
      }
      acc[article.month].push(article);
      return acc;
    },
    {} as Record<string, Article[]>,
  );

  const months = Object.keys(groupedArticles).sort((a, b) =>
    b.localeCompare(a),
  );

  // 计算时间跨度
  const timeSpan = Math.floor(
    (new Date(tagData.lastUsed).getTime() -
      new Date(tagData.firstUsed).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <BaseContainer
      pageTitle={`#${tagData.name}`}
      pageDescription={tagData.description}
    >
      <PageContentContainer>
        <div className="space-y-8">
          {/* 标签信息卡片 */}
          <div className="bg-background-color-card rounded-xl p-6 border border-gray-300/40 dark:border-gray-600/40">
            <div className="flex items-start justify-between gap-6">
              {/* 左侧：标签详情 */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-theme-color/20 flex items-center justify-center">
                    <Hash className="w-6 h-6 text-theme-color" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-font-color">
                      {tagData.name}
                    </h2>
                    <p className="text-sm text-font-color-secondary">
                      {tagData.description}
                    </p>
                  </div>
                </div>

                {/* 统计信息 */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-font-color-secondary">
                      文章数量
                    </span>
                    <span className="text-xl font-semibold text-font-color">
                      {tagData.count}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-font-color-secondary">
                      使用时长
                    </span>
                    <span className="text-xl font-semibold text-font-color">
                      {timeSpan} 天
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-font-color-secondary">
                      最近使用
                    </span>
                    <span className="text-sm font-medium text-font-color">
                      {tagData.lastUsed}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 相关标签 */}
          <div>
            <div className="flex items-center gap-2 text-font-color mb-4">
              <TrendingUp className="w-5 h-5" />
              <h3 className="text-lg font-semibold">相关标签</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tag/${tag.slug}`}
                  className="px-4 py-2 bg-background-color-card rounded-full border border-gray-300/40 dark:border-gray-600/40 hover:border-theme-color/60 hover:bg-theme-color/10 transition-all duration-200 text-sm"
                >
                  <span className="text-font-color">#{tag.name}</span>
                  <span className="text-font-color-secondary ml-2">
                    {tag.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* 文章列表 - 按月份分组 */}
          <div className="space-y-8">
            {months.map((month, monthIndex) => (
              <motion.div
                key={month}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: monthIndex * 0.1, duration: 0.4 }}
              >
                {/* 月份标题 */}
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-theme-color" />
                  <h3 className="text-lg font-semibold text-font-color">
                    {new Date(month + "-01").toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                    })}
                  </h3>
                  <span className="text-sm text-font-color-secondary">
                    {groupedArticles[month].length} 篇
                  </span>
                </div>

                {/* 文章卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedArticles[month].map((article) => (
                    <Link
                      key={article.id}
                      href={`/article/${article.slug}`}
                      className="group block"
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
                            <div className="absolute inset-0 bg-black/50" />
                          </>
                        )}

                        {/* 无背景图时的 hover 效果 */}
                        {!article.coverImage && (
                          <div className="absolute inset-0 bg-theme-color/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        )}

                        {/* 内容区 */}
                        <div className="relative h-full p-5 flex flex-col justify-between">
                          <div>
                            <div
                              className={`text-xs mb-2 ${article.coverImage ? "text-white/80" : "text-font-color-secondary/60"}`}
                            >
                              {article.date}
                            </div>
                            <h3
                              className={`text-lg font-semibold mb-2 group-hover:text-theme-color transition-colors line-clamp-2 ${article.coverImage ? "text-white" : "text-font-color"}`}
                            >
                              {article.title}
                            </h3>
                            <p
                              className={`text-sm leading-relaxed line-clamp-2 ${article.coverImage ? "text-white/90" : "text-font-color-secondary"}`}
                            >
                              {article.excerpt}
                            </p>
                          </div>

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
                            <span>·</span>
                            <div className="flex gap-1 truncate">
                              {article.tags
                                .filter((t) => t !== tagData.name)
                                .slice(0, 2)
                                .map((tag) => (
                                  <span key={tag}>#{tag}</span>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </PageContentContainer>
    </BaseContainer>
  );
}
