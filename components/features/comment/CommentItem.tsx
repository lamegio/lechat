"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { CommentMeta } from "./CommentMeta";
import { CommentForm } from "./CommentForm";
import GoogleIcon from "@/components/ui/GoogleIcon";
import type {
  CommentItem as CommentItemType,
  CommentType,
} from "@/types/comment";
import type { Session } from "@/types/auth";
import { LoginProvider } from "@/types/comment";
import { formatLocalDateTime } from "@/lib/date";

interface CommentItemProps {
  comment: CommentItemType;
  type: CommentType;
  articleId?: string;
  session?: Session | null;
  onReply: (
    parentId: string,
    content: string,
    displayName: string,
    email: string,
    url?: string,
  ) => Promise<void>;
  onLike: (commentId: string) => Promise<void>;
  level?: number;
}

export function CommentItem({
  comment,
  type,
  articleId,
  session,
  onReply,
  onLike,
  level = 0,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const isAuthenticated = !!session;
  const handleReply = async (data: {
    content: string;
    displayName: string;
    email: string;
    url?: string;
  }): Promise<void> => {
    // if (isAuthenticated) {
    await onReply(
      comment.id,
      data.content,
      data.displayName,
      data.email,
      data.url,
    );
    // } else {
    //   await onReply(comment.id, formData.content, {
    //     displayName: formData.displayName!,
    //     email: formData.email!,
    //     url: formData.url,
    //   });
    // }
    setShowReplyForm(false);
  };

  const handleLike = async (): Promise<void> => {
    if (!isAuthenticated) {
      alert("请先登录后再点赞");
      return;
    }

    setIsLiking(true);
    try {
      await onLike(comment.id);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4"
    >
      {/* 头像 */}
      <div className="relative w-12 h-12 shrink-0">
        <Image
          src={comment.avatar}
          alt={comment.displayName}
          width={100}
          height={100}
          className="w-full h-full rounded-full object-cover"
        />
        {/* 登录方式图标 */}
        {comment.loginProvider && (
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-gray-200/50">
            {comment.loginProvider === LoginProvider.GITHUB ? (
              <FaGithub size={9} className="text-gray-700" />
            ) : (
              <GoogleIcon />
            )}
          </span>
        )}
      </div>

      {/* 内容区 */}
      <div className="flex-1 min-w-0">
        {/* 第一行：用户名、角色标签、时间、回复按钮 */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[15px] font-medium text-gray-900">
              {comment.displayName}
            </span>
            {comment.isAdmin && (
              <span className="px-2 py-0.5 text-xs bg-red-50 text-red-600 rounded">
                {comment.displayName}
              </span>
            )}
            <span className="text-xs text-gray-400">
              {formatLocalDateTime(comment.createdAt)}
            </span>
          </div>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-xs text-gray-500 hover:text-(--theme-color,#6366f1) transition-colors"
          >
            回复
          </button>
        </div>

        {/* 第二行：元信息（位置、设备） */}
        <CommentMeta
          // createdAt={comment.createdAt}
          location={comment.location}
          device={comment.device}
        />

        {/* 回复提示 */}
        {comment.replyToName && (
          <div className="mb-1.5">
            <span
              className="text-xs font-medium"
              style={{ color: "var(--theme-color, #6366f1)" }}
            >
              @{comment.replyToName}
            </span>
          </div>
        )}

        {/* 评论内容 */}
        <div className="text-[15px] text-gray-700 leading-relaxed mb-4">
          {comment.content}
          {/* TODO: 这里后续需要添加 Markdown 渲染逻辑 */}
        </div>

        {/* 回复表单 */}
        {showReplyForm && (
          <div className="mb-4">
            <CommentForm
              type={type}
              articleId={articleId}
              parentId={comment.id}
              replyToName={comment.displayName}
              session={session}
              onSubmit={handleReply}
              onCancel={() => setShowReplyForm(false)}
            />
          </div>
        )}

        {/* 子回复列表 */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                type={type}
                articleId={articleId}
                session={session}
                onReply={onReply}
                onLike={onLike}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
