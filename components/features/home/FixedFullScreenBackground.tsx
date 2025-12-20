"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import useMounted from "@/hooks/useMounted";
import { useSiteBackground } from "@/hooks/useConfigApi";

export default function FixedFullScreenBackground() {
  const { resolvedTheme } = useTheme();
  const isMounted = useMounted();
  const [scrollY, setScrollY] = useState(0);

  const siteBackground = useSiteBackground();

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted || !resolvedTheme) return null;

  const bgImageUrl =
    resolvedTheme === "dark" ? siteBackground?.dark : siteBackground?.light;

  // 滚动阈值：300px 开始模糊，800px 达到最大模糊
  const blurStart = 300;
  const blurEnd = 800;

  // 计算模糊程度：0-20px
  const calculateBlur = (): number => {
    if (scrollY <= blurStart) return 0;
    if (scrollY >= blurEnd) return 20;

    const progress = (scrollY - blurStart) / (blurEnd - blurStart);
    return progress * 20;
  };

  // 计算不透明度：降低背景亮度
  const calculateOpacity = (): number => {
    if (scrollY <= blurStart) return 1;
    if (scrollY >= blurEnd) return 0.7;

    const progress = (scrollY - blurStart) / (blurEnd - blurStart);
    return 1 - progress * 0.3;
  };

  const blurValue = calculateBlur();
  const opacityValue = calculateOpacity();

  if (!bgImageUrl) { return null}

  return (
    <div className="fixed inset-0 -z-50">
      {/* 原始背景图 */}
      <div
        style={{
          opacity: opacityValue,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <Image
          src={bgImageUrl}
          alt="home background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* 玻璃模糊层 */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-white/10 dark:bg-black/10"
        style={{
          backdropFilter: `blur(${blurValue}px)`,
          WebkitBackdropFilter: `blur(${blurValue}px)`,
          opacity: scrollY > blurStart ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
    </div>
  );
}
