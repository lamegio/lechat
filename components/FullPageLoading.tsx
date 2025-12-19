"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FullPageLoading() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const dots = Array.from({ length: 6 });
  const colors = [
    "#ff6b6b",
    "#feca57",
    "#48dbfb",
    "#1dd1a1",
    "#5f27cd",
    "#ff9ff3",
  ];

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background-color-page">
      <div className="flex gap-2">
        {dots.map((_, index) => (
          <motion.div
            key={index}
            initial={{ y: 0 }}
            animate={mounted ? { y: -15 } : { y: 0 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: index * 0.1,
            }}
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: colors[index],
            }}
          />
        ))}
      </div>
    </div>
  );
}
