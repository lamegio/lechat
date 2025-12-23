"use client";

import { BsEye, BsEyeSlash, BsMarkdown } from "react-icons/bs";
import { motion } from "framer-motion";
import { EmojiPicker } from "@/components/ui/EmojiPicker";

interface CommentToolbarProps {
  showPreview: boolean;
  onTogglePreview: () => void;
  onEmojiSelect: (emoji: string) => void;
}

export function CommentToolbar({
  showPreview,
  onTogglePreview,
  onEmojiSelect,
}: CommentToolbarProps) {
  return (
    <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-1.5 relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          title="支持 Markdown"
          type="button"
        >
          <BsMarkdown size={18} />
        </motion.button>

        <EmojiPicker onEmojiSelect={onEmojiSelect} />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onTogglePreview}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          title={showPreview ? "隐藏预览" : "显示预览"}
          type="button"
        >
          {showPreview ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
        </motion.button>
      </div>
    </div>
  );
}
