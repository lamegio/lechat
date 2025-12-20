import HomeSideBarBox from "@/components/features/home/SideBarBox";
import { Folder } from "lucide-react";
import Link from "next/link";

export default function HomeSideBarCategories() {
  const categories = [
    { id: 1, name: "前端开发", count: 15, color: "bg-blue-500" },
    { id: 2, name: "后端技术", count: 8, color: "bg-green-500" },
    { id: 3, name: "算法与数据结构", count: 12, color: "bg-purple-500" },
    { id: 4, name: "生活随笔", count: 6, color: "bg-orange-500" },
    { id: 5, name: "读书笔记", count: 9, color: "bg-pink-500" },
  ];

  return (
    <HomeSideBarBox icon={Folder} title="分类">
      <div className="space-y-2">
        {categories.map((item) => (
          <Link
            key={item.id}
            href={`/article/category/${item.id}`}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-theme-color/10 transition-colors duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-sm group-hover:text-theme-color transition-colors">
                {item.name}
              </span>
            </div>
            <span className="text-xs text-font-color-light-1 bg-theme-color/10 px-2 py-0.5 rounded-full">
              {item.count}
            </span>
          </Link>
        ))}
      </div>
    </HomeSideBarBox>
  );
}
