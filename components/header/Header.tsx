"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/header/Logo";
import CommonActions from "@/components/header/CommonActions";
import Navigation from "@/components/header/Navigation";
import MobileMenu from "@/components/header/MobileMenu";
import SearchOverlay from "@/components/header/SearchOverlay";
import useScrollDirection from "@/hooks/useScrollDirection";

export default function Header() {
  const isVisible = useScrollDirection();
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 阻止背景滚动
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  // 滚动阈值
  const HIDE_THRESHOLD = 600;
  const BG_CHANGE_THRESHOLD = 300;

  const shouldHide = scrollY > HIDE_THRESHOLD && !isVisible;
  const showCardBg = scrollY > BG_CHANGE_THRESHOLD;

  return (
    <>
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
        <div className="w-full xl:w-xl mx-auto flex justify-between items-center h-full">
          <Logo />
          <Navigation />
          <CommonActions
            onSearchOpen={() => setIsSearchOpen(true)}
            onMenuOpen={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </motion.header>

      {/* 移动端菜单 */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* 搜索浮层 */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
