"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FriendInfoTabs() {
  const [activeTab, setActiveTab] = useState<"info" | "apply">("info");
  return (
    <div className="mt-16 pt-8">
      {/* 分段控制器 */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-200/30 dark:bg-gray-800/30 rounded-lg p-1 border border-gray-300/40 dark:border-gray-600/40">
          <button
            onClick={() => setActiveTab("info")}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200
                    ${
                      activeTab === "info"
                        ? "bg-theme-color text-white shadow-sm"
                        : "text-font-color-secondary hover:text-font-color"
                    }`}
          >
            本站信息
          </button>
          <button
            onClick={() => setActiveTab("apply")}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200
                    ${
                      activeTab === "apply"
                        ? "bg-theme-color text-white shadow-sm"
                        : "text-font-color-secondary hover:text-font-color"
                    }`}
          >
            申请格式
          </button>
        </div>
      </div>

      {/* Tab 内容 - 统一边框样式 */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-background-color-card rounded-xl p-6 border border-gray-300/40 dark:border-gray-600/40"
      >
        {activeTab === "info" ? (
          <div>
            <h3 className="text-lg font-semibold text-font-color mb-4">
              添加本站友链请使用以下信息
            </h3>
            <div className="space-y-3 text-font-color-secondary">
              <div className="flex items-center">
                <span className="w-20 text-font-color font-medium">名称：</span>
                <span>LeChat</span>
              </div>
              <div className="flex items-center">
                <span className="w-20 text-font-color font-medium">简介：</span>
                <span>Sharing knowledge and experiences</span>
              </div>
              <div className="flex items-center">
                <span className="w-20 text-font-color font-medium">链接：</span>
                <span className="break-all">https://yourdomain.com</span>
              </div>
              <div className="flex items-center">
                <span className="w-20 text-font-color font-medium">头像：</span>
                <span className="break-all">
                  https://yourdomain.com/avatar.png
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-font-color mb-4">
              如何申请友链
            </h3>
            <div className="space-y-4 text-font-color-secondary">
              <div>
                <p className="mb-3">
                  请先添加本站友链，然后按以下格式留言或发送邮件：
                </p>
                <div className="bg-background-color-page rounded-lg p-4 font-mono text-sm">
                  <p>名称：您的网站名称</p>
                  <p>简介：网站简介（20字以内）</p>
                  <p>链接：https://yoursite.com</p>
                  <p>头像：https://yoursite.com/avatar.png</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-font-color mb-2">友链要求：</p>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>内容健康积极，无违法违规信息</li>
                  <li>网站能够正常访问，建议启用 HTTPS</li>
                  <li>定期更新内容（非长期停更状态）</li>
                  <li>优先考虑技术类、设计类、个人博客类网站</li>
                </ul>
              </div>
              <div className="pt-2">
                <p className="text-sm">
                  <span className="font-medium text-font-color">
                    联系方式：
                  </span>
                  在本页面评论留言 或 发送邮件至 admin@yourdomain.com
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
