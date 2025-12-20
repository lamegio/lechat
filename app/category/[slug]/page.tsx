"use client";

import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  readTime: string;
}

// 测试数据
const categoryData = {
  name: "前端开发",
  slug: "frontend",
  description: "HTML、CSS、JavaScript 及各种前端框架",
  count: 15,
};

const articles: Article[] = [
  {
    id: "1",
    title: "深入理解 React Hooks",
    slug: "react-hooks-deep-dive",
    excerpt: "从基础到进阶，全面掌握 React Hooks 的使用方法和最佳实践...",
    createdAt: "2025-12-15",
    readTime: "8 分钟",
  },
  {
    id: "2",
    title: "CSS Grid 布局完全指南",
    slug: "css-grid-guide",
    excerpt: "Grid 布局是现代 CSS 中最强大的布局系统，本文将详细介绍其用法...",
    createdAt: "2025-12-10",
    readTime: "12 分钟",
  },
  {
    id: "3",
    title: "Next.js 14 新特性解析",
    slug: "nextjs-14-features",
    excerpt:
      "Next.js 14 带来了许多令人兴奋的新特性，包括 Server Actions、Partial Prerendering...",
    createdAt: "2025-12-05",
    readTime: "10 分钟",
  },
  {
    id: "4",
    title: "TypeScript 类型体操实战",
    slug: "typescript-type-gymnastics",
    excerpt: "通过实际案例学习 TypeScript 的高级类型技巧...",
    createdAt: "2025-11-28",
    readTime: "15 分钟",
  },
];

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <BaseContainer
      pageTitle={categoryData.name}
      pageDescription={categoryData.description}
    >
      <PageContentContainer>
        <div className="space-y-6">
          {/* 顶部信息 */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-300/40 dark:border-gray-600/40">
            <div className="flex items-center gap-3">
              <Link
                href="/category"
                className="text-font-color-secondary hover:text-theme-color transition-colors text-sm"
              >
                ← 返回分类
              </Link>
              <span className="text-font-color-secondary">|</span>
              <span className="text-font-color-secondary text-sm">
                共 {categoryData.count} 篇文章
              </span>
            </div>
          </div>

          {/* 文章列表 */}
          <div className="space-y-4">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link href={`/article/${article.slug}`} className="group block">
                  <div className="bg-background-color-card rounded-xl p-6 border border-gray-300/40 dark:border-gray-600/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    {/* hover 背景填充 */}
                    <div className="absolute inset-0 bg-theme-color/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                    {/* 内容 */}
                    <div className="relative">
                      {/* 标题 */}
                      <h3 className="text-xl font-semibold text-font-color mb-3 group-hover:text-theme-color transition-colors">
                        {article.title}
                      </h3>

                      {/* 摘要 */}
                      <p className="text-font-color-secondary leading-relaxed mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* 元信息 */}
                      <div className="flex items-center gap-4 text-sm text-font-color-secondary/60">
                        <span>{article.createdAt}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 底部分页（可选） */}
          <div className="flex justify-center pt-6">
            <div className="text-sm text-font-color-secondary/60">
              - 已显示全部文章 -
            </div>
          </div>
        </div>
      </PageContentContainer>
    </BaseContainer>
  );
}
