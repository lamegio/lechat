"use client";

import { useTheme } from "next-themes";
import useMounted from "@/hooks/useMounted";
import { useSiteBanner } from "@/hooks/useConfigApi";

export default function PageBanner() {
  const { resolvedTheme } = useTheme();

  const siteBanner = useSiteBanner();

  const isMounted = useMounted();

  if (!isMounted) return null;

  const bannerImageUrl =
    resolvedTheme === "dark"
      ? siteBanner?.backgroundImage.dark
      : siteBanner?.backgroundImage.light;

  return (
    <div
      className="w-full h-[50vh] bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bannerImageUrl})` }}
    ></div>
  );
}
