import Link from "next/link";
import React from "react";
import { GiCat } from "react-icons/gi";
import { SiNextdotjs } from "react-icons/si";
import { FooterMobileDarkToggle } from "@/components/footer/DarkToggle";
import { useSiteFooter, useSiteInfo } from "@/hooks/useConfigApi";
import CommonIcon from "@/components/ui/CommonIcon";

export default function Footer() {
  const footerInfo = useSiteFooter();
  const siteInfo = useSiteInfo();

  return (
    <footer className="w-full backdrop-blur-sm border-t border-solid border-background-color-transparent-1 pb-1 pt-10 select-none cursor-default bg-background-color-transparent-1 px-4">
      <div className="w-full xl:w-xl mx-auto">
        {/* 桌面端：左右布局 */}
        <div className="hidden xl:grid grid-cols-2 items-start">
          {/* 左侧区域 */}
          <div className="flex flex-col gap-4">
            {/* 社交媒体 */}
            <div className="flex items-center gap-5">
              {siteInfo?.social.map((item, index) => (
                <React.Fragment key={index}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-font-color opacity-70 hover:opacity-100 transition-opacity"
                    aria-label={item.name}
                  >
                    <CommonIcon type={item.type} size={24} />
                  </Link>
                </React.Fragment>
              ))}
            </div>

            {/* 快速访问 */}
            <div className="flex justify-start gap-2">
              <p className="text-base font-semibold text-font-color">
                快速访问
              </p>
              <div className="flex flex-wrap gap-2">
                {footerInfo?.quickLinks.map((link, index) => (
                  <React.Fragment key={link.href}>
                    {index > 0 && (
                      <span className="text-font-color opacity-30">|</span>
                    )}
                    <Link
                      href={link.href}
                      className="text-base text-font-color opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </React.Fragment>
                ))}
              </div>
              <span className="text-font-color opacity-30">|</span>
              <Link
                href="/"
                className="text-font-color opacity-70 hover:opacity-100 transition-opacity"
              >
                RSS 订阅
              </Link>
            </div>

            {/* Powered by 和 Copyright */}
            <div className="flex gap-3 text-sm text-font-color opacity-60">
              <div>
                © {footerInfo?.startYear} {siteInfo?.author}. All rights
                reserved.
              </div>

              {/* 备案 */}
              {footerInfo?.moeIcp && (
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-font-color opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2"
                >
                  <GiCat size={18} />
                  <span>{footerInfo?.moeIcp}</span>
                </Link>
              )}
              <div className="flex items-center gap-1.5">
                <span>Powered by</span>
                <SiNextdotjs size={16} />
                <span>Next.js</span>
              </div>
            </div>
          </div>

          {/* 右侧区域 */}
        </div>

        {/* 移动端：上下堆叠 */}
        <div className="flex xl:hidden flex-col gap-3">
          {/* 快速访问 */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-5 mx-auto">
              {footerInfo?.quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-base text-font-color opacity-70 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/"
            className="text-font-color opacity-70 hover:opacity-100 mx-auto transition-opacity"
          >
            RSS 订阅
          </Link>
          {/* 社交媒体 */}
          <div className="flex items-center gap-5 mx-auto">
            {siteInfo?.social.map((item, index) => (
              <React.Fragment key={index}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-font-color opacity-70 hover:opacity-100 transition-opacity"
                  aria-label={item.name}
                >
                  <CommonIcon type={item.type} size={24} />
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* 主题切换器 */}
          <FooterMobileDarkToggle />

          {/* RSS和备案 */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto text-font-color opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2"
          >
            <GiCat size={18} />
            <span>{footerInfo?.moeIcp}</span>
          </Link>

          {/* Powered by 和 Copyright */}
          <div className="flex flex-col gap-2 text-sm text-font-color opacity-60 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <span>Powered by</span>
              <SiNextdotjs size={16} />
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
