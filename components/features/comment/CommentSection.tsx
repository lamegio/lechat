"use client";

import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { useCommentMutations } from "@/hooks/useCommentMutation";
import { useSession } from "@/hooks/useAuth";
import {
  CommentType,
  CreateCommentRequest,
} from "@/types/comment";
import { motion } from "framer-motion";
import useMounted from "@/hooks/useMounted";

interface CommentSectionProps {
  type: CommentType;
  articleId?: string;
}

export function CommentSection({ type, articleId }: CommentSectionProps) {
  const { data: session } = useSession();
  console.log('se: ', session);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // const { data, error, isLoading, mutate } = useComments({
  //   type,
  //   articleId,
  //   page,
  //   pageSize,
  // });
  const data = getData();
  const error = null;
  const isLoading = false;
  const mutate = () => console.log("mutate...");

  const { createComment, likeComment, unlikeComment, revalidateComments } =
    useCommentMutations();

  const handleSubmitComment = async (formData: unknown): Promise<void> => {
    const data = formData as {
      content: string;
      guestName?: string;
      guestEmail?: string;
      guestWebsite?: string;
    };

    const request: CreateCommentRequest = {
      content: data.content,
      type,
      articleId,
    };

    if (!session) {
      request.guestName = data.guestName;
      request.guestEmail = data.guestEmail;
    }

    await createComment(request);
    revalidateComments({ type, articleId, page: 1, pageSize });
    mutate();
  };

  const handleReply = async (
    parentId: string,
    content: string,
    guestData?: {
      guestName: string;
      guestEmail: string;
      guestWebsite?: string;
    },
  ): Promise<void> => {
    const request: CreateCommentRequest = {
      content,
      type,
      articleId,
      parentId,
    };

    if (!session && guestData) {
      request.guestName = guestData.guestName;
      request.guestEmail = guestData.guestEmail;
    }

    await createComment(request);
    revalidateComments({ type, articleId, page, pageSize });
    mutate();
  };

  const handleLike = async (commentId: string): Promise<void> => {
    const comment = data?.items.find((c) => c.id === commentId);
    if (!comment) return;

    if (comment.isLiked) {
      await unlikeComment(commentId);
    } else {
      await likeComment(commentId);
    }

    mutate();
  };

  const handleLoadMore = (): void => {
    setPage((prev) => prev + 1);
  };

  const isMounted = useMounted();
  if (!isMounted) {return null}

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6"
    >
      {/* 评论输入区 */}
      <CommentForm
        type={type}
        articleId={articleId}
        session={session}
        onSubmit={handleSubmitComment}
      />

      {/* 评论列表 */}
      {isLoading && !data ? (
        <div className="text-center py-12 text-gray-400">加载中...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          加载失败，请稍后重试
        </div>
      ) : (
        <CommentList
          comments={data?.items || []}
          total={data?.total || 0}
          type={type}
          articleId={articleId}
          session={session}
          onReply={handleReply}
          onLike={handleLike}
          onLoadMore={data?.hasMore ? handleLoadMore : undefined}
          hasMore={data?.hasMore}
          isLoading={isLoading}
        />
      )}
    </motion.div>
  );
}

function getData() {
  return {
    total: 3,
    page: 1,
    pageSize: 10,
    hasMore: false,
    items: [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        content: "欢迎大家在这里留言交流！😊 有任何问题都可以问我哦～",
        createdAt: "2025-12-20T15:15:00Z",
        likeCount: 5,
        isLiked: false,
        authorId: "admin-001",
        displayName: "小橘猫",
        avatar: "/avatar.png",
        loginProvider: "github",
        device: "Chrome",
        location: "广东",
        replies: [],
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        content:
          "感谢分享这个主题，界面设计真的很漂亮！想问一下这个评论系统支持 **Markdown** 语法吗？",
        createdAt: "2025-12-21T10:32:00Z",
        likeCount: 2,
        isLiked: false,
        displayName: "访客A",
        avatar: "/avatar.png",
        loginProvider: "github",
        articleId: "article-123",
        device: "Safari",
        location: "新加坡",
        replies: [
          {
            id: "550e8400-e29b-41d4-a716-446655440003",
            content: "当然支持啦！你可以使用 **粗体**、*斜体*、`代码` 等语法～",
            createdAt: "2025-12-21T14:20:00Z",
            likeCount: 1,
            isLiked: false,
            displayName: "路人B",
            avatar: "/avatar.png",
            loginProvider: "google",
            replyToName: "访客A",
            device: "Chrome",
            location: "日本",
            replies: [],
          },
        ],
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        content: "这个博客写得真不错，已收藏！",
        createdAt: "2025-12-22T09:15:00Z",
        likeCount: 0,
        isLiked: false,
        displayName: "匿名访客",
        parentId: null,
        device: "Web",
        location: "美国",
        replies: [],
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440005",
        content: "期待更多精彩内容！💪",
        createdAt: "2025-12-22T16:30:00Z",
        likeCount: 3,
        isLiked: true,
        displayName: "技术爱好者",
        avatar: "/avatar.png",
        loginProvider: "github",
        device: "FireFox",
        location: "邯郸",
        replies: [],
      },
    ],
  };
}
