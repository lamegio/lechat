import { LucideIcon } from "lucide-react";

export default function HomeSideBarBox({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
  title?: string;
}) {
  return (
    <div className="w-full h-max bg-background-color-transparent-1 shadow-chat-card-shadow rounded-3xl px-5 overflow-hidden py-5">
      {title && (
        <div className="flex items-center gap-x-3 border-b border-theme-color/20">
          {Icon && <Icon className="w-6 h-6 text-theme-color shrink-0" />}
          <h3 className="text-xl font-semibold py-0 mt-5 mb-3">{title}</h3>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
