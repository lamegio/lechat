import HomeSideBarBox from "@/components/features/home/SideBarBox";
import { Folder, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomeSideBarCategories() {
  const categories = [
    {
      id: 1,
      name: "前端开发",
      count: 15,
      children: [
        { id: 11, name: "React", count: 8 },
        { id: 12, name: "Vue", count: 7 },
      ],
    },
    {
      id: 2,
      name: "后端技术",
      count: 8,
      children: [
        { id: 21, name: "Node.js", count: 5 },
        { id: 22, name: "Python", count: 3 },
      ],
    },
    { id: 3, name: "算法与数据结构", count: 12 },
    { id: 4, name: "生活随笔", count: 6 },
    { id: 5, name: "读书笔记", count: 9 },
  ];

  return (
    <HomeSideBarBox icon={Folder} title="分类">
      <div className="space-y-1">
        {categories.map((item) => (
          <div key={item.id}>
            {/* 一级分类 */}
            <Link
              href={`/article/category/${item.id}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-theme-color/10 transition-colors group"
            >
              <span className="text-base group-hover:text-theme-color transition-colors">
                {item.name}
              </span>
              <span className="text-sm text-font-color-light-1 bg-theme-color/10 px-2 py-0.5 rounded-full">
                {item.count}
              </span>
            </Link>

            {/* 二级分类 */}
            {item.children && item.children.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    href={`/article/category/${child.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-theme-color/10 transition-colors group"
                  >
                    <div className="flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 text-font-color-light-1" />
                      <span className="text-sm group-hover:text-theme-color transition-colors">
                        {child.name}
                      </span>
                    </div>
                    <span className="text-xs text-font-color-light-1 bg-theme-color/10 px-1.5 py-0.5 rounded-full">
                      {child.count}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </HomeSideBarBox>
  );
}
