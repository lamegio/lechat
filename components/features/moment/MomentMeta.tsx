import { IoLocationSharp } from "react-icons/io5";
import { fromNow } from "@/lib/date";

interface MomentMetaProps {
  location?: string;
  device?: string;
  createdAt: string;
}

export default function MomentMeta({
  location,
  device,
  createdAt,
}: MomentMetaProps) {
  // 获取地区的最后一级（最小范围）
  const displayLocation = location?.split(" ").pop();

  return (
    <div className="flex items-center gap-2 text-xs text-font-color-secondary/60 flex-wrap">
      {/* 地区 */}
      {displayLocation && (
        <>
          <div className="flex items-center gap-1">
            <IoLocationSharp className="w-3 h-3" />
            <span>{displayLocation}</span>
          </div>
          <span>·</span>
        </>
      )}

      {/* 相对时间 */}
      <span>{fromNow(createdAt)}</span>

      {/* 设备 */}
      {device && (
        <>
          <span>·</span>
          <span>来自 {device}</span>
        </>
      )}
    </div>
  );
}
