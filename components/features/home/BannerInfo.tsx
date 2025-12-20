"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSiteBasic } from "@/hooks/useConfigApi";

export default function HomeBannerInfo1() {
  const [showCursor, setShowCursor] = useState(true);
  const siteInfo = useSiteBasic();

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute mx-auto w-full leading-12 text-white text-center font-bold text-shadow-chat">
      {/* 第一行：字母逐个弹出 */}
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

      {/* 第二行：打字机效果 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-3xl"
      >
        {siteInfo?.subtitle &&
          siteInfo.subtitle.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.8 + index * 0.15,
                duration: 0.1,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        <motion.span
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
          className="inline-block ml-1 text-4xl"
        >
          |
        </motion.span>
      </motion.div>
    </div>
  );
}
