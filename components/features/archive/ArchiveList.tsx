"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  day: string;
  category: string;
}

interface MonthGroup {
  month: string;
  articles: Article[];
}

interface YearGroup {
  year: string;
  months: MonthGroup[];
  total: number;
}

// 测试数据
const archiveData: YearGroup[] = [
  {
    year: "2025",
    total: 8,
    months: [
      {
        month: "12月",
        articles: [
          {
            id: "1",
            title: "深入理解 React Hooks",
            slug: "react-hooks-deep-dive",
            date: "2025-12-15",
            day: "15",
            category: "前端开发",
          },
          {
            id: "2",
            title: "CSS Grid 布局完全指南",
            slug: "css-grid-guide",
            date: "2025-12-10",
            day: "10",
            category: "前端开发",
          },
          {
            id: "3",
            title: "Next.js 14 新特性解析",
            slug: "nextjs-14-features",
            date: "2025-12-05",
            day: "05",
            category: "前端开发",
          },
        ],
      },
      {
        month: "11月",
        articles: [
          {
            id: "4",
            title: "TypeScript 类型体操实战",
            slug: "typescript-type-gymnastics",
            date: "2025-11-28",
            day: "28",
            category: "前端开发",
          },
          {
            id: "5",
            title: "Node.js 性能优化技巧",
            slug: "nodejs-performance",
            date: "2025-11-20",
            day: "20",
            category: "后端开发",
          },
        ],
      },
    ],
  },
  {
    year: "2024",
    total: 12,
    months: [
      {
        month: "10月",
        articles: [
          {
            id: "6",
            title: "构建现代化的前端工作流",
            slug: "modern-frontend-workflow",
            date: "2024-10-15",
            day: "15",
            category: "开发工具",
          },
        ],
      },
    ],
  },
];

export default function ArchiveList() {
  return (
    <div className="space-y-10">
      {archiveData.map((yearGroup, yearIndex) => (
        <motion.div
          key={yearGroup.year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: yearIndex * 0.1, duration: 0.4 }}
        >
          {/* 年份标题 */}
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-font-color">
              {yearGroup.year}
            </h2>
            <span className="text-sm text-font-color-secondary">
              共 {yearGroup.total} 篇
            </span>
          </div>

          {/* 年份下虚线分割 */}
          <div className="border-t border-dashed border-gray-300/30 dark:border-gray-600/30 mb-6" />

          {/* 月份分组 */}
          <div className="space-y-5 ml-4">
            {yearGroup.months.map((monthGroup, monthIndex) => (
              <div key={monthIndex}>
                {/* 月份标题 */}
                <h3 className="text-base font-semibold text-font-color mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-theme-color" />
                  {monthGroup.month}
                </h3>

                {/* 文章列表 */}
                <div className="space-y-1 ml-6">
                  {monthGroup.articles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/article/${article.slug}`}
                      className="group flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-background-color-card transition-colors duration-200 border border-transparent hover:border-gray-300/40 hover:dark:border-gray-600/40"
                    >
                      {/* 日期 */}
                      <div className="shrink-0 w-10 text-center">
                        <span className="text-xl font-bold text-font-color-secondary/60 group-hover:text-theme-color transition-colors">
                          {article.day}
                        </span>
                      </div>

                      {/* 标题和分类 */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-font-color font-medium group-hover:text-theme-color transition-colors truncate">
                          {article.title}
                        </h4>
                      </div>

                      {/* 分类标签 */}
                      <div className="shrink-0">
                        <span className="text-xs px-2 py-1 rounded bg-gray-200/50 dark:bg-gray-700/50 text-font-color-secondary">
                          {article.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
