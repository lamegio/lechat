"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/header/Logo";
import CommonActions from "@/components/header/CommonActions";
import Navigation from "@/components/header/Navigation";
import useScrollDirection from "@/hooks/useScrollDirection";

export default function Header() {
  const isVisible = useScrollDirection();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 滚动阈值
  const HIDE_THRESHOLD = 500; // 滚动超过 200px 才开始自动隐藏
  const BG_CHANGE_THRESHOLD = 300; // 滚动超过 100px 背景变色

  // 是否应该隐藏（只有滚动超过阈值才考虑隐藏）
  const shouldHide = scrollY > HIDE_THRESHOLD && !isVisible;

  // 是否显示卡片背景
  const showCardBg = scrollY > BG_CHANGE_THRESHOLD;

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: shouldHide ? "-100%" : 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={`
        fixed top-0 left-0 z-90 w-full h-16
        text-font-color-navbar px-4
        backdrop-blur-sm
        transition-colors duration-300
        ${
          showCardBg
            ? "bg-background-color-transparent-1 shadow-chat-card-shadow"
            : "bg-nav-background-color"
        }
      `}
    >
      <div className="w-full xl:w-xl mx-auto flex justify-between items-center leading-16 h-full">
        <Logo />
        <Navigation />
        <CommonActions />
      </div>
    </motion.header>
  );
}
