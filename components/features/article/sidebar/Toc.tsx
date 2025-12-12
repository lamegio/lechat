"use client"

import React, { JSX } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useActiveHeading from "@/hooks/useActiveHeading";

import { BiMenuAltRight } from "react-icons/bi";

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
    <div className="hidden xl:block py-4 sticky top-[6.25rem] px-4 bg-background-color-page w-64 rounded-xl space-y-5">
      <div className="font-bold flex items-center gap-x-2">
        <BiMenuAltRight className="text-2xl" />
        <p className="text-[1.15rem]">目录</p>
      </div>
      {tocList?.items?.length > 0 && <TocList items={tocList.items} />}
    </div>
  );
}

function TocList({ items }: { items: TocItem[] }) {
  const activeId = useActiveHeading("h2, h3");
  return (
    <ul className="space-y-2 mx-2 px-0 mt-2">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`#${item.id}`}
            className={cn(
              "block leading-[1.8rem] text-[1.05rem] text-foreground/80 hover:text-theme-color transition-colors",
              item.level === 2 && "pl-1",
              item.id === activeId && "text-theme-color",
            )}
          >
            {item.text}
          </Link>

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
