import { visitParents } from "unist-util-visit-parents";
import { isDev } from "@/lib/env";

export const testRemarkDirectivePlugin = () => {
  if (!isDev) return () => {};
  return (tree: any) => {
    console.log("Server 开始检查AST。。。");

    visitParents(
      tree,
      ["containerDirective", "leafDirective", "textDirective"],
      (node, ancestors) => {
        console.log("✅ 找到 directive 节点:", {
          type: node.type,
          name: node.name,
          attributes: node.attributes,
          parent: ancestors[ancestors.length - 1]?.type || "root",
        });
      },
    );
  };
};
