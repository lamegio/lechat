"use client";

import { Menu, Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CommonActionsProps {
  onSearchOpen: () => void;
  onMenuOpen: () => void;
}

export default function CommonActions({
  onSearchOpen,
  onMenuOpen,
}: CommonActionsProps) {
  return (
    <div className="flex items-center gap-2 min-w-40 justify-end">
      {/* 搜索按钮 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSearchOpen}
        className="flex items-center gap-2 hover:bg-theme-color rounded-sm hover:text-link-hover-font-color py-1 px-3 transition-colors duration-200 cursor-pointer backdrop-blur-md"
        aria-label="搜索"
      >
        <SearchIcon className="w-5 h-5" />
        <span className="hidden xl:inline text-base">搜索</span>
      </motion.button>

      {/* 移动端菜单按钮 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onMenuOpen}
        className="flex items-center gap-2 hover:bg-theme-color rounded-sm hover:text-link-hover-font-color py-1 px-3 transition-colors duration-200 cursor-pointer lg:hidden"
        aria-label="菜单"
      >
        <Menu className="w-5 h-5" />
        <span className="hidden sm:inline text-base">菜单</span>
      </motion.button>
    </div>
  );
}
