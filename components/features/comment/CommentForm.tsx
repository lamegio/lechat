"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { BsEye, BsEyeSlash, BsMarkdown } from "react-icons/bs";
import { EmojiPicker } from "@/components/ui/EmojiPicker";
import { CommentPreview } from "./CommentPreview";
import type { CommentType } from "@/types/comment";
import type { Session } from "@/types/auth";

const commentSchema = z.object({
  content: z
    .string()
    .min(1, "评论内容不能为空")
    .max(2000, "评论内容不能超过2000字"),
  displayName: z.string().min(1, "昵称不能为空").max(50, "昵称不能超过50字"),
  email: z.email("请输入有效的邮箱地址"),
  url: z.url("请输入有效的网址").optional().or(z.literal("")),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  type: CommentType;
  articleId?: string;
  parentId?: string;
  replyToName?: string;
  session?: Session | null;
  onSubmit: (data: CommentFormData) => Promise<void>;
  onCancel?: () => void;
}

export function CommentForm({
  articleId,
  parentId,
  replyToName,
  session,
  onSubmit,
  onCancel,
}: CommentFormProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = !!session;
  // const schema = isAuthenticated ? authCommentSchema : guestCommentSchema;
  const schema = commentSchema;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(schema),
    defaultValues: isAuthenticated
      ? {
          content: "",
          displayName: session.user.name || "",
          email: session.user.email || "",
          url: "",
        }
      : {
          content: "",
          displayName: "",
          email: "",
          url: "",
        },
  });

  const content = watch("content");

  const handleEmojiSelect = (emoji: string): void => {
    const currentContent = content || "";
    setValue("content", currentContent + emoji);
  };

  const onFormSubmit = async (
    data: CommentFormData,
  ): Promise<void> => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
      setShowPreview(false);
    } catch (error) {
      console.error("提交评论失败:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200"
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Meta信息区域 */}
        <div className="px-4 pt-3 pb-2 grid grid-cols-3 gap-3">
          <div>
            <input
              type="text"
              placeholder="昵称 *"
              {...register("displayName")}
              disabled={isAuthenticated}
              className="w-full px-0 py-0.5 text-[15px] border-0 focus:outline-none bg-transparent placeholder:text-gray-400 disabled:text-gray-600"
            />
            {errors.displayName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.displayName.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="邮箱 *"
              {...register("email")}
              disabled={isAuthenticated}
              className="w-full px-0 py-0.5 text-[15px] border-0 focus:outline-none bg-transparent placeholder:text-gray-400 disabled:text-gray-600"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="url"
              placeholder="网址（可选）"
              {...register("url")}
              className="w-full px-0 py-0.5 text-[15px] border-0 focus:outline-none bg-transparent placeholder:text-gray-400"
            />
            {errors.url && (
              <p className="text-xs text-red-500 mt-1">
                {errors.url.message}
              </p>
            )}
          </div>
        </div>

        {/* 虚线分割 */}
        <div className="border-t-2 border-dashed border-gray-200"></div>

        {/* 内容区域 */}
        <div className="px-4 py-3">
          <textarea
            placeholder="写下你的评论..."
            rows={4}
            {...register("content")}
            className="w-full px-0 py-0 text-[15px] border-0 focus:outline-none resize-none bg-transparent placeholder:text-gray-400"
          />
          {errors.content && (
            <p className="text-xs text-red-500 mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* 预览区域 */}
        <AnimatePresence>
          {showPreview && <CommentPreview content={content || ""} />}
        </AnimatePresence>

        {/* 工具栏和按钮在同一行 */}
        <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title="支持 Markdown"
              type="button"
            >
              <BsMarkdown size={18} />
            </motion.button>

            <EmojiPicker onEmojiSelect={handleEmojiSelect} />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title={showPreview ? "隐藏预览" : "显示预览"}
              type="button"
            >
              {showPreview ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
            </motion.button>
          </div>

          <div className="flex items-center gap-2">
            {!isAuthenticated && (
              <button
                type="button"
                className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:border-gray-400 transition-colors"
              >
                登录
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-1.5 text-sm bg-(--theme-color,#6366f1) text-white hover:opacity-90 rounded transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "提交中..." : "提交"}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
