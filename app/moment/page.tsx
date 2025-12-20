"use client";

import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import Image from "next/image";
import { motion } from "framer-motion";

interface Moment {
  id: string;
  content: string;
  author: string;
  avatar: string;
  createdAt: string;
  images?: string[];
}

// 测试数据
const moments: Moment[] = [
  {
    id: "1",
    content:
      "今天完成了博客的动态页面设计，感觉还不错！支持 Markdown 语法，比如：**加粗文本**、*斜体文本*。",
    author: "知晓",
    avatar: "/avatar.png",
    createdAt: "2025年12月20日下午3点30分",
  },
  {
    id: "2",
    content: "分享一些最近拍的照片📸",
    author: "知晓",
    avatar: "/avatar.png",
    createdAt: "2025年12月19日上午10点15分",
    images: ["/bg-light.png", "/bg-dark.webp", "/bg-light.png"],
  },
  {
    id: "3",
    content:
      "学习 Next.js 的一些心得：\n\n• App Router 比 Pages Router 更符合直觉\n• Server Components 很强大\n• 性能优化要关注首屏加载",
    author: "知晓",
    avatar: "/avatar.png",
    createdAt: "2025年12月18日晚上9点20分",
  },
  {
    id: "4",
    content: "Hello World! 🎉 第一条动态",
    author: "知晓",
    avatar: "/avatar.png",
    createdAt: "2025年12月17日下午2点00分",
  },
];

export default function Moments() {
  return (
    <BaseContainer pageTitle="动态" pageDescription="记录生活的点点滴滴">
      <PageContentContainer>
        <div className="space-y-6">
          {/* 顶部说明 */}
          <div className="text-center pb-6 border-b border-gray-300/40 dark:border-gray-600/40">
            <p className="text-font-color-secondary leading-relaxed">
              在这里记录一些日常的想法和瞬间
            </p>
          </div>

          {/* 动态列表 */}
          <div className="space-y-6">
            {moments.map((moment, index) => (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex gap-4"
              >
                {/* 左侧头像 */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={moment.avatar}
                      alt={moment.author}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* 右侧内容区 */}
                <div className="flex-1 min-w-0">
                  {/* 作者名 */}
                  <div className="text-font-color font-medium mb-2">
                    {moment.author}
                  </div>

                  {/* 动态内容卡片 */}
                  <div className="bg-background-color-card rounded-xl p-5 border border-gray-300/40 dark:border-gray-600/40">
                    {/* 文字内容 */}
                    <div className="text-font-color-secondary leading-relaxed whitespace-pre-wrap break-words mb-3">
                      {moment.content}
                    </div>

                    {/* 图片列表 */}
                    {moment.images && moment.images.length > 0 && (
                      <div
                        className={`grid gap-2 mt-4 ${
                          moment.images.length === 1
                            ? "grid-cols-1"
                            : moment.images.length === 2
                              ? "grid-cols-2"
                              : "grid-cols-3"
                        }`}
                      >
                        {moment.images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700"
                          >
                            <Image
                              src={img}
                              alt={`图片 ${imgIndex + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 时间 */}
                    <div className="text-xs text-font-color-secondary/60 mt-3 pt-3 border-t border-gray-300/20 dark:border-gray-600/20">
                      {moment.createdAt}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 底部提示 */}
          <div className="text-center pt-6 text-sm text-font-color-secondary/60">
            - 只展示最近 30 条动态 -
          </div>
        </div>
      </PageContentContainer>
    </BaseContainer>
  );
}
