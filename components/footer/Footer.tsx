import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaGithub, FaTelegram, FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GiCat } from "react-icons/gi";
import { SiNextdotjs } from "react-icons/si";
import {
  FooterDesktopDarkToggle,
  FooterMobileDarkToggle,
} from "@/components/footer/DarkToggle";

const footerInfo = {
  avatar: "/avatar.png",
  siteName: "Zhizhi",
  author: "Zhixiao",
  quickLinks: [
    { label: "首页", href: "/" },
    { label: "博客", href: "/blog" },
    { label: "关于", href: "/about" },
    { label: "归档", href: "/archive" },
  ],
  social: [
    {
      name: "github",
      url: "https://github.com/yourusername",
      icon: FaGithub,
      label: "GitHub",
    },
    {
      name: "email",
      url: "mailto:your@email.com",
      icon: MdEmail,
      label: "Email",
    },
    {
      name: "telegram",
      url: "https://t.me/yourusername",
      icon: FaTelegram,
      label: "Telegram",
    },
  ],
  rss: "/feed.xml",
  icp: "萌ICP备20231024号",
  icpLink: "https://icp.gov.moe/?keyword=20231024",
  year: new Date().getFullYear(),
};

export default function Footer() {
  return (
    <footer className="w-full backdrop-blur-sm border-t border-solid border-background-color-transparent-1 pb-1 pt-10 select-none cursor-default bg-background-color-transparent-1 px-4">
      <div className="w-full xl:w-xl mx-auto">
        {/* 桌面端：左右布局 */}
        <div className="hidden xl:grid grid-cols-2 items-start">
          {/* 左侧区域 */}
          <div className="flex flex-col gap-4">
            {/* 社交媒体 */}
            <div className="flex items-center gap-5">
              {footerInfo.social.map((item, index) => (
                <React.Fragment key={item.name}>
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-font-color opacity-70 hover:opacity-100 transition-opacity"
                    aria-label={item.label}
                  >
                    <item.icon size={24} />
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
                {footerInfo.quickLinks.map((link, index) => (
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
                href={footerInfo.rss}
                className="text-font-color opacity-70 hover:opacity-100 transition-opacity"
              >
                RSS 订阅
              </Link>
            </div>

            {/* Powered by 和 Copyright */}
            <div className="flex gap-3 text-sm text-font-color opacity-60">
              <div>
                © {footerInfo.year} {footerInfo.author}. All rights reserved.
              </div>

              {/* 备案 */}
              <Link
                href={footerInfo.icpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-font-color opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2"
              >
                <GiCat size={18} />
                <span>{footerInfo.icp}</span>
              </Link>
              <div className="flex items-center gap-1.5">
                <span>Powered by</span>
                <SiNextdotjs size={16} />
                <span>Next.js</span>
              </div>
            </div>
          </div>

          {/* 右侧区域 */}
          <div className="flex flex-col justify-between items-end h-full">
            {/* 右上角：头像和站点名 */}
            <div className="flex items-center gap-3">
              <Image
                src={footerInfo.avatar}
                alt={footerInfo.siteName}
                width={32}
                height={32}
                className="rounded-md object-cover"
              />
              <span className="text-xl font-medium text-font-color">
                {footerInfo.siteName}
              </span>
            </div>

            {/* 右下角：主题切换器 */}
            <FooterDesktopDarkToggle />
          </div>
        </div>

        {/* 移动端：上下堆叠 */}
        <div className="flex xl:hidden flex-col gap-8">
          {/* 头像和站点名 */}
          <div className="flex items-center gap-3">
            <Image
              src={footerInfo.avatar}
              alt={footerInfo.siteName}
              width={56}
              height={56}
              className="rounded-xl object-cover"
            />
            <span className="text-xl font-medium text-font-color">
              {footerInfo.siteName}
            </span>
          </div>

          {/* 快速访问 */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold text-font-color">
              快速访问
            </h3>
            <div className="flex flex-wrap gap-5">
              {footerInfo.quickLinks.map((link) => (
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

          {/* 社交媒体 */}
          <div className="flex items-center gap-5">
            {footerInfo.social.map((item, index) => (
              <React.Fragment key={item.name}>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-font-color opacity-70 hover:opacity-100 transition-opacity"
                  aria-label={item.label}
                >
                  <item.icon size={24} />
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* RSS和备案 */}
          <div className="flex flex-col gap-3 text-base">
            <Link
              href={footerInfo.rss}
              className="text-font-color opacity-70 hover:opacity-100 transition-opacity"
            >
              RSS 订阅
            </Link>
            <Link
              href={footerInfo.icpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-font-color opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2"
            >
              <GiCat size={18} />
              <span>{footerInfo.icp}</span>
            </Link>
          </div>

          {/* 主题切换器 */}
          <FooterMobileDarkToggle />

          {/* Powered by 和 Copyright */}
          <div className="flex flex-col gap-2 text-sm text-font-color opacity-60 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <span>Powered by</span>
              <SiNextdotjs size={16} />
              <span>Next.js</span>
            </div>
            <div>
              © {footerInfo.year} {footerInfo.author}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
