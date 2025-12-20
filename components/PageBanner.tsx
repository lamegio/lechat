"use client";

import { useTheme } from "next-themes";
import useMounted from "@/hooks/useMounted";
import { useSiteBackground } from "@/hooks/useConfigApi";

interface PageBannerProps {
  title: string;
  description?: string;
}

export default function PageBanner({ title, description }: PageBannerProps) {
  const { resolvedTheme } = useTheme();
  const siteBackground = useSiteBackground();
  const isMounted = useMounted();

  if (!isMounted) return null;

  const bannerImageUrl =
    resolvedTheme === "dark"
      ? siteBackground?.dark
      : siteBackground?.light;

  // 如果没有背景图，不渲染 banner
  if (!bannerImageUrl) return null;

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      {/* 背景图层 */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${bannerImageUrl})` }}
      />

      {/* 双层渐变遮罩 */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

      {/* 内容区域 */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        {/* 标题 */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-medium text-white
                     leading-tight tracking-tight mb-4
                     animate-in fade-in zoom-in-95 duration-700"
          style={{
            textShadow: `
              0 1px 0 rgba(0, 0, 0, 0.4),
              0 2px 4px rgba(0, 0, 0, 0.3),
              0 4px 8px rgba(0, 0, 0, 0.2),
              0 8px 16px rgba(0, 0, 0, 0.1)
            `,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>

        {/* 说明文字 */}
        {description && (
          <div className="relative">
            <div className="absolute inset-0 bg-white/5 blur-xl rounded-full" />

            <p
              className="relative text-lg md:text-xl text-white/90 font-light
                         leading-relaxed max-w-3xl px-8
                         animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150"
              style={{
                textShadow: `
                  0 1px 2px rgba(0, 0, 0, 0.5),
                  0 2px 4px rgba(0, 0, 0, 0.3)
                `,
                letterSpacing: "0.01em",
              }}
            >
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
