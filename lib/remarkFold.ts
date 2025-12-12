import { visitParents } from "unist-util-visit-parents";

export const remarkFold = () => {
  return (tree: any) => {
    visitParents(tree, "containerDirective", (node) => {
      if (node.name !== "fold") return;

      const titleNode = node.children[0];
      let title = "折叠内容";

      if (titleNode?.type === "paragraph" && titleNode.children[0]?.value) {
        title = titleNode.children[0].value.trim();
        node.children.shift();
      }

      node.data = {
        hName: "details",
        hProperties: {
          className: ["fold", "light"],
        },
      };

      node.children = [
        {
          type: "paragraph",
          data: { hName: "summary" },
          children: [{ type: "text", value: title }],
        },
        {
          type: "containerDirectiveContent",
          data: {
            hName: "div",
            hProperties: { className: "fold-content" },
          },
          children: node.children,
        },
      ];
    });
  };
};

export default remarkFold;