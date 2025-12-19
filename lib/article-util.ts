/**
 * 计算文章字数
 * 支持中英文混合内容
 */
export function calculateWordCount(markdown: string): number {
  // 1. 移除 Markdown 语法
  const text = markdown
    // 移除代码块
    .replace(/```[\s\S]*?```/g, "")
    // 移除行内代码
    .replace(/`[^`]*`/g, "")
    // 移除链接 [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // 移除图片 ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    // 移除标题标记 # ## ###
    .replace(/^#{1,6}\s+/gm, "")
    // 移除粗体斜体 ** __ * _
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    // 移除删除线 ~~
    .replace(/~~(.*?)~~/g, "$1")
    // 移除引用 >
    .replace(/^>\s+/gm, "")
    // 移除无序列表 - * +
    .replace(/^[\-\*\+]\s+/gm, "")
    // 移除有序列表 1. 2.
    .replace(/^\d+\.\s+/gm, "")
    // 移除分隔线 --- ***
    .replace(/^[\-\*]{3,}$/gm, "")
    // 移除 HTML 标签
    .replace(/<[^>]*>/g, "")
    // 移除多余空白
    .replace(/\s+/g, " ")
    .trim();

  // 2. 分离中文和英文
  // 中文字符（包括中文标点）
  const chineseChars =
    text.match(/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g) || [];
  const chineseCount = chineseChars.length;

  // 移除中文字符后，剩下的是英文和数字
  const nonChineseText = text.replace(
    /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g,
    " ",
  );

  // 英文单词数（按空格分割）
  const englishWords = nonChineseText
    .split(/\s+/)
    .filter((word) => /[a-zA-Z0-9]/.test(word));
  const englishCount = englishWords.length;

  // 总字数 = 中文字符数 + 英文单词数
  return chineseCount + englishCount;
}

/**
 * 计算阅读时间（分钟）
 * 中文：每分钟 300-500 字（取 400）
 * 英文：每分钟 200-250 词（取 225）
 */
export function calculateReadingTime(markdown: string): number {
  // 1. 移除 Markdown 语法（同上）
  const text = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/^>\s+/gm, "")
    .replace(/^[\-\*\+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/^[\-\*]{3,}$/gm, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // 2. 分离中文和英文
  const chineseChars =
    text.match(/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g) || [];
  const chineseCount = chineseChars.length;

  const nonChineseText = text.replace(
    /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g,
    " ",
  );
  const englishWords = nonChineseText
    .split(/\s+/)
    .filter((word) => /[a-zA-Z0-9]/.test(word));
  const englishCount = englishWords.length;

  // 3. 计算阅读时间
  const CHINESE_CHARS_PER_MINUTE = 400; // 中文每分钟阅读字数
  const ENGLISH_WORDS_PER_MINUTE = 225; // 英文每分钟阅读词数

  const chineseMinutes = chineseCount / CHINESE_CHARS_PER_MINUTE;
  const englishMinutes = englishCount / ENGLISH_WORDS_PER_MINUTE;

  const totalMinutes = chineseMinutes + englishMinutes;

  // 4. 向上取整，最少 1 分钟
  return Math.max(1, Math.ceil(totalMinutes));
}

/**
 * 格式化阅读时间显示
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "不到 1 分钟";
  if (minutes === 1) return "1 分钟";
  if (minutes < 60) return `${minutes}分钟`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}小时`;
  }

  return `${hours}小时 ${remainingMinutes}分钟`;
}

/**
 * 格式化字数显示
 */
export function formatWordCount(count: number): string {
  if (count < 1000) return `${count}字`;
  if (count < 10000) return `${(count / 1000).toFixed(1)}k字`;
  return `${(count / 10000).toFixed(1)}w字`;
}
