"use client";

import { useState } from "react";
import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import ArchiveList from "@/components/features/archive/ArchiveList";
import ArchiveTimeline from "@/components/features/archive/ArchiveTimeline";

export default function ArchivePage() {
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");

  return (
    <BaseContainer pageTitle="归档" pageDescription="时光荏苒，文字长存">
      <PageContentContainer>
        <div className="space-y-6">
          {/* 顶部切换按钮 */}
          <div className="flex justify-end">
            <div className="inline-flex bg-gray-200/30 dark:bg-gray-800/30 rounded-lg p-1 border border-gray-300/40 dark:border-gray-600/40">
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    viewMode === "list"
                      ? "bg-theme-color text-white shadow-sm"
                      : "text-font-color-secondary hover:text-font-color"
                  }`}
              >
                列表
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    viewMode === "timeline"
                      ? "bg-theme-color text-white shadow-sm"
                      : "text-font-color-secondary hover:text-font-color"
                  }`}
              >
                时间线
              </button>
            </div>
          </div>

          {/* 内容区域 */}
          {viewMode === "list" ? <ArchiveList /> : <ArchiveTimeline />}
        </div>
      </PageContentContainer>
    </BaseContainer>
  );
}
