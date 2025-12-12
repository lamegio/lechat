"use client";

import useMounted from "@/hooks/useMounted";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";

export function FooterDesktopDarkToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  if (!mounted) return null;

  return (
    <div className="col-span-1 flex flex-col justify-between text-right space-y-4 pt-1">
      <div className="flex gap-1.5 justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme("light")}
          className={`h-9 w-9 p-0 rounded-lg transition-all ${
            theme === "light"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-primary/30"
              : "hover:bg-muted/50"
          }`}
        >
          <Sun className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme("dark")}
          className={`h-9 w-9 p-0 rounded-lg transition-all ${
            theme === "dark"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-primary/30"
              : "hover:bg-muted/50"
          }`}
        >
          <Moon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme("system")}
          className={`h-9 w-9 p-0 rounded-lg transition-all ${
            theme === "system"
              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-primary/30"
              : "hover:bg-muted/50"
          }`}
        >
          <Monitor className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export function FooterMobileDarkToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  if (!mounted) return null;

  return (
    <div className="flex justify-center gap-2 pt-4 border-t border-muted/50">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("light")}
        className={`h-10 w-10 p-0 rounded-xl transition-all ${
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
        className={`h-10 w-10 p-0 rounded-xl transition-all ${
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
        className={`h-10 w-10 p-0 rounded-xl transition-all ${
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