"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSiteInfo } from "@/hooks/useConfigApi";

export default function HomeBannerInfo1() {
  const siteInfo = useSiteInfo();
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [lastTypedIndex, setLastTypedIndex] = useState(-1);

  const subtitle = siteInfo?.subtitle || "";
  const titleDelay = (siteInfo?.title?.length || 0) * 0.1 + 0.5;

  // 打字机效果
  useEffect(() => {
    if (!subtitle) return;

    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < subtitle.length) {
          setTypedText(subtitle.slice(0, currentIndex + 1));
          setLastTypedIndex(currentIndex);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }, titleDelay * 1000);

    return () => clearTimeout(startTimer);
  }, [subtitle, titleDelay]);

  // 光标闪烁 - 打字时不闪烁
  useEffect(() => {
    if (isTyping) {
      setShowCursor(true);
      return;
    }

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [isTyping]);

  return (
    <div className="absolute mx-auto w-full leading-12 text-white text-center font-bold text-shadow-chat">
      {/* 标题 */}
      <div className="text-7xl mb-4">
        {siteInfo?.title &&
          siteInfo.title.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
      </div>

      {/* 打字机副标题 */}
      <div className="text-3xl font-mono">
        {typedText.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block ${
              index === lastTypedIndex ? "char-pop" : ""
            }`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        <span
          className={`inline-block w-[3px] h-[1.2em] bg-white ml-[2px] align-middle ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 0s" }}
        />
      </div>

      <style jsx>{`
        @keyframes char-pop {
          0% {
            opacity: 0;
            transform: translateY(5px);
          }
          50% {
            opacity: 1;
            transform: translateY(0);
            filter: brightness(1.5)
              drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: brightness(1) drop-shadow(0 0 0 transparent);
          }
        }

        .char-pop {
          animation: char-pop 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
