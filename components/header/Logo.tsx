"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* Logo 图片动画 */}
      <motion.div
        whileHover={{
          scale: 1.1,
          rotate: 360,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/logo.svg"
          width={50}
          height={50}
          loading="eager"
          fetchPriority="high"
          alt="Logo"
          className="transition-all duration-300"
        />
      </motion.div>

      {/* 文字动画 */}
      <div className="font-bold text-2xl overflow-hidden h-8 relative">
        {"CHAT".split("").map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ y: 0 }}
            whileHover={{
              y: [-2, -8, 0],
              color: ["currentColor", "#3b82f6", "currentColor"],
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: "easeInOut",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </Link>
  );
}
