import HomeSideBarBox from "@/components/features/home/SideBarBox";
import { BarChart3, Eye, Clock, TrendingUp } from "lucide-react";

export default function HomeSideBarStats() {
  const stats = [
    {
      id: 1,
      label: "总访问量",
      value: "12,345",
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: 2,
      label: "运行天数",
      value: "365",
      icon: Clock,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      id: 3,
      label: "文章总数",
      value: "42",
      icon: BarChart3,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      id: 4,
      label: "今日访问",
      value: "156",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <HomeSideBarBox icon={BarChart3} title="网站统计">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`p-3 rounded-lg ${stat.bgColor} hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-font-color-light-1">
                {stat.label}
              </span>
            </div>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </HomeSideBarBox>
  );
}
