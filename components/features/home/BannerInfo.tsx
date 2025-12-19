"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function HomeBannerInfo() {
  return (
    <div className="absolute mx-auto w-full leading-12 text-white text-center font-bold text-shadow-chat">
      {/* 第一行：从左右两侧划入 */}
      <div className="text-7xl mb-4 overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0, rotate: -10 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          className="inline-block mr-3"
        >
          LE
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0, rotate: 10 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            type: "spring",
            stiffness: 100,
          }}
          className="inline-block"
        >
          CHAT
        </motion.div>
      </div>

      {/* 第二行：波浪弹跳 */}
      <div className="text-3xl">
        {"Meow...".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: [20, -10, 0],
              opacity: 1,
            }}
            transition={{
              delay: 0.8 + index * 0.1,
              duration: 0.6,
              times: [0, 0.5, 1],
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
        {/* 猫爪emoji装饰 */}
        <motion.span
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 1.5,
            type: "spring",
            stiffness: 200,
          }}
          className="inline-block ml-2"
        >
          🐾
        </motion.span>
      </div>
    </div>
  );
}

export default function HomeBannerInfo1() {
  const [showCursor, setShowCursor] = useState(true);

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
        {"LE CHAT".split("").map((char, index) => (
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
        {"Meow...".split("").map((char, index) => (
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

export function BannerInfo2() {
  return (
    <div className="absolute mx-auto w-full leading-12 text-center font-bold">
      {/* 第一行：呼吸缩放 + 彩虹渐变 */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.2, 1],
          opacity: 1,
        }}
        transition={{
          duration: 1,
          times: [0, 0.6, 1],
          type: "spring",
        }}
        className="text-7xl mb-4"
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 20px #ff6b6b",
              "0 0 20px #feca57",
              "0 0 20px #48dbfb",
              "0 0 20px #ff6b6b",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          LE CHAT
        </motion.span>
      </motion.div>

      {/* 第二行：字母摇摆 */}
      <div className="text-3xl text-white text-shadow-chat">
        {"Meow...".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              opacity: { delay: 0.5 + index * 0.1, duration: 0.3 },
              y: { delay: 0.5 + index * 0.1, duration: 0.3 },
              rotate: {
                delay: 1 + index * 0.1,
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3,
              },
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function BannerInfo3() {
  return (
    <div className="absolute mx-auto w-full leading-12 text-white text-center font-bold text-shadow-chat">
      {/* 第一行：弹跳进入 */}
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 10,
          duration: 1.2,
        }}
        className="text-7xl mb-4 relative"
      >
        LE CHAT
        {/* 星星装饰 */}
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              x: [0, (i - 1) * 50, (i - 1) * 80],
              y: [0, -30, -50],
            }}
            transition={{
              delay: 0.8 + i * 0.2,
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute text-4xl"
            style={{ left: "50%", top: "-20px" }}
          >
            ✨
          </motion.span>
        ))}
      </motion.div>

      {/* 第二行：每个字母单独弹跳 */}
      <div className="text-3xl">
        {"Meow...".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.5 + index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
            whileHover={{
              y: -10,
              scale: 1.2,
              color: "#feca57",
              transition: { duration: 0.2 },
            }}
            className="inline-block cursor-default"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
