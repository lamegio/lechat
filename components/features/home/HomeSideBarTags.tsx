"use client";
import HomeSideBarBox from "@/components/features/home/SideBarBox";
import { Tags } from "lucide-react";
import Link from "next/link";

export default function HomeSideBarTags() {
  const tags = [
    { id: 1, name: "React", slug: "react", color: "#61dafb", count: 12 },
    {
      id: 2,
      name: "TypeScript",
      slug: "typescript",
      color: "#3178c6",
      count: 8,
    },
    { id: 3, name: "Next.js", slug: "nextjs", color: "#000000", count: 15 },
    { id: 4, name: "Tailwind", slug: "tailwind", color: "#06b6d4", count: 6 },
    { id: 5, name: "Node.js", slug: "nodejs", color: "#339933", count: 10 },
    { id: 6, name: "数据库", slug: "database", color: "#f59e0b", count: 5 },
    { id: 7, name: "算法", slug: "algorithm", color: "#8b5cf6", count: 9 },
    {
      id: 8,
      name: "设计模式",
      slug: "design-pattern",
      color: "#ec4899",
      count: 4,
    },
  ];

  return (
    <HomeSideBarBox icon={Tags} title="标签">
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/article/tag/${tag.slug}`}
            className="relative inline-block group"
          >
            <span
              className="text-base font-medium hover:opacity-70 transition-opacity"
              style={{ color: tag.color }}
            >
              {tag.name}
            </span>
            {/* 右上角数字 */}
            {tag.count > 0 && (
              <sup className="ml-0.5 text-xs text-font-color-light-1">
                {tag.count}
              </sup>
            )}
          </Link>
        ))}
      </div>
    </HomeSideBarBox>
  );
}
