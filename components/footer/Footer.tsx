import Link from "next/link";
import React from "react";
import { GiCat } from "react-icons/gi";
import { SiNextdotjs } from "react-icons/si";
import { FooterMobileDarkToggle } from "@/components/footer/DarkToggle";
import { useSiteFooter, useSiteInfo } from "@/hooks/useConfigApi";
import SocialIcon from "@/components/ui/SocialIcon";

export default function Footer() {
  const footerInfo = useSiteFooter();
  const siteInfo = useSiteInfo();

  // 模拟统计数据（实际应该从 API 获取）
  const stats = {
    totalArticles: 42,
    totalViews: 12580,
    todayViews: 156,
    totalCategories: 8,
    totalTags: 25,
    runningDays: 41,
  };

  return (
    <footer className="w-full backdrop-blur-sm border-t border-solid border-background-color-transparent-1 pb-6 pt-10 select-none cursor-default bg-background-color-transparent-1 px-4">
      <div className="w-full xl:w-xl mx-auto">
        {/* 桌面端：三列布局 */}
        <div className="hidden xl:grid grid-cols-3 gap-12">
          {/* 左侧：社交和版权 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-font-color mb-2">
              关注我
            </h3>

            {/* 社交媒体 */}
            <div className="flex items-center gap-4">
              {siteInfo?.social
                .filter((item) => item.enabled)
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <Link
                    key={item.type}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-font-color opacity-70 hover:opacity-100 hover:text-theme-color transition-all"
                    aria-label={item.name}
                  >
                    <SocialIcon type={item.type} size={22} />
                  </Link>
                ))}
            </div>

            {/* 版权信息 */}
            <div className="flex flex-col gap-2 text-sm text-font-color opacity-60 mt-4">
              <div>
                © {footerInfo?.startYear} {siteInfo?.author}
              </div>
              <div className="flex items-center gap-1.5">
                <span>Powered by</span>
                <SiNextdotjs size={14} />
                <span>Next.js</span>
              </div>

              {/* 备案 */}
              {footerInfo?.moeIcp && (
                <Link
                  href={footerInfo?.moeIcpIconLink || "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-font-color opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1.5"
                >
                  <GiCat size={16} />
                  <span>{footerInfo?.moeIcp}</span>
                </Link>
              )}
            </div>
          </div>

          {/* 中间：快速访问 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-font-color mb-2">
              快速访问
            </h3>
            <div className="flex flex-col gap-2">
              {footerInfo?.quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-font-color opacity-70 hover:opacity-100 hover:text-theme-color transition-all w-fit"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/rss"
                className="text-sm text-font-color opacity-70 hover:opacity-100 hover:text-theme-color transition-all w-fit"
              >
                RSS 订阅
              </Link>
            </div>
          </div>

          {/* 右侧：网站统计 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold text-font-color mb-2">
              网站统计
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-font-color-secondary text-xs">
                  文章总数
                </span>
                <span className="text-font-color font-medium">
                  {stats.totalArticles}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-font-color-secondary text-xs">
                  总访问量
                </span>
                <span className="text-font-color font-medium">
                  {stats.totalViews.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-font-color-secondary text-xs">
                  今日访问
                </span>
                <span className="text-font-color font-medium">
                  {stats.todayViews}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-font-color-secondary text-xs">
                  运行天数
                </span>
                <span className="text-font-color font-medium">
                  {stats.runningDays}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-font-color-secondary text-xs">
                  分类数
                </span>
                <span className="text-font-color font-medium">
                  {stats.totalCategories}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-font-color-secondary text-xs">
                  标签数
                </span>
                <span className="text-font-color font-medium">
                  {stats.totalTags}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 移动端：优化后的布局 */}
        <div className="flex xl:hidden flex-col gap-5">
          {/* 社交媒体 */}
          <div className="flex items-center justify-center gap-5">
            {siteInfo?.social
              .filter((item) => item.enabled)
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <Link
                  key={item.type}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-font-color opacity-70 hover:opacity-100 transition-opacity"
                  aria-label={item.name}
                >
                  <SocialIcon type={item.type} size={24} />
                </Link>
              ))}
          </div>

          {/* 快速访问 */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerInfo?.quickLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                {index > 0 && (
                  <span className="text-font-color opacity-30">·</span>
                )}
                <Link
                  href={link.href}
                  className="text-sm text-font-color opacity-70 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
            <span className="text-font-color opacity-30">·</span>
            <Link
              href="/rss"
              className="text-sm text-font-color opacity-70 hover:opacity-100 transition-opacity"
            >
              RSS
            </Link>
          </div>

          {/* 网站统计 */}
          <div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-gray-300/20 dark:border-gray-600/20">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-font-color-secondary">文章</span>
              <span className="text-base font-medium text-font-color">
                {stats.totalArticles}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-font-color-secondary">访问</span>
              <span className="text-base font-medium text-font-color">
                {stats.totalViews.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-font-color-secondary">运行</span>
              <span className="text-base font-medium text-font-color">
                {stats.runningDays}天
              </span>
            </div>
          </div>

          {/* 主题切换器 */}
          <FooterMobileDarkToggle />

          {/* 版权和备案 */}
          <div className="flex flex-col gap-2 text-xs text-font-color opacity-60 text-center">
            {footerInfo?.moeIcp && (
              <Link
                href={footerInfo?.moeIcpIconLink || "/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-font-color opacity-70 hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5"
              >
                <GiCat size={16} />
                <span>{footerInfo?.moeIcp}</span>
              </Link>
            )}

            <div className="flex items-center justify-center gap-1.5">
              <span>Powered by</span>
              <SiNextdotjs size={14} />
              <span>Next.js</span>
            </div>

            <div>
              © {footerInfo?.startYear} {siteInfo?.author}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
