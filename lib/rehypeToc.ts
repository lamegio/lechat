import { visitParents } from 'unist-util-visit-parents';

export default function rehypeToc() {
  return (tree, file) => {
    const toc = [];
    const stack = [];

    visitParents(tree, 'element', (node, parents) => {
      if (node.tagName === 'h1' || node.tagName === 'h2') {
        const id = node.properties?.id;
        const text = node.children?.find((c) => c.type === 'text')?.value || '';
        const level = parseInt(node.tagName[1], 10);

        const item = { id, text, level };

        while (stack.length && stack[stack.length - 1].level >= level) {
          stack.pop();
        }

        if (stack.length === 0) {
          toc.push(item);
        } else {
          const parent = stack[stack.length - 1];
          if (!parent.children) parent.children = [];
          parent.children.push(item);
        }

        stack.push(item);
      }
    });

    // 将toc数组附加到file.data上
    file.data = file.data || {};
    file.data.toc = toc;
  };
}