import type { Root, Element, Text } from "hast";
import type { VFile } from "vfile";
import { visitParents } from "unist-util-visit-parents";

interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

interface FileData {
  toc?: TocItem[];
}

export default function rehypeToc() {
  return (tree: Root, file: VFile) => {
    const toc: TocItem[] = [];
    const stack: TocItem[] = [];

    visitParents(tree, "element", (node: Element) => {
      if (node.tagName === "h2" || node.tagName === "h3") {
        const id = node.properties?.id as string | undefined;

        // 更安全地提取文本内容
        const textNode = node.children?.find(
          (c): c is Text => c.type === "text",
        );
        const text = textNode?.value || "";

        const level = parseInt(node.tagName[1], 10);

        // 确保id存在
        if (!id) return;

        const item: TocItem = { id, text, level };

        while (stack.length && stack[stack.length - 1].level >= level) {
          stack.pop();
        }

        if (stack.length === 0) {
          toc.push(item);
        } else {
          const parent = stack[stack.length - 1];
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(item);
        }

        stack.push(item);
      }
    });

    // 将toc数组附加到file.data上
    if (!file.data) {
      file.data = {};
    }
    (file.data as FileData).toc = toc;
  };
}
