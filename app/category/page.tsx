"use client";

import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import Link from "next/link";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  description?: string;
}

// 测试数据
const categories: Category[] = [
  {
    id: "1",
    name: "前端开发",
    slug: "frontend",
    count: 15,
    description: "HTML、CSS、JavaScript 及各种前端框架",
  },
  {
    id: "2",
    name: "后端开发",
    slug: "backend",
    count: 8,
    description: "Node.js、数据库、API 设计等",
  },
  {
    id: "3",
    name: "开发工具",
    slug: "tools",
    count: 12,
    description: "编辑器、构建工具、调试技巧",
  },
  {
    id: "4",
    name: "生活随笔",
    slug: "life",
    count: 6,
    description: "日常生活、读书笔记、思考感悟",
  },
  {
    id: "5",
    name: "技术教程",
    slug: "tutorial",
    count: 20,
    description: "各类技术的学习教程和实践经验",
  },
];

export default function CategoryPage() {
  return (
    <BaseContainer pageTitle="分类" pageDescription="文章分类归档">
      <PageContentContainer>
        <div className="space-y-6">
          {/* 顶部统计 */}
          <div className="text-center pb-6 border-b border-gray-300/40 dark:border-gray-600/40">
            <p className="text-font-color-secondary">
              共 {categories.length} 个分类，
              {categories.reduce((sum, cat) => sum + cat.count, 0)} 篇文章
            </p>
          </div>

          {/* 分类网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link
                  href={`/category/${category.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-background-color-card rounded-xl p-6 border border-gray-300/40 dark:border-gray-600/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    {/* hover 背景填充 */}
                    <div className="absolute inset-0 bg-theme-color/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                    {/* 内容 */}
                    <div className="relative">
                      {/* 分类名称 */}
                      <h3 className="text-xl font-semibold text-font-color mb-2 group-hover:text-theme-color transition-colors">
                        {category.name}
                      </h3>

                      {/* 描述 */}
                      {category.description && (
                        <p className="text-sm text-font-color-secondary leading-relaxed mb-4 line-clamp-2">
                          {category.description}
                        </p>
                      )}

                      {/* 文章数量 */}
                      <div className="flex items-center gap-2 text-font-color-secondary text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-color" />
                        <span>{category.count} 篇文章</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </PageContentContainer>
    </BaseContainer>
  );
}
