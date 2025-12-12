"use client";

import { useTheme } from "next-themes";
import useMounted from "@/hooks/useMounted";

export default function PageBanner() {
  const { resolvedTheme } = useTheme();

  const isMounted = useMounted();

  if (!isMounted) return null;

  const bannerImageUrl =
    resolvedTheme === "dark" ? "/bg-dark.webp" : "/bg-light.png";

  return (
    <div
      className="w-full h-[50vh] bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bannerImageUrl})` }}
    ></div>
  );
}
