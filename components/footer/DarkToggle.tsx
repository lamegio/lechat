"use client";

import useMounted from "@/hooks/useMounted";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";
import { HiComputerDesktop, HiMoon, HiSun } from "react-icons/hi2";
import React from "react";

export function FooterDesktopDarkToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  if (!mounted) return null;

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // TODO: 实现主题切换逻辑
  };

  return (
    <div className="inline-flex items-center bg-background-color-transparent-1 backdrop-blur-xl rounded-full  border-2 border-font-color border-opacity-10">
      <button
        onClick={() => handleThemeChange("system")}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          theme === "system"
            ? "text-font-color scale-110"
            : "text-font-color opacity-40 hover:opacity-70 hover:scale-105"
        }`}
        aria-label="System theme"
      >
        <HiComputerDesktop size={18} />
      </button>
      <button
        onClick={() => handleThemeChange("light")}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          theme === "light"
            ? "text-font-color scale-110"
            : "text-font-color opacity-40 hover:opacity-70 hover:scale-105"
        }`}
        aria-label="Light theme"
      >
        <HiSun size={18} />
      </button>
      <button
        onClick={() => handleThemeChange("dark")}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          theme === "dark"
            ? "text-font-color scale-110"
            : "text-font-color opacity-40 hover:opacity-70 hover:scale-105"
        }`}
        aria-label="Dark theme"
      >
        <HiMoon size={18} />
      </button>
    </div>
  );
}

export function FooterMobileDarkToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  if (!mounted) return null;
  function handleThemeChange(newTheme: string) {
    setTheme(newTheme)
  }

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-1.5 bg-background-color-transparent-1 rounded-lg p-1.5 border border-background-color-transparent-1">
        <button
          onClick={() => handleThemeChange("system")}
          className={`p-2.5 rounded-md transition-all ${
            theme === "system"
              ? "opacity-100 bg-opacity-10 text-font-color"
              : "text-font-color opacity-50 hover:opacity-100"
          }`}
          aria-label="System theme"
        >
          <HiComputerDesktop size={22} />
        </button>
        <button
          onClick={() => handleThemeChange("light")}
          className={`p-2.5 rounded-md transition-all ${
            theme === "light"
              ? "opacity-100 bg-opacity-10 text-font-color"
              : "text-font-color opacity-50 hover:opacity-100"
          }`}
          aria-label="Light theme"
        >
          <HiSun size={22} />
        </button>
        <button
          onClick={() => handleThemeChange("dark")}
          className={`p-2.5 rounded-md transition-all ${
            theme === "dark"
              ? "opacity-100 bg-opacity-10 text-font-color"
              : "text-font-color opacity-50 hover:opacity-100"
          }`}
          aria-label="Dark theme"
        >
          <HiMoon size={22} />
        </button>
      </div>
    </div>
  );
}

export function FooterTabletDarkToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  if (!mounted) return null;

  return (
    <div className="flex justify-center gap-2 pt-6 border-t border-muted/50 pb-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("light")}
        className={`h-11 w-11 p-0 rounded-xl transition-all ${
          theme === "light"
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-primary/30"
            : "hover:bg-muted/50"
        }`}
      >
        <Sun className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("dark")}
        className={`h-11 w-11 p-0 rounded-xl transition-all ${
          theme === "dark"
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-primary/30"
            : "hover:bg-muted/50"
        }`}
      >
        <Moon className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("system")}
        className={`h-11 w-11 p-0 rounded-xl transition-all ${
          theme === "system"
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-primary/30"
            : "hover:bg-muted/50"
        }`}
      >
        <Monitor className="w-5 h-5" />
      </Button>
    </div>
  );
}
