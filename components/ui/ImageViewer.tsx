"use client";

import { useEffect, useState, useCallback } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdZoomIn, MdZoomOut, MdFitScreen } from "react-icons/md";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ImageViewerProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageViewer({
  images,
  initialIndex,
  onClose,
}: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetTransform = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    resetTransform();
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    resetTransform();
  }, [images.length]);

  // 键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handlePrevious, handleNext, onClose]);

  // 鼠标拖拽
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && scale > 1) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart, scale]);

  if (!mounted) return null;

  // 背景层点击关闭
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 图片容器滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setScale((prev) => {
      const newScale = Math.min(Math.max(prev + delta, 1), 3);
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  // 图片鼠标按下
  const handleImageMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const viewerContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-white/50 dark:bg-black/70 backdrop-blur-2xl flex items-center justify-center"
        style={{ zIndex: 9999 }}
        onClick={handleBackgroundClick}
      >
        {/* 关闭按钮 */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors shadow-xl"
          aria-label="关闭"
        >
          <IoClose className="w-6 h-6" />
        </motion.button>

        {/* 左右切换按钮 */}
        {images.length > 1 && (
          <>
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors shadow-xl hidden md:flex items-center justify-center"
              aria-label="上一张"
            >
              <IoChevronBack className="w-6 h-6" />
            </motion.button>
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors shadow-xl hidden md:flex items-center justify-center"
              aria-label="下一张"
            >
              <IoChevronForward className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* 图片容器 */}
        <div
          className="relative w-full h-full flex items-center justify-center p-20"
          onWheel={handleWheel}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative flex items-center justify-center"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              cursor:
                scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              transformOrigin: "center center",
            }}
            onMouseDown={handleImageMouseDown}
          >
            <img
              src={images[currentIndex]}
              alt={`图片 ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
              style={{
                maxWidth: "calc(100vw - 160px)",
                maxHeight: "calc(100vh - 240px)",
              }}
            />
          </motion.div>
        </div>

        {/* 底部工具栏 */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-4">
            {/* 索引 */}
            {images.length > 1 && (
              <div className="px-4 py-2 rounded-full bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 text-sm font-medium shadow-xl">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* 工具按钮 */}
            <div className="flex items-center gap-2 px-2 py-2 rounded-full bg-gray-900/90 dark:bg-gray-100/90 shadow-xl">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const newScale = Math.max(scale - 0.3, 1);
                  setScale(newScale);
                  if (newScale === 1) {
                    setPosition({ x: 0, y: 0 });
                  }
                }}
                disabled={scale <= 1}
                className="p-2 rounded-full text-white dark:text-gray-900 hover:bg-white/20 dark:hover:bg-black/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="缩小"
              >
                <MdZoomOut className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  resetTransform();
                }}
                disabled={scale === 1}
                className="p-2 rounded-full text-white dark:text-gray-900 hover:bg-white/20 dark:hover:bg-black/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="适应屏幕"
              >
                <MdFitScreen className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setScale((prev) => Math.min(prev + 0.3, 3));
                }}
                disabled={scale >= 3}
                className="p-2 rounded-full text-white dark:text-gray-900 hover:bg-white/20 dark:hover:bg-black/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="放大"
              >
                <MdZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(viewerContent, document.body);
}
