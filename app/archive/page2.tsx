import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import { Calendar } from "lucide-react";

interface Article {
  id: number;
  title: string;
  slug: string;
  date: string;
  cover?: string;
}

interface MonthData {
  [month: string]: Article[];
}

interface ArchiveData {
  [year: string]: MonthData;
}

// 模拟数据
const archiveData: ArchiveData = {
  "2025": {
    "10": [
      {
        id: 1,
        title: "Next.js 15 性能优化实践",
        slug: "nextjs-15",
        date: "2025-10-27",
      },
    ],
    "08": [
      {
        id: 2,
        title: "React Server Components 深入解析",
        slug: "rsc",
        date: "2025-08-31",
      },
    ],
    "06": [
      {
        id: 3,
        title: "TypeScript 类型体操完全指南",
        slug: "ts-types",
        date: "2025-06-24",
        cover: "/bg-light.png",
      },
      {
        id: 4,
        title: "前端工程化实践",
        slug: "frontend-eng",
        date: "2025-06-20",
      },
      {
        id: 5,
        title: "Web 性能优化指南",
        slug: "performance",
        date: "2025-06-15",
        cover: "/bg-light.png",
      },
    ],
    "05": [
      {
        id: 6,
        title: "CSS 现代布局技术",
        slug: "css-layout",
        date: "2025-05-29",
      },
      {
        id: 7,
        title: "状态管理方案对比",
        slug: "state-mgmt",
        date: "2025-05-15",
      },
    ],
  },
  "2024": {
    "12": [
      {
        id: 8,
        title: "2024 技术总结",
        slug: "2024-review",
        date: "2024-12-30",
        cover: "/bg-light.png",
      },
    ],
    "09": [
      { id: 9, title: "构建组件库", slug: "component-lib", date: "2024-09-15" },
    ],
  },
};

const monthNames: Record<string, string> = {
  "01": "一月",
  "02": "二月",
  "03": "三月",
  "04": "四月",
  "05": "五月",
  "06": "六月",
  "07": "七月",
  "08": "八月",
  "09": "九月",
  "10": "十月",
  "11": "十一月",
  "12": "十二月",
};

export default function ArchivePage() {
  const years = Object.keys(archiveData);
  const totalArticles = Object.values(archiveData).reduce(
    (sum, year) => sum + Object.values(year).flat().length,
    0,
  );

  return (
    <BaseContainer pageTitle="归档" pageDescription="时光荏苒，记录每一次思考">
      <PageContentContainer>
        <div className="relative pb-12">
          {/* 中央时间线 */}
          <div className="absolute left-1/2 top-0 bottom-12 w-px bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2" />

          {/* 时间线底部端点 */}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500" />

          <div className="space-y-16">
            {years.map((year, yearIndex) => {
              const months = Object.keys(archiveData[year]);
              const yearTotal = Object.values(archiveData[year]).flat().length;
              let articleIndex = 0;

              return (
                <div key={year} className="relative">
                  {/* 年份节点 */}
                  <div className="relative flex justify-center mb-12">
                    <div className="relative z-10 flex items-center gap-4 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-100">
                        <span className="text-lg font-bold text-white dark:text-gray-900">
                          {year}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {yearTotal} 篇
                      </span>
                    </div>
                  </div>

                  {/* 月份和文章 */}
                  {months.map((month) => {
                    const articles = archiveData[year][month];

                    return (
                      <div key={month} className="relative mb-12">
                        {/* 月份标签 */}
                        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 z-10">
                          <div className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                            {monthNames[month]}
                          </div>
                        </div>

                        {/* 文章列表 */}
                        <div className="grid grid-cols-2 gap-8 pt-12">
                          {articles.map((article) => {
                            const isLeft = articleIndex % 2 === 0;
                            articleIndex++;

                            return (
                              <div
                                key={article.id}
                                className={isLeft ? "pr-6" : "pl-6 col-start-2"}
                              >
                                <a
                                  href={`/posts/${article.slug}`}
                                  className="group block relative"
                                >
                                  {/* 连接点 */}
                                  <div
                                    className={`absolute top-6 ${isLeft ? "-right-6" : "-left-6"} w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors`}
                                  />

                                  {/* 连接线 */}
                                  <div
                                    className={`absolute top-6 ${isLeft ? "-right-6 left-full" : "-left-6 right-full"} h-px bg-gray-300 dark:bg-gray-600`}
                                    style={{ width: "1.5rem" }}
                                  />

                                  {/* 文章卡片 */}
                                  <div
                                    className={`relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg transition-all ${article.cover ? "bg-cover bg-center" : ""}`}
                                    style={
                                      article.cover
                                        ? {
                                            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${article.cover})`,
                                            minHeight: "140px",
                                          }
                                        : {}
                                    }
                                  >
                                    <div
                                      className={`p-5 ${article.cover ? "text-white" : ""}`}
                                    >
                                      <h3
                                        className={`text-base font-medium mb-2 line-clamp-2 ${article.cover ? "text-white" : "text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"} transition-colors`}
                                      >
                                        {article.title}
                                      </h3>
                                      <div
                                        className={`flex items-center gap-2 text-sm ${article.cover ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}
                                      >
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{article.date}</span>
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </PageContentContainer>
    </BaseContainer>
  );
}
