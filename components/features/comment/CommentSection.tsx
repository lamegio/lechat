"use client";
import { BsEmojiSmile, BsEye, BsEyeSlash, BsMarkdown } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdDevices } from "react-icons/md";

import { useState } from "react";
import GoogleIcon from "@/components/ui/GoogleIcon";

export function CommentSection() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* 评论输入区 */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Meta信息区域 */}
        <div className="px-4 pt-3 pb-2 grid grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="昵称 *"
            className="px-0 py-0.5 text-[15px] border-0 focus:outline-none bg-transparent placeholder:text-gray-400"
          />
          <input
            type="email"
            placeholder="邮箱 *"
            className="px-0 py-0.5 text-[15px] border-0 focus:outline-none bg-transparent placeholder:text-gray-400"
          />
          <input
            type="url"
            placeholder="网址（可选）"
            className="px-0 py-0.5 text-[15px] border-0 focus:outline-none bg-transparent placeholder:text-gray-400"
          />
        </div>

        {/* 虚线分割 */}
        <div className="border-t-2 border-dashed border-gray-200"></div>

        {/* 内容区域 */}
        <div className="px-4 py-3">
          <textarea
            placeholder="写下你的评论..."
            rows={4}
            className="w-full px-0 py-0 text-[15px] border-0 focus:outline-none resize-none bg-transparent placeholder:text-gray-400"
          />
        </div>

        {/* 预览区域 */}
        {showPreview && (
          <>
            <div className="border-t-2 border-dashed border-gray-200"></div>
            <div className="px-4 py-3 bg-gray-50/50">
              <div className="text-xs text-gray-400 mb-2">预览</div>
              <div className="text-[15px] text-gray-700">
                预览内容将显示在这里...
              </div>
            </div>
          </>
        )}

        {/* 工具栏 */}
        <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title="支持 Markdown"
            >
              <BsMarkdown size={18} />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title="插入表情"
            >
              <BsEmojiSmile size={18} />
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title={showPreview ? "隐藏预览" : "显示预览"}
            >
              {showPreview ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:border-gray-400 transition-colors">
              登录
            </button>
            <button className="px-5 py-1.5 text-sm bg-[var(--theme-color,#6366f1)] text-white hover:opacity-90 rounded transition-opacity">
              提交
            </button>
          </div>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-5">
        <h3 className="text-base font-medium text-gray-900">2 条评论</h3>

        {/* 评论1 - 管理员 GitHub登录 */}
        <div className="flex gap-4">
          <div className="relative w-12 h-12 flex-shrink-0">
            <img
              src="/avatar.png"
              alt="Avatar"
              className="w-full h-full rounded-full"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
              <FaGithub size={10} className="text-gray-600" />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15px] font-medium text-gray-900">
                  小橘猫
                </span>
                <span className="px-2 py-0.5 text-xs bg-red-50 text-red-600 rounded">
                  管理员
                </span>
                <span className="text-xs text-gray-400">2025-12-20 15:15</span>
              </div>
              <button className="text-xs text-gray-500 hover:text-[var(--theme-color,#6366f1)] transition-colors">
                回复
              </button>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
              <span className="flex items-center gap-1">
                <HiLocationMarker size={12} />
                中国 · 广东
              </span>
              <span className="flex items-center gap-1">
                <MdDevices size={12} />
                Windows · Chrome
              </span>
            </div>
            <div className="text-[15px] text-gray-700 leading-relaxed">
              欢迎大家在这里留言交流！😊 有任何问题都可以问我哦～
            </div>
          </div>
        </div>

        {/* 评论2 - 普通用户回复 Google登录 */}
        <div className="flex gap-4">
          <div className="relative w-12 h-12 flex-shrink-0">
            <img
              src="/avatar.png"
              alt="Avatar"
              className="w-full h-full rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-gray-200/50">
              <FaGithub size={9} className="text-gray-700" />
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15px] font-medium text-gray-900">
                  访客A
                </span>
                <span className="text-xs text-gray-400">2025-12-21 10:32</span>
              </div>
              <button className="text-xs text-gray-500 hover:text-[var(--theme-color,#6366f1)] transition-colors">
                回复
              </button>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
              <span className="flex items-center gap-1">
                <HiLocationMarker size={12} />
                新加坡
              </span>
              <span className="flex items-center gap-1">
                <MdDevices size={12} />
                MacOS · Safari
              </span>
            </div>
            <div className="mb-1.5">
              <span
                className="text-xs font-medium"
                style={{ color: "var(--theme-color, #6366f1)" }}
              >
                @小橘猫
              </span>
            </div>
            <div className="text-[15px] text-gray-700 leading-relaxed mb-4">
              感谢分享这个主题，界面设计真的很漂亮！想问一下这个评论系统支持{" "}
              <strong>Markdown</strong> 语法吗？
            </div>

            {/* 二级回复 */}
            <div className="ml-8 space-y-4">
              <div className="flex gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <img
                    src="/avatar.png"
                    alt="Avatar"
                    className="w-full h-full rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-gray-200/50">
                    <GoogleIcon />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[15px] font-medium text-gray-900">
                        路人B
                      </span>
                      <span className="text-xs text-gray-400">
                        2025-12-21 14:20
                      </span>
                    </div>
                    <button className="text-xs text-gray-500 hover:text-[var(--theme-color,#6366f1)] transition-colors">
                      回复
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <HiLocationMarker size={12} />
                      日本 · 东京
                    </span>
                    <span className="flex items-center gap-1">
                      <MdDevices size={12} />
                      Android · Chrome
                    </span>
                  </div>
                  <div className="mb-1.5">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--theme-color, #6366f1)" }}
                    >
                      @访客A
                    </span>
                  </div>
                  <div className="text-[15px] text-gray-700 leading-relaxed">
                    当然支持啦！你可以使用 **粗体**、*斜体*、`代码` 等语法～
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
