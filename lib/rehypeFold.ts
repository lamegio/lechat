import { visitParents } from "unist-util-visit-parents";
import { h } from "hastscript";

type DirectiveNode = {
  type: "containerDirective";
  name: string;
  attributes?: Record<string, any>;
  children: any[];
};

export const rehypeFold = () => {
  return (tree: any) => {
    visitParents(
      tree,
      "containerDirective",
      (node: DirectiveNode, ancestors) => {
        if (node.name !== "fold") return;

        // ---------- 1. 提取标题 ----------
        let title = "折叠内容";

        const first = node.children[0];
        if (first?.type === "paragraph" && first.children?.[0]?.value) {
          title = String(first.children[0].value).trim();
          node.children.shift(); // 删掉标题这一行
        }

        // ---------- 2. 解析 attributes ----------
        const attrs = node.attributes || {};

        // className 可能是 string 或 string[]
        const extraClass = attrs.className
          ? Array.isArray(attrs.className)
            ? attrs.className
            : String(attrs.className).split(/\s+/)
          : [];

        const className = ["fold", "light", ...extraClass];

        // 其他属性（如 icon=xxx），从 attributes 透传到 <details>
        const { className: _drop, ...restAttrs } = attrs;

        // ---------- 3. 用 h() 生成最终结构 ----------
        const details = h("details", { className, ...restAttrs }, [
          h("summary", title),
          h("div.fold-content", node.children ?? []),
        ]);

        // ---------- 4. 用父节点替换当前指令节点 ----------
        const parent = ancestors[ancestors.length - 1];
        if (!parent || !Array.isArray(parent.children)) return;

        const index = parent.children.indexOf(node);
        if (index === -1) return;

        parent.children.splice(index, 1, details);
      },
    );
  };
};
