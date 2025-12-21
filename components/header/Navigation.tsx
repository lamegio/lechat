"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFileText,
  FiInfo,
  FiLink,
  FiMessageSquare,
  FiArchive,
  FiFolder,
  FiTag,
  FiHome,
  FiUser,
  FiActivity,
  FiHeart,
} from "react-icons/fi";

interface SubMenuItem {
  id: number;
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavItem {
  id: number;
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  subMenu?: SubMenuItem[];
}

export default function Navigation() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const navList: NavItem[] = [
    {
      id: 1,
      name: "文章",
      path: "/article",
      icon: FiFileText,
      subMenu: [
        { id: 11, name: "归档", path: "/archive", icon: FiArchive },
        { id: 12, name: "分类", path: "/category", icon: FiFolder },
      ],
    },
    {
      id: 3,
      name: "友链",
      path: "/friend",
      icon: FiLink,
    },
    {
      id: 4,
      name: "留言",
      path: "/message",
      icon: FiMessageSquare,
    },
    {
      id: 5,
      name: "动态",
      icon: FiInfo,
      path: "/moment",
    },
    {
      id: 2,
      name: "关于",
      path: "/about",
      icon: FiInfo,
    },
  ];

  return (
    <nav className="hidden lg:flex h-full justify-center items-center gap-2">
      {navList.map((item) => (
        <div
          key={item.id}
          className="relative h-full flex items-center"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Link
            className="flex items-center gap-2 hover:bg-theme-color rounded-sm hover:text-link-hover-font-color py-1 px-5 text-xl leading-none transition-colors duration-200"
            href={item.path}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>

          {/* 二级菜单 */}
          <AnimatePresence>
            {hoveredId === item.id && item.subMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 bg-background-color-transparent-1 shadow-chat-card-shadow rounded-md border border-theme-color backdrop-blur-sm w-max"
              >
                {item.subMenu.map((subItem) => (
                  <Link
                    key={subItem.id}
                    href={subItem.path}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-theme-color hover:text-link-hover-font-color transition-colors duration-200 text-base first:rounded-t-md last:rounded-b-md"
                  >
                    <subItem.icon className="w-4 h-4" />
                    {subItem.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}
