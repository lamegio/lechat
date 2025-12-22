import Image from "next/image";
import Link from "next/link";
import { FriendItem } from "@/types/friend";

export default function FriendCard({ friend }: { friend: FriendItem }) {
  return (
    <Link
      key={friend.url}
      href={friend.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden"
    >
      <div
        className="h-full bg-background-color-card rounded-xl p-5
  border border-gray-300/40 dark:border-gray-600/40
  transition-all duration-300
  hover:-translate-y-1 relative"
      >
        {/* hover 背景色从左到右填充 */}
        <div
          className="absolute inset-0 bg-theme-color/5
  transform -translate-x-full group-hover:translate-x-0
  transition-transform duration-500 ease-out"
        />

        {/* 内容 */}
        <div className="relative flex items-center gap-4">
          {/* 头像 */}
          <div className="shrink-0 w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <Image
              src={friend.logoUrl || "/avatar.png"}
              alt={friend.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 文字信息 */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-base font-semibold text-font-color mb-1.5
  group-hover:text-theme-color transition-colors truncate"
            >
              {friend.name}
            </h3>
            <p className="text-sm text-font-color-secondary leading-relaxed line-clamp-2">
              {friend.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
