"use client";

import { useState, useEffect, useRef } from "react";

interface UseHeadingsObserverOptions {
  rootMargin?: string;
  threshold?: number;
}

export default function useHeadingsObserver(
  selector = "h2, h3",
  options?: UseHeadingsObserverOptions,
): string {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headingsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const currentObserver = observerRef.current;
    const currentHeadings = headingsRef.current;
    // 查找所有标题元素
    const headingElements = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    ).filter((element) => element.id);

    if (headingElements.length === 0) {
      return;
    }

    // 找到 DOM 中最后出现的标题
    const findLastHeadingInDom = (ids: string[]): string => {
      for (let i = headingElements.length - 1; i >= 0; i--) {
        if (ids.includes(headingElements[i].id)) {
          return headingElements[i].id;
        }
      }
      return ids[0] || "";
    };

    // 更新激活的标题 ID
    const updateActiveId = (): void => {
      if (headingsRef.current.size === 0) {
        // 没有相交的标题，保持上一个 activeId
        return;
      }

      // 找到 DOM 中最后一个相交的标题
      const visibleHeadings = Array.from(headingsRef.current);
      const lastVisible = findLastHeadingInDom(visibleHeadings);

      setActiveId(lastVisible);
    };

    // IntersectionObserver 回调
    const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry) => {
        const targetId = entry.target.id;

        if (entry.isIntersecting) {
          // 标题进入检测区域
          headingsRef.current.add(targetId);
        } else {
          // 标题离开检测区域
          headingsRef.current.delete(targetId);
        }
      });

      // 更新 activeId
      updateActiveId();
    };

    // 创建 IntersectionObserver
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: options?.rootMargin ?? "-10% 0% -90% 0%",
      threshold: options?.threshold ?? 0,
    });

    // 观察所有标题元素
    headingElements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    // 清理函数
    return () => {
      currentObserver?.disconnect();
      currentHeadings.clear();
    };
  }, [selector, options?.rootMargin, options?.threshold]);

  return activeId;
}
