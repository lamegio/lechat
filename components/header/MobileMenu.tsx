"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
  FiChevronDown,
  FiChevronRight,
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const navList: NavItem[] = [
    {
      id: 1,
      name: "文章",
      path: "/article",
      icon: FiFileText,
      subMenu: [
        { id: 11, name: "归档", path: "/article/archive", icon: FiArchive },
        { id: 12, name: "分类", path: "/article/category", icon: FiFolder },
        { id: 13, name: "标签", path: "/article/tag", icon: FiTag },
      ],
    },
    {
      id: 2,
      name: "关于",
      path: "/about",
      icon: FiInfo,
      subMenu: [
        { id: 21, name: "本站", path: "/about/site", icon: FiHome },
        { id: 22, name: "作者", path: "/about/author", icon: FiUser },
        { id: 23, name: "动态", path: "/about/timeline", icon: FiActivity },
      ],
    },
    {
      id: 3,
      name: "链接",
      path: "/link",
      icon: FiLink,
      subMenu: [
        { id: 31, name: "友情链接", path: "/link/friends", icon: FiHeart },
      ],
    },
    {
      id: 4,
      name: "留言",
      path: "/message",
      icon: FiMessageSquare,
    },
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* 侧边菜单 */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 z-[101] h-screen w-[280px] bg-background-color-transparent-1 backdrop-blur-sm shadow-chat-card-shadow flex flex-col"
          >
            {/* 头部 */}
            <div className="flex items-center justify-between p-4 border-b border-theme-color/30">
              <Link
                href="/public"
                onClick={onClose}
                className="flex items-center gap-2"
              >
                <Image src="/logo.svg" width={40} height={40} alt="Logo" />
                <span className="font-bold text-xl">CHAT</span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 hover:bg-theme-color rounded-md transition-colors duration-200"
                aria-label="关闭菜单"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 导航列表 */}
            <nav className="flex-1 overflow-y-auto py-4">
              {navList.map((item) => (
                <div key={item.id}>
                  {/* 一级导航 */}
                  <div className="px-4">
                    {item.subMenu ? (
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="w-full flex items-center justify-between gap-3 py-3 hover:bg-theme-color hover:text-link-hover-font-color rounded-md px-3 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="text-lg">{item.name}</span>
                        </div>
                        {expandedId === item.id ? (
                          <FiChevronDown className="w-4 h-4" />
                        ) : (
                          <FiChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={onClose}
                        className="flex items-center gap-3 py-3 hover:bg-theme-color hover:text-link-hover-font-color rounded-md px-3 transition-colors duration-200"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-lg">{item.name}</span>
                      </Link>
                    )}
                  </div>

                  {/* 二级菜单 */}
                  <AnimatePresence>
                    {expandedId === item.id && item.subMenu && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 py-2 space-y-1">
                          {item.subMenu.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.path}
                              onClick={onClose}
                              className="flex items-center gap-3 py-2 pl-12 pr-3 hover:bg-theme-color hover:text-link-hover-font-color rounded-md transition-colors duration-200 text-base"
                            >
                              <subItem.icon className="w-4 h-4" />
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* 底部信息（可选） */}
            <div className="p-4 border-t border-theme-color/30 text-sm text-center opacity-70">
              © 2024 CHAT
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
