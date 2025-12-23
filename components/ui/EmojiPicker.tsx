"use client";

import { useState, useRef, useEffect } from "react";
import EmojiPickerReact, { EmojiClickData } from "emoji-picker-react";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleEmojiClick(emojiData: EmojiClickData) {
    onEmojiSelect(emojiData.emoji);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
        aria-label="选择表情"
      >
        <Smile size={20} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50">
          <EmojiPickerReact
            onEmojiClick={handleEmojiClick}
            width={320}
            height={400}
            searchPlaceHolder="搜索表情..."
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </div>
  );
}
