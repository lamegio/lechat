import { useCallback } from "react";

export default function useScrollTo() {
  const scrollTo = useCallback(
    (target: string | number, behavior: ScrollBehavior = "smooth") => {
      if (typeof target === "number") {
        // 具体位置（像素）
        window.scrollTo({ top: target, behavior });
      } else if (target.startsWith("#")) {
        // 特殊节点 ID
        const element = document.querySelector(target) as HTMLElement;
        if (element) {
          const offsetTop = element.offsetTop;
          window.scrollTo({ top: offsetTop, behavior });
        }
      } else {
        // 预设位置别名
        const positions: Record<string, number> = {
          top: 0,
          bottom: document.documentElement.scrollHeight,
          "section-1": window.innerHeight,
          "section-2": window.innerHeight * 2,
        };
        const position = positions[target];
        if (position !== undefined) {
          window.scrollTo({ top: position, behavior });
        }
      }
    },
    [],
  );

  return { scrollTo };
}
