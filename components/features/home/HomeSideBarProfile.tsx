"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useMemo } from "react";
import confetti from "canvas-confetti";
import HomeSideBarBox from "@/components/features/home/SideBarBox";
import SocialIcon from "@/components/ui/SocialIcon";
import { useSiteInfo } from "@/hooks/useConfigApi";

export default function HomeSideBarProfile() {
  const [isHovered, setIsHovered] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  // 3D 倾斜效果
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleAvatarClick = () => {
    if (!avatarRef.current) return;

    const rect = avatarRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // 使用 canvas-confetti 创建彩带效果
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#f9ca24",
        "#6c5ce7",
        "#a29bfe",
      ],
      ticks: 200,
      gravity: 1.2,
      scalar: 1.2,
    });

    // 再来一波从两侧喷射的效果
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x, y },
        colors: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x, y },
        colors: ["#f9ca24", "#6c5ce7", "#a29bfe"],
      });
    }, 100);
  };

  const siteInfo = useSiteInfo();

  // 使用 useMemo 预计算粒子位置，避免在渲染时调用 Math.random
  const particlePositions = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      x: Math.cos((i * Math.PI * 2) / 8) * 70,
      y: Math.sin((i * Math.PI * 2) / 8) * 70,
    }));
  }, []);

  return (
    <HomeSideBarBox>
      <div className="flex flex-col gap-y-4">
        {/* 头像区域 */}
        <div className="relative">
          <motion.div
            ref={avatarRef}
            className="w-32 h-32 mx-auto relative"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={handleAvatarClick}
          >
            {/* 动态渐变边框 */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: isHovered
                  ? [
                      "linear-gradient(0deg, #ff6b6b, #4ecdc4, #45b7d1)",
                      "linear-gradient(120deg, #4ecdc4, #45b7d1, #ff6b6b)",
                      "linear-gradient(240deg, #45b7d1, #ff6b6b, #4ecdc4)",
                      "linear-gradient(360deg, #ff6b6b, #4ecdc4, #45b7d1)",
                    ]
                  : "linear-gradient(0deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.3))",
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "linear",
              }}
              style={{ padding: "4px" }}
            >
              <div className="w-full h-full rounded-full bg-background-color-transparent-1" />
            </motion.div>

            {/* 头像 */}
            <motion.div
              className="absolute inset-1 rounded-full overflow-hidden cursor-pointer z-10"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={siteInfo?.avatar || "/avatar.png"}
                alt="avatar"
                width={120}
                height={120}
                sizes="120px"
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>

            {/* 状态 emoji - 右下角，固定大小，无动画 */}
            <motion.div
              className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-background-color-transparent-1 shadow-lg flex items-center justify-center border-2 border-theme-color z-20 cursor-pointer"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.2 }}
              title={siteInfo?.statusText}
            >
              <span className="text-base leading-none">
                {siteInfo?.statusEmoji}
              </span>
            </motion.div>

            {/* 粒子环绕效果 */}
            {isHovered && (
              <>
                {particlePositions.map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-theme-color"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    animate={{
                      x: pos.x,
                      y: pos.y,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </div>

        {/* 昵称和简介 */}
        <div className="text-center space-y-2">
          <motion.h2
            className="font-bold text-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {siteInfo?.nickname}
          </motion.h2>
          <p className="text-sm text-font-color-light-1 leading-relaxed">
            {siteInfo?.bio}
          </p>
          <motion.p
            className="text-xs text-theme-color flex items-center justify-center gap-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>{siteInfo?.statusEmoji}</span>
            <span>{siteInfo?.statusText}</span>
          </motion.p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-theme-color/20">
          {siteInfo?.stat.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center py-2 rounded-lg hover:bg-theme-color/10 transition-colors duration-200 group"
            >
              <motion.span
                className="text-lg font-bold group-hover:text-theme-color transition-colors"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                {item.stat}
              </motion.span>
              <span className="text-xs text-font-color-light-1 mt-1">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* 社交链接 */}
        <div className="flex justify-center gap-4 pt-3 border-t border-theme-color/20">
          {siteInfo?.social.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.2, y: -5, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-theme-color hover:text-link-hover-font-color transition-colors duration-200"
              aria-label={item.name}
            >
              <SocialIcon type={item.type} className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </HomeSideBarBox>
  );
}
