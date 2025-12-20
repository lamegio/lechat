"use client";
import HomeSideBarBox from "@/components/features/home/SideBarBox";
import { Tags } from "lucide-react";
import Link from "next/link";

export default function HomeSideBarTags() {
  // 预定义的随机颜色池（柔和的颜色，适合标签）
  const defaultColors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#8b5cf6", // purple
    "#f59e0b", // amber
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#f97316", // orange
    "#14b8a6", // teal
  ];

  // 基于标签 ID 生成确定性颜色（而不是随机）
  const getColorByIndex = (id: number) => {
    return defaultColors[id % defaultColors.length];
  };

  const tags = [
    { id: 1, name: "React", slug: "react", color: "#61dafb", post_count: 12 },
    {
      id: 2,
      name: "TypeScript",
      slug: "typescript",
      color: "#3178c6",
      post_count: 8,
    },
    { id: 3, name: "Next.js", slug: "nextjs", color: null, post_count: 15 },
    {
      id: 4,
      name: "Tailwind",
      slug: "tailwind",
      color: "#06b6d4",
      post_count: 6,
    },
    {
      id: 5,
      name: "Node.js",
      slug: "nodejs",
      color: "#339933",
      post_count: 10,
    },
    { id: 6, name: "数据库", slug: "database", color: null, post_count: 5 },
    { id: 7, name: "算法", slug: "algorithm", color: null, post_count: 9 },
    {
      id: 8,
      name: "设计模式",
      slug: "design-pattern",
      color: null,
      post_count: 4,
    },
  ];

  return (
    <HomeSideBarBox icon={Tags} title="标签">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const tagColor = tag.color || getColorByIndex(tag.id);
          return (
            <Link
              key={tag.id}
              href={`/article/tag/${tag.slug}`}
              className="relative group"
            >
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
                style={{
                  backgroundColor: `${tagColor}15`,
                  color: tagColor,
                  borderWidth: "1px",
                  borderColor: `${tagColor}30`,
                }}
              >
                {tag.name}
                {tag.post_count > 0 && (
                  <span
                    className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full font-semibold"
                    style={{
                      backgroundColor: tagColor,
                      color: "#ffffff",
                    }}
                  >
                    {tag.post_count}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </HomeSideBarBox>
  );
}
