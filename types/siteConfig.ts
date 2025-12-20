/**
 * 前端配置类型定义
 * 路径：frontend/types/config/config-types.ts
 *
 * 注意：修改此文件时，需同步更新后端文档
 * backend/modules/config/docs/CONFIG_TYPES.md
 */

// ==================== 基础类型 ====================

/**
 * 主题图片配置（支持明暗主题）
 */
export interface ThemedImage {
  light: string;
  dark: string;
}

/**
 * 社交平台配置（泛型）
 */
export interface SocialPlatform {
  enabled: boolean;
  username?: string;
  url: string;
  display: string;
}

/**
 * 自定义链接
 */
export interface CustomLink {
  text: string;
  url: string;
  newTab: boolean;
}

/**
 * 导航菜单项
 */
export interface NavigationMenuItem {
  name: string;
  path: string;
  icon: string;
  order: number;
}

// ==================== 配置项类型 ====================

/**
 * 网站基础配置
 * key: site.basic
 */
export interface SiteBasicConfig {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  logo: string;
  favicon: string;
  moeIcpCode: string;
  moeIcpIconLink: string;
  locale: string;
  timezone: string;
}

/**
 * SEO 配置
 * key: site.seo
 */
export interface SiteSeoConfig {
  keywords: string[];
  author: string;
  ogImage: string;
  twitterCard: string;
  robots: string;
  googleSiteVerification: string;
  baiduSiteVerification: string;
  canonicalUrl: string;
}

/**
 * 社交媒体配置
 * key: site.social
 */
export interface SiteSocialConfig {
  github: SocialPlatform;
  email: SocialPlatform & { address?: string };
  telegram: SocialPlatform;
}

/**
 * 评论系统配置
 * key: site.comment
 */
export interface SiteCommentConfig {
  enabled: boolean;
  provider: string;
  requireLogin: boolean;
  requireApproval: boolean;
  allowAnonymous: boolean;
  maxLength: number;
  allowMarkdown: boolean;
  notifyOnNewComment: boolean;
  notifyEmail: string;
  allowedDomains: string[];
  blockedWords: string[];
  rateLimit: {
    enabled: boolean;
    maxCommentsPerHour: number;
    maxCommentsPerDay: number;
  };
}

/**
 * 文章展示配置
 * key: site.article
 */
export interface SiteArticleConfig {
  postsPerPage: number;
  excerptLength: number;
  showTableOfContents: boolean;
  showReadingTime: boolean;
  showWordCount: boolean;
  showLastModified: boolean;
  relatedPostsCount: number;
  enableLazyLoad: boolean;
  imageQuality: number;
  defaultCover: string;
}

/**
 * 网站功能配置
 * key: site.feature
 */
export interface SiteFeatureConfig {
  enableSearch: boolean;
  enableRss: boolean;
  enableSitemap: boolean;
  enableArchive: boolean;
  enableTagCloud: boolean;
  enableDarkMode: boolean;
  defaultTheme: "light" | "dark" | "auto";
  enableCodeHighlight: boolean;
  codeTheme: string;
  enableMathJax: boolean;
  enableMermaid: boolean;
}

/**
 * 页脚配置
 * key: site.footer
 */
export interface SiteFooterConfig {
  copyright: string;
  icpNumber: string;
  startYear: number;
  showPoweredBy: boolean;
  customLinks: CustomLink[];
}

/**
 * 导航菜单配置
 * key: site.navigation
 */
export interface SiteNavigationConfig {
  menus: NavigationMenuItem[];
}

/**
 * 首页横幅配置
 * key: site.banner
 */
export interface SiteBannerConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: ThemedImage;
  backgroundType: "image" | "gradient" | "video";
  overlay: boolean;
  overlayOpacity: number;
}

/**
 * 首页背景配置
 * key: site.background
 */
export interface SiteBackgroundConfig {
  enabled: boolean;
  image: ThemedImage;
  fixed: boolean;
  opacity: number;
}

// ==================== 响应类型 ====================

/**
 * 单个配置项响应（管理端）
 */
export interface ConfigResponse {
  id: string;
  key: string;
  value: Record<string, unknown>;
  category: string;
  isPublic: boolean;
  updatedAt: string;
}

/**
 * 配置列表响应（管理端）
 */
export interface ConfigListResponse {
  data: ConfigResponse[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 公开配置分组响应（前台）
 */
export interface PublicConfigGroup {
  site: {
    basic: SiteBasicConfig;
    seo: SiteSeoConfig;
    footer: SiteFooterConfig;
    navigation: SiteNavigationConfig;
    banner: SiteBannerConfig;
    background: SiteBackgroundConfig;
  };
  social: SiteSocialConfig;
  comment: SiteCommentConfig;
  article: SiteArticleConfig;
  feature: SiteFeatureConfig;
}

// ==================== 类型守卫（可选） ====================

/**
 * 检查是否为有效的主题图片配置
 */
export function isThemedImage(value: unknown): value is ThemedImage {
  return (
    typeof value === "object" &&
    value !== null &&
    "light" in value &&
    "dark" in value &&
    typeof (value as ThemedImage).light === "string" &&
    typeof (value as ThemedImage).dark === "string"
  );
}

/**
 * 检查是否为有效的社交平台配置
 */
export function isSocialPlatform(value: unknown): value is SocialPlatform {
  return (
    typeof value === "object" &&
    value !== null &&
    "enabled" in value &&
    "url" in value &&
    "display" in value &&
    typeof (value as SocialPlatform).enabled === "boolean" &&
    typeof (value as SocialPlatform).url === "string" &&
    typeof (value as SocialPlatform).display === "string"
  );
}
