import HomeSideBarBox from "@/components/features/home/SideBarBox";
import { FileText, Calendar } from "lucide-react";
import Link from "next/link";

export default function HomeSideBarRecentPosts() {
  const recentPosts = [
    {
      id: 1,
      title: "Next.js 15 新特性全解析",
      slug: "nextjs-15-features",
      date: "2024-12-15",
      views: 1234,
    },
    {
      id: 2,
      title: "深入理解 React Server Components",
      slug: "react-server-components",
      date: "2024-12-10",
      views: 892,
    },
    {
      id: 3,
      title: "TypeScript 5.0 类型体操进阶",
      slug: "typescript-5-advanced",
      date: "2024-12-05",
      views: 756,
    },
    {
      id: 4,
      title: "使用 Tailwind CSS 构建现代化 UI",
      slug: "modern-ui-with-tailwind",
      date: "2024-12-01",
      views: 645,
    },
    {
      id: 5,
      title: "前端性能优化最佳实践",
      slug: "frontend-performance-optimization",
      date: "2024-11-28",
      views: 1089,
    },
  ];

  return (
    <HomeSideBarBox icon={FileText} title="最新文章">
      <div className="space-y-3">
        {recentPosts.map((post, index) => (
          <Link
            key={post.id}
            href={`/article/${post.slug}`}
            className="block group"
          >
            <div className="flex gap-3 p-2 rounded-lg hover:bg-theme-color/10 transition-colors duration-200">
              {/* 序号 */}
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-theme-color/20 flex items-center justify-center text-xs font-semibold group-hover:bg-theme-color group-hover:text-link-hover-font-color transition-colors">
                {index + 1}
              </div>

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-theme-color transition-colors mb-1">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-font-color-light-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.views} 阅读</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </HomeSideBarBox>
  );
}
