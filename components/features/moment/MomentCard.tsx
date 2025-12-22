"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IoPinSharp } from "react-icons/io5";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import type { MomentItem } from "@/types/moment";
import MomentMeta from "./MomentMeta";
import MomentImage from "./MomentImage";

interface MomentCardProps {
  moment: MomentItem;
  index: number;
}

export default function MomentCard({ moment, index }: MomentCardProps) {
  const isPrivate = moment.status === "private";

  // TODO: 点赞功能 - 待实现
  const handleLike = () => {
    console.log("点赞功能待实现", moment.id);
  };

  // TODO: 评论功能 - 待实现
  const handleComment = () => {
    console.log("评论功能待实现", moment.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex gap-4"
    >
      {/* 左侧头像 - 改为圆角矩形 */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 ring-2 ring-gray-200/50 dark:ring-gray-600/50">
          <Image
            src={moment.authorAvatar}
            alt={moment.authorName}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 min-w-0">
        {/* 作者名 */}
        <div className="text-font-color font-semibold text-base mb-2">
          {moment.authorName}
        </div>

        {/* 动态内容卡片 */}
        <div className="relative bg-white dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
          {/* 置顶标识 - 右上角图钉 */}
          {moment.isPinned && (
            <div className="absolute top-3 right-3">
              <IoPinSharp className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            </div>
          )}

          {/* 私密内容展示 */}
          {isPrivate ? (
            <div className="flex items-center justify-center py-8 text-font-color-secondary/60">
              <span className="text-sm">🔒 这是一条私密动态</span>
            </div>
          ) : (
            <>
              {/* 文字内容 */}
              <div className="text-font-color-secondary text-sm leading-relaxed whitespace-pre-wrap break-words">
                {moment.content}
              </div>

              {/* 图片列表 */}
              {moment.images && moment.images.length > 0 && (
                <MomentImage images={moment.images} />
              )}
            </>
          )}

          {/* 底部元数据和操作区 - 同一行 */}
          <div className="mt-4 pt-4 border-t border-gray-200/40 dark:border-gray-700/40">
            <div className="flex items-center justify-between">
              {/* 左侧：时间、地区、设备 */}
              <MomentMeta
                location={moment.location}
                device={moment.device}
                createdAt={moment.createdAt}
              />

              {/* 右侧：点赞和评论按钮 */}
              {!isPrivate && (
                <div className="flex items-center gap-4">
                  {/* TODO: 点赞按钮 - 功能待实现 */}
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-1.5 text-font-color-secondary/70 hover:text-red-500 transition-colors group"
                    aria-label="点赞"
                  >
                    <AiOutlineHeart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{moment.likeCount}</span>
                  </button>

                  {/* TODO: 评论按钮 - 功能待实现 */}
                  <button
                    onClick={handleComment}
                    className="flex items-center gap-1.5 text-font-color-secondary/70 hover:text-blue-500 transition-colors group"
                    aria-label="评论"
                  >
                    <AiOutlineComment className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">评论</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
