"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
  // 年份折叠状态：默认全部展开
  const [expandedYears, setExpandedYears] = useState<Set<string>>(
    new Set(archiveData.map((item) => item.year)),
  );

  // 月份折叠状态：默认全部折叠
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  const toggleMonth = (yearMonth: string) => {
    setExpandedMonths((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(yearMonth)) {
        newSet.delete(yearMonth);
      } else {
        newSet.add(yearMonth);
      }
      return newSet;
    });
  };
  return (
    <div className="space-y-6">
      {archiveData.map((yearGroup, yearIndex) => (
        <motion.div
          key={yearGroup.year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: yearIndex * 0.1, duration: 0.4 }}
        >
          {/* 年份标题 - 可点击折叠 */}
          <button
            onClick={() => toggleYear(yearGroup.year)}
            className="flex items-center justify-between w-full text-left group mb-2 py-1"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-font-color group-hover:text-theme-color transition-colors">
                {yearGroup.year}
              </span>
              <span className="text-sm text-font-color-secondary/70 font-medium">
                共 {yearGroup.total} 篇
              </span>
            </div>
            <svg
              className={`w-5 h-5 text-font-color-secondary/50 transition-transform duration-200 ${
                expandedYears.has(yearGroup.year) ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* 年份内容 */}
          <AnimatePresence>
            {expandedYears.has(yearGroup.year) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                {/* 月份分组 */}
                <div className="space-y-2 ml-4 mt-2">
                  {yearGroup.months.map((monthGroup, monthIndex) => {
                    const monthKey = `${yearGroup.year}-${monthGroup.month}`;
                    const isMonthExpanded = expandedMonths.has(monthKey);

                    return (
                      <div key={monthIndex}>
                        {/* 月份标题 - 可点击折叠 */}
                        <button
                          onClick={() => toggleMonth(monthKey)}
                          className="flex items-center justify-between w-full text-left group/month py-1.5"
                        >
                          <div className="flex items-baseline gap-2.5">
                            <span className="text-base font-semibold text-font-color group-hover/month:text-theme-color transition-colors">
                              {monthGroup.month}
                            </span>
                            <span className="text-sm text-font-color-secondary/60">
                              {monthGroup.articles.length} 篇
                            </span>
                          </div>
                          <svg
                            className={`w-4 h-4 text-font-color-secondary/50 transition-transform duration-200 ${
                              isMonthExpanded ? "rotate-180" : "rotate-0"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {/* 月份文章列表 */}
                        <AnimatePresence>
                          {isMonthExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-0 ml-5 mt-1">
                                {monthGroup.articles.map((article) => (
                                  <Link
                                    key={article.id}
                                    href={`/article/${article.slug}`}
                                    className="group/article flex items-center gap-3 py-1.5 px-2 rounded hover:bg-background-color-card transition-all duration-150"
                                  >
                                    {/* 日期 */}
                                    <span className="shrink-0 w-7 text-sm font-semibold text-font-color-secondary/60 group-hover/article:text-theme-color transition-colors">
                                      {article.day}
                                    </span>

                                    {/* 标题 */}
                                    <span className="flex-1 min-w-0 text-base text-font-color group-hover/article:text-theme-color transition-colors truncate">
                                      {article.title}
                                    </span>

                                    {/* 分类标签 */}
                                    <span className="shrink-0 text-sm px-2 py-0.5 rounded bg-gray-200/40 dark:bg-gray-700/40 text-font-color-secondary/70">
                                      {article.category}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
