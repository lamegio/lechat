"use client";

import { useState, useEffect } from "react";

export default function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 10; // 滚动灵敏度
    const showThreshold = 100; // 隐藏的触发距离

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 在顶部始终显示
      if (currentScrollY < showThreshold) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // 判断滚动方向
      if (currentScrollY > lastScrollY + threshold) {
        // 向下滚动 - 隐藏
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - threshold) {
        // 向上滚动 - 显示
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible;
}
