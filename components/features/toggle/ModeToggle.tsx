"use client";

import { Sun, Moon, ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";
import { useScroll } from "@/hooks/useScroll";
import ToggleButton from "@/components/features/toggle/ToggleButton";
import useMounted from "@/hooks/useMounted";
import { useCallback } from "react";

export default function ModeToggle() {
  const { showScrollTop, scrollToTop } = useScroll(0);
  const mounted = useMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const handleDark = useCallback(() => setTheme("dark"), [setTheme]);
  const handleLight = useCallback(() => setTheme("light"), [setTheme]);
  if (!mounted || !resolvedTheme) return null;
  return (
    <div className="hidden lg:block">
      {showScrollTop && (
        <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50 pointer-events-auto">
          {/* 主题切换按钮 */}
          {resolvedTheme === "dark" ? (
            <ToggleButton fnAction={handleLight} aria="暗色模式">
              <Moon className="h-5 w-5 hidden dark:block" />
            </ToggleButton>
          ) : (
            <ToggleButton fnAction={handleDark} aria="亮色模式">
              <Sun className="h-5 w-5 dark:hidden" />
            </ToggleButton>
          )}

          {/* 回到顶部按钮 */}
          <ToggleButton fnAction={scrollToTop} aria="回到顶部">
            <ArrowUp className="h-5 w-5" />
          </ToggleButton>
        </div>
      )}
    </div>
  );
}
