// types/siteConfig.ts

// ==================== 基础类型 ====================

export interface SocialLink {
  name: string;
  type: string;
  href: string;
  enabled: boolean;
  order: number;
}

export interface QuickLink {
  href: string;
  label: string;
}

export interface NavigationMenu {
  id: string;
  icon: string;
  name: string;
  path: string;
  order?: number;
  subMenu?: NavigationMenu[]; // TODO ???
}

export interface Stat {
  name: string;
  stat: number;
  href: string;
}

// ==================== 核心配置类型 ====================

/**
 * 站点信息配置（包含站长信息和社交链接）
 */
export interface SiteInfoConfig {
  // 网站基础
  title: string;
  subtitle: string;
  description: string;
  logo: string;
  favicon: string;
  author: string;
  locale: string;
  timezone: string;

  // 站长个人
  nickname: string;
  bio: string;
  avatar: string;
  statusEmoji: string;
  statusText: string;

  // 社交链接
  social: SocialLink[];

  stat: Stat[];
}

/**
 * 页脚配置
 */
export interface SiteFooterConfig {
  copyright: string;
  startYear: number;
  showPoweredBy: boolean;
  quickLinks: QuickLink[];
  moeIcp?: string;
  moeIcpIconLink?: string;
}

/**
 * 背景配置
 */
export interface SiteBackgroundConfig {
  enabled: boolean;
  light: string;
  dark: string;
}

/**
 * 导航配置
 */
export interface SiteNavigationConfig {
  menus: NavigationMenu[];
}

/**
 * 关于页面配置
 */
export interface SiteAboutPageConfig {
  content: string;
}

// ==================== 其他配置类型 ====================

export interface SiteSeoConfig {
  author: string;
  robots: string;
  ogImage: string;
  keywords: string[];
  description: string;
  twitterCard: string;
  canonicalUrl: string;
  baiduSiteVerification?: string;
  googleSiteVerification?: string;
}

export interface SiteCommentConfig {
  enabled: boolean;
  provider: string;
  maxLength: number;
  rateLimit: {
    enabled: boolean;
    maxCommentsPerDay: number;
    maxCommentsPerHour: number;
  };
  notifyEmail: string;
  blockedWords: string[];
  requireLogin: boolean;
  allowMarkdown: boolean;
  allowAnonymous: boolean;
  allowedDomains: string[];
  requireApproval: boolean;
  notifyOnNewComment: boolean;
}

export interface SiteArticleConfig {
  defaultCover: string;
  imageQuality: number;
  excerptLength: number;
  showWordCount: boolean;
  articlePerPage: number;
  enableLazyLoad: boolean;
  showReadingTime: boolean;
  showLastModified: boolean;
  relatedPostsCount: number;
  showTableOfContents: boolean;
}

export interface SiteFeatureConfig {
  codeTheme: string;
  enableRss: boolean;
  defaultTheme: string;
  enableSearch: boolean;
  enableArchive: boolean;
  enableMathJax: boolean;
  enableMermaid: boolean;
  enableSitemap: boolean;
  enableDarkMode: boolean;
  enableTagCloud: boolean;
  enableCodeHighlight: boolean;
}

// ==================== 顶层配置组 ====================

export interface SiteConfig {
  info: SiteInfoConfig;
  footer: SiteFooterConfig;
  about: SiteAboutPageConfig;
  background: SiteBackgroundConfig;
  navigation: SiteNavigationConfig;
}

export interface PublicConfigGroup {
  site: SiteConfig;
  seo?: SiteSeoConfig;
  comment?: SiteCommentConfig;
  article?: SiteArticleConfig;
  feature?: SiteFeatureConfig;
}
