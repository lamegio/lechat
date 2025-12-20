import HomeSideBarBox from "@/components/features/home/SideBarBox";
import { Megaphone } from "lucide-react";

export default function HomeSideBarAnnouncement() {
  const announcement = {
    content: "欢迎访问我的博客，持续更新技术文章。",
    date: "2024-12-20",
  };

  return (
    <HomeSideBarBox icon={Megaphone} title="公告">
      <div>
        <p className="text-base leading-relaxed wrap-anywhere mb-2">
          {announcement.content}
        </p>
        <p className="text-sm text-font-color-light-1">{announcement.date}</p>
      </div>
    </HomeSideBarBox>
  );
}
