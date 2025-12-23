"use client";

import { motion } from "framer-motion";

interface CommentPreviewProps {
  content: string;
}

export function CommentPreview({ content }: CommentPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="border-t-2 border-dashed border-gray-200"></div>
      <div className="px-4 py-3 bg-gray-50/50">
        <div className="text-xs text-gray-400 mb-2">预览</div>
        <div className="text-[15px] text-gray-700">
          {content || "预览内容将显示在这里..."}
          {/* TODO: 这里后续需要添加 Markdown 渲染逻辑 */}
        </div>
      </div>
    </motion.div>
  );
}
