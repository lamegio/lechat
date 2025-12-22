import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import renderMarkdown from "@/lib/markdownRenderer";
import { useSiteAboutPage } from "@/hooks/useConfigApi";
import { fetcher } from "@/lib/fetcher";
import { API_KEYS } from "@/lib/api-keys";
import CommentSection from "@/components/features/comment/Comment";

export default async function About() {
  // const aboutContent = getAboutContent();
  // const aboutContent = useSiteAboutPage();
  const aboutContent = await fetcher<{ content: string }>(
    API_KEYS.config.publicByKey("site.about"),
  );
  const defaultAboutContent = "## 什么都没有";
  const { html, toc } = await renderMarkdown(
    aboutContent?.content || defaultAboutContent,
  );

  return (
    <BaseContainer pageTitle="关于" pageDescription="喵喵庙...">
      <PageContentContainer>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
        <CommentSection />
      </PageContentContainer>
    </BaseContainer>
  );
}

function getAboutContent(): string {
  return `

# 一级标题 H1

这是一个普通段落，用来测试正文样式、行高、段间距和字体。 
再来一句，测试同一段内的**粗体**、*斜体*、~~删除线~~、以及 **_粗斜体_**。

这是一个很长的段落，用来测试多行换行时的排版效果。  
在不同屏幕宽度下，看看文字是否有合适的最大宽度、左右内边距，以及是否存在奇怪的断行。  

---

## 二级标题 H2

### 三级标题 H3

#### 四级标题 H4

##### 五级标题 H5

###### 六级标题 H6

---

## 文本内联元素

- 行内 \`code\` 测试：\`const value = 42;\`
- 上标测试：X^2^、H~2~O（如果你的渲染器支持扩展语法）
- 引用的“中文标点”测试：「这是一个中文引号」，以及英文 "double quotes"。
- 特殊字符：& < > " ' © ™ ✓

---

普通文本  
**加粗文本**  
*斜体文本*  
<u>下划线文本</u>  
~~删除线文本~~  
==高亮文本==  
<!-- 这是注释文本，不会在渲染结果中显示 -->  
带脚注的文本[^1]

[^1]: 这里是脚注内容,自定义的内容。

---

## 段落与换行

这个段落结尾没有两个空格  
所以这里是**同一段**的第二行。

这个段落后有一个空行，因此上面是一个段落，这里是**新段落**。

手动换行测试：  
这一行通过两个空格结尾强制换行。  
这一行应该紧挨上一行。

---

## 无序列表

普通无序列表：

- 第一项：带有一小段说明文字，用来测试长内容换行时的缩进。
- 第二项：包含**粗体**、*斜体*和 \`code\`。
- 第三项：嵌套列表：
  - 子项 A
  - 子项 B
    - 子子项 1
    - 子子项 2

使用不同标记符的无序列表：

* 星号列表项
* 星号列表项

+ 加号列表项
+ 加号列表项

---

## 有序列表

1. 第一个步骤：初始化项目。
2. 第二个步骤：安装依赖。
3. 第三个步骤：启动开发服务器。
   1. 子步骤一
   2. 子步骤二

---

## 任务列表 / Todo 列表

- [ ] 未完成任务项
- [x] 已完成任务项
- [ ] 包含**粗体**和 \`code\` 的任务项

---

## 折叠块

:::fold[折叠块标题]
- 内容
> 标记
123
:::

---

## 引用 / Blockquote

> 这是一个简单的引用块，用来测试引用样式。
>
> 第二行，带有**粗体**、*斜体*和 \`code\`。
>
> > 引用中的嵌套引用，用来测试多层缩进与边框样式。

---

## 行内代码和代码块

# 代码块测试

\`\`\` Python  
def calculate_pi(n):
pi = 0
for i in range(n):
pi += (-1)**i / (2*i + 1)
return 4 * pi
print(f"π ≈ {calculate_pi(1000):.5f}")
\`\`\`

行内代码示例：\`npm run dev\`、\`yarn start\`、\`pnpm build\`。

### 普通代码块
这是一段普通代码块（无语言高亮）。
主要用于测试字体、背景色和内边距。


## 链接与图片

这是一个[普通行内链接](https://example.com)。  
这是一个带标题的链接：[带标题的链接](https://example.com "Example 网站")。

自动 URL 渲染：https://example.com

### 图片

![示例图片 alt 文本](http://localhost:3000/bg-light.png "示例图片标题")

带链接的图片：

[![点击查看大图](http://localhost:3000/bg-light.png)](https://example.com)

---

## 表格

| 列 1              | 列 2          | 右对齐列     |
| ----------------- | ------------- | ------------ |
| 普通文本          | **粗体**      | 123          |
| \`code\`            | *斜体*        | 456          |
| 多行内容测试：<br/>第二行 | 普通文本      | 789          |

> 对齐方式测试：

| 左对齐（默认） | 居中对齐      | 右对齐        |
| -------------- | :-----------: | ------------: |
| 内容 A         | 内容 B        | 内容 C        |
| 123            | 456           | 789           |

## 简单表格

这是段落。

| Name   | Type   | Description          |
| ------ | ------ | -------------------- |
|  name  | string | Name of the resource |
|  path  | string | Path to the resource |

---

## 水平分割线

---

***

___

---

## 粗体 / 斜体 / 删除线

- 使用 **两个星号** 的粗体。
- 使用 __两个下划线__ 的粗体。
- 使用 *一个星号* 的斜体。
- 使用 _一个下划线_ 的斜体。
- 使用 ~~波浪线~~ 的删除线。
- 组合：**粗体和 _斜体_ 的组合**。

---

## 脚注（如果你的渲染器支持）

这是一个带脚注的文本示例[^2]，用来测试脚注样式。  
再加一个脚注示例[^second-footnote]。

[^2]: 这是脚注内容 1。
[^second-footnote]: 这是脚注内容,第四个 2，带有 **粗体** 和 \`code\`。

---

## 内联 HTML（常见在 MDX / Markdown 中）

<div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "0.5rem" }}>
  <strong>这是一个内联 HTML / JSX 区块</strong>，用于测试你对 MDX 中自定义组件区域的样式处理。
  在这里可以看看段落、行高以及与周围 Markdown 内容的间距。
</div>

## 组合案例：综合排版展示

> **综合示例：** 这一部分将多个元素混合在一起，模拟真实博客文章的排版效果。

在实际写作中，常常会在一段文字中穿插行内代码 \`const foo = "bar"\`，然后接一句解释说明。  
接着可能会列出几个要点：

1. 第一个要点：简单介绍。
2. 第二个要点：包含一个链接，比如访问 [Example](https://example.com)。
3. 第三个要点：包含一段代码：
安装依赖

pnpm install
启动开发环境

pnpm dev
最后，用一张图片和一个引用作为结尾：

![文章插图](https://via.placeholder.com/600x200 "文章插图")

> “优秀的排版可以大幅提升文章的可读性和专业感。”
  `;
}
