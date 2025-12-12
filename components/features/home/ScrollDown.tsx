'use client'

import useScrollTo from "@/hooks/useScrollTo";

export default function ScrollDown() {
  const { scrollTo } = useScrollTo();
  return (
    <div className="z-50 absolute w-full bottom-4 left-1/2 -translate-x-1/2 cursor-pointer px-4 pt-2">
    <p
      onClick={() => scrollTo("section-1")}
      className="text-center text-shadow-chat text-2xl font-bold text-white opacity-75 animate-bounce"
    >
      ﹀
    </p>
    </div>
  );
}
