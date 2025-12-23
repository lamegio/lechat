"use client";

import { motion } from "framer-motion";
import { CommentItem } from "./CommentItem";
import type {
  CommentItem as CommentItemType,
  CommentType,
} from "@/types/comment";
import type { Session } from "@/types/auth";

interface CommentListProps {
  comments: CommentItemType[];
  total: number;
  type: CommentType;
  articleId?: string;
  session?: Session | null;
  onReply: (
    parentId: string,
    content: string,
    guestData?: {
      guestName: string;
      guestEmail: string;
      guestWebsite?: string;
    },
  ) => Promise<void>;
  onLike: (commentId: string) => Promise<void>;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export function CommentList({
  comments,
  total,
  type,
  articleId,
  session,
  onReply,
  onLike,
  onLoadMore,
  hasMore,
  isLoading,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        暂无评论，快来抢沙发吧～
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h3 className="text-base font-medium text-gray-900">{total} 条评论</h3>

      <div className="space-y-5">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <CommentItem
              comment={comment}
              type={type}
              articleId={articleId}
              session={session}
              onReply={onReply}
              onLike={onLike}
            />
          </motion.div>
        ))}
      </div>

      {/* 加载更多按钮 */}
      {hasMore && onLoadMore && (
        <div className="flex justify-center pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLoadMore}
            disabled={isLoading}
            className="px-6 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:border-gray-400 transition-colors disabled:opacity-50"
          >
            {isLoading ? "加载中..." : "加载更多"}
          </motion.button>
        </div>
      )}
    </div>
  );
}
