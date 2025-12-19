"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimers = useRef<NodeJS.Timeout[]>([]);

  // 清理定时器
  const clearTimers = () => {
    progressTimers.current.forEach(clearTimeout);
    progressTimers.current = [];
  };

  // 监听链接点击
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor?.href) {
        const currentUrl = window.location.href;
        const targetUrl = anchor.href;

        if (
          targetUrl !== currentUrl &&
          !targetUrl.startsWith("#") &&
          anchor.target !== "_blank"
        ) {
          clearTimers();
          setIsLoading(true);
          setProgress(0);

          // 模拟进度增长，但停在 85% 等待真正完成
          progressTimers.current.push(
            setTimeout(() => setProgress(30), 100),
            setTimeout(() => setProgress(50), 300),
            setTimeout(() => setProgress(70), 500),
            setTimeout(() => setProgress(85), 800),
            // 不再自动到 100%，等路由变化时才完成
          );
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      clearTimers();
    };
  }, []);

  // 路由变化时完成进度
  useEffect(() => {
    if (!isLoading) return;

    clearTimers();

    // 立即跳到 100%
    const completeTimer = setTimeout(() => {
      setProgress(100);

      // 停留一会再消失
      const finishTimer = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 400);

      progressTimers.current.push(finishTimer);
    }, 0);

    progressTimers.current.push(completeTimer);

    return () => clearTimers();
  }, [pathname, searchParams, isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-9999 h-[3px] overflow-hidden"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full relative"
            style={{
              background:
                "linear-gradient(to right, #ff6b6b 0%, #ff6b6b 16.66%, #feca57 16.66%, #feca57 33.33%, #48dbfb 33.33%, #48dbfb 50%, #1dd1a1 50%, #1dd1a1 66.66%, #5f27cd 66.66%, #5f27cd 83.33%, #ff9ff3 83.33%, #ff9ff3 100%)",
              boxShadow: "0 0 10px rgba(255, 107, 107, 0.5)",
            }}
          >
            {/* 斜纹滚动动画 */}
            <motion.div
              animate={{
                backgroundPosition: ["0px 0px", "20px 20px"],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, transparent 25%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.3) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.3) 75%)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* 右侧光晕 */}
            <div
              className="absolute right-0 top-0 h-full w-24 opacity-70"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8))",
                filter: "blur(8px)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
