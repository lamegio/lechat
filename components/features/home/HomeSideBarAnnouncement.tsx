import HomeSideBarBox from "@/components/features/home/SideBarBox";
import { Megaphone } from "lucide-react";

export default function HomeSideBarAnnouncement() {
  const announcements = [
    {
      id: 1,
      content: "网站已升级到 Next.js 15，体验更流畅！",
      date: "2024-12-15",
    },
    {
      id: 2,
      content: "新增深色模式支持，保护你的眼睛。",
      date: "2024-12-10",
    },
    {
      id: 3,
      content: "欢迎访问我的博客，持续更新技术文章。",
      date: "2024-12-01",
    },
  ];

  return (
    <HomeSideBarBox icon={Megaphone} title="公告">
      <div className="space-y-3">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg bg-theme-color/5 hover:bg-theme-color/10 transition-colors duration-200 border-l-2 border-theme-color"
          >
            <p className="text-sm leading-relaxed wrap-anywhere mb-2">
              {item.content}
            </p>
            <p className="text-xs text-font-color-light-1">{item.date}</p>
          </div>
        ))}
      </div>
    </HomeSideBarBox>
  );
}
