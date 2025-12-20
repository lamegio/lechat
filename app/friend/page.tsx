"use client";

import { useState } from "react";
import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface FriendLink {
  id: string;
  name: string;
  description: string;
  url: string;
  avatar: string;
}

// 测试数据
const friendLinks: FriendLink[] = [
  {
    id: "1",
    name: "某某的博客",
    description: "专注前端开发与技术分享",
    url: "https://example.com",
    avatar: "/avatar.png",
  },
  {
    id: "2",
    name: "技术驿站",
    description: "记录编程路上的点点滴滴",
    url: "https://example2.com",
    avatar: "/avatar.png",
  },
  {
    id: "3",
    name: "代码之光",
    description: "探索代码的无限可能",
    url: "https://example3.com",
    avatar: "/avatar.png",
  },
  {
    id: "4",
    name: "前端笔记",
    description: "分享前端开发经验与心得",
    url: "https://example4.com",
    avatar: "/avatar.png",
  },
  {
    id: "5",
    name: "全栈之路",
    description: "从前端到后端的技术探索",
    url: "https://example5.com",
    avatar: "/avatar.png",
  },
  {
    id: "6",
    name: "设计师日记",
    description: "UI/UX 设计与交互思考",
    url: "https://example6.com",
    avatar: "/avatar.png",
  },
];

export default function FriendLinks() {
  const [activeTab, setActiveTab] = useState<"info" | "apply">("info");

  return (
    <BaseContainer
      pageTitle="友情链接"
      pageDescription="海内存知己，天涯若比邻"
    >
      <PageContentContainer>
        <div className="space-y-10">
          {/* 顶部说明 */}
          <div className="text-center">
            <p className="text-font-color-secondary leading-relaxed">
              这里收录了一些优秀的个人博客和技术站点，期待与更多朋友交换友链
            </p>
          </div>

          {/* 友链卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friendLinks.map((link) => (<Link

              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative overflow-hidden"
              >
              <div
              className="h-full bg-background-color-card rounded-xl p-5
              border border-gray-300/40 dark:border-gray-600/40
              transition-all duration-300
              hover:-translate-y-1 relative"
              >
            {/* hover 背景色从左到右填充 */}
              <div
              className="absolute inset-0 bg-theme-color/5
                               transform -translate-x-full group-hover:translate-x-0
                               transition-transform duration-500 ease-out"
              />

            {/* 内容 */}
              <div className="relative flex items-center gap-4">
            {/* 头像 */}
            <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              <Image
                src={link.avatar}
                alt={link.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 文字信息 */}
            <div className="flex-1 min-w-0">
              <h3
                className="text-base font-semibold text-font-color mb-1.5
                                   group-hover:text-theme-color transition-colors truncate"
              >
                {link.name}
              </h3>
              <p className="text-sm text-font-color-secondary leading-relaxed line-clamp-2">
                {link.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
      ))}
    </div>

{/* 底部 Tab 区域 */}
  <div className="mt-16 pt-8">
    {/* 分段控制器 */}
    <div className="flex justify-center mb-6">
      <div className="inline-flex bg-gray-200/30 dark:bg-gray-800/30 rounded-lg p-1 border border-gray-300/40 dark:border-gray-600/40">
        <button
          onClick={() => setActiveTab("info")}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200
                    ${
            activeTab === "info"
              ? "bg-theme-color text-white shadow-sm"
              : "text-font-color-secondary hover:text-font-color"
          }`}
        >
          本站信息
        </button>
        <button
          onClick={() => setActiveTab("apply")}
          className={`px-6 py-2 rounded-md font-medium transition-all duration-200
                    ${
            activeTab === "apply"
              ? "bg-theme-color text-white shadow-sm"
              : "text-font-color-secondary hover:text-font-color"
          }`}
        >
          申请格式
        </button>
      </div>
    </div>

    {/* Tab 内容 - 统一边框样式 */}
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-background-color-card rounded-xl p-6 border border-gray-300/40 dark:border-gray-600/40"
    >
      {activeTab === "info" ? (
        <div>
          <h3 className="text-lg font-semibold text-font-color mb-4">
            添加本站友链请使用以下信息
          </h3>
          <div className="space-y-3 text-font-color-secondary">
            <div className="flex items-center">
              <span className="w-20 text-font-color font-medium">名称：</span>
              <span>LeChat</span>
            </div>
            <div className="flex items-center">
              <span className="w-20 text-font-color font-medium">简介：</span>
              <span>Sharing knowledge and experiences</span>
            </div>
            <div className="flex items-center">
              <span className="w-20 text-font-color font-medium">链接：</span>
              <span className="break-all">https://yourdomain.com</span>
            </div>
            <div className="flex items-center">
              <span className="w-20 text-font-color font-medium">头像：</span>
              <span className="break-all">
                        https://yourdomain.com/avatar.png
                      </span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-font-color mb-4">
            如何申请友链
          </h3>
          <div className="space-y-4 text-font-color-secondary">
            <div>
              <p className="mb-3">
                请先添加本站友链，然后按以下格式留言或发送邮件：
              </p>
              <div className="bg-background-color-page rounded-lg p-4 font-mono text-sm">
                <p>名称：您的网站名称</p>
                <p>简介：网站简介（20字以内）</p>
                <p>链接：https://yoursite.com</p>
                <p>头像：https://yoursite.com/avatar.png</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-font-color mb-2">友链要求：</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>内容健康积极，无违法违规信息</li>
                <li>网站能够正常访问，建议启用 HTTPS</li>
                <li>定期更新内容（非长期停更状态）</li>
                <li>优先考虑技术类、设计类、个人博客类网站</li>
              </ul>
            </div>
            <div className="pt-2">
              <p className="text-sm">
                <span className="font-medium text-font-color">联系方式：</span>
                在本页面评论留言 或 发送邮件至 admin@yourdomain.com
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  </div>
</div>
</PageContentContainer>
</BaseContainer>
);
}