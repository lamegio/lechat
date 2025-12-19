"use client";

import React, { JSX, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { BiMenuAltRight } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useHeadingsObserver from "@/hooks/useHeadingsObserver";
export type TocItem = {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
};

interface TocProps {
  items: TocItem[];
}

export default function ArticleToc(tocList: TocProps): JSX.Element {
  return (
    <div className="hidden xl:block py-4 max-h-[50dvh] sticky top-20 px-4 bg-background-color-page w-64 rounded-xl space-y-5 overflow-y-auto">
      <div className="font-bold flex items-center gap-x-2">
        <BiMenuAltRight className="text-xl" />
        <p className="text-[1.15rem]">目录</p>
      </div>
      {tocList?.items?.length > 0 && <TocList items={tocList.items} />}
    </div>
  );
}

function TocList({ items }: { items: TocItem[] }) {
  const activeId = useHeadingsObserver("h2, h3");
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  // 当 activeId 变化时，自动滚动到激活项
  useEffect(() => {
    if (activeId && activeItemRef.current) {
      const container = activeItemRef.current.closest(".overflow-y-auto"); // 找到 TOC 容器
      if (container) {
        const itemTop = activeItemRef.current.offsetTop;
        const containerHeight = container.clientHeight;
        const scrollTo = itemTop - containerHeight / 2; // 居中

        container.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });
      }
    }
  }, [activeId]);  return (
    <ul className="space-y-1 mx-2 px-0 mt-2">
      {items.map((item) => (
        <li key={item.id}>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`#${item.id}`}
                  ref={item.id === activeId ? activeItemRef : null}
                  className={cn(
                    "block leading-[1.8rem] text-[1rem] text-foreground/80 hover:text-theme-color transition-colors truncate",
                    item.level === 2 && "pl-1",
                    item.id === activeId && "text-theme-color",
                  )}
                >
                  {item.text}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>{item.text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {item.children && item.children.length > 0 && (
            <div className="">
              <TocList items={item.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
