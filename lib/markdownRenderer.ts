import remarkGfm from "remark-gfm";
import {rehype} from "rehype";
import rehypePrism from "rehype-prism-plus";
import remarkDirective from "remark-directive";
import {visitParents} from "unist-util-visit-parents";
import remarkFold from "@/lib/remarkFold";
import {testRemarkDirectivePlugin} from "@/lib/testVisitPlugin";
import remarkParse from "remark-parse";
import {unified} from "unified";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeToc from "@/lib/rehypeToc";
import rehypeSlug from "rehype-slug";
import { Root } from 'hast';
import {TocItem} from "@/components/features/article/sidebar/Toc";

export default async function renderMarkdown(content: string) {
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDirective)
    .use(remarkFold)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  const processedContentRes = await rehype()
    .data("settings", { fragment: true })
    .use(rehypeSlug)
    .use(rehypeToc)
    .use(rehypeMacOsCodeBlock)
    .use(rehypePrism, { showLineNumbers: true })
    .process(processedContent);
  return {
    html: processedContentRes.toString(),
    toc: processedContentRes.data.toc as TocItem[],
  };
}

function rehypeMacOsCodeBlock() {
  return (tree: Root) => {
    visitParents(tree, "element", (node, ancestors) => {
      if (node.tagName !== "pre") return;

      const parent = ancestors[ancestors.length - 1];
      if (!parent || !Array.isArray(parent.children)) return;

      const index = parent.children.indexOf(node);
      if (index === -1) return;

      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: {className: ["macos-code-frame"]},
        children: [
          {
            type: "element",
            tagName: "div",
            properties: {className: ["code-header"]},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: {className: ["traffic-lights"]},
                children: ["red", "yellow", "green"].map((color) => ({
                  type: "element",
                  tagName: "span",
                  properties: {className: ["light", color]},
                  children: [],
                })),
              },
            ],
          },
          node, // 原来的 <pre>
        ],
      };
    });
  };
}
