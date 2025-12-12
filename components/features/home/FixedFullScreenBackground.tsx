"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import useMounted from "@/hooks/useMounted";

export default function FixedFullScreenBackground() {
  const { resolvedTheme } = useTheme();
  const isMounted = useMounted();

  if (!isMounted || !resolvedTheme) return null;

  const bgImageUrl =
    resolvedTheme === "dark" ? "/bg-dark.webp" : "/bg-light.png";

  return (
    <div className="fixed inset-0 -z-50">
      <Image
        src={bgImageUrl}
        alt={"home background"}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
}
