'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  author: string;
  email: string;
  website?: string;
  avatar?: string;
  content: string;
  date: string;
  location?: string;
  replyTo?: string; // 回复给谁
  parentId?: string; // 父评论ID
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    website: '',
    content: '',
  });
  const [replyingTo, setReplyingTo] = useState<{ id: string; author: string } | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '🤔', '🤨', '😐', '😑', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '🥴', '😠', '😡', '🤬', '👍', '👎', '👏', '🙏', '💪', '❤️', '🔥', '✨', '🎉', '🎊'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      email: newComment.email,
      website: newComment.website,
      content: newComment.content,
      date: new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      location: '广东深圳', // 模拟IP定位
      replyTo: replyingTo?.author,
      parentId: replyingTo?.id,
    };

    setComments(prev => [comment, ...prev]);
    setNewComment({ author: '', email: '', website: '', content: '' });
    setReplyingTo(null);
  };

  const insertEmoji = (emoji: string) => {
    setNewComment(prev => ({ ...prev, content: prev.content + emoji }));
    setShowEmojiPicker(false);
  };

  // 组织评论为树形结构
  const organizedComments = comments.filter(c => !c.parentId);
  const getReplies = (commentId: string) => comments.filter(c => c.parentId === commentId);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 评论输入框 */}
      <div className="bg-background-color-card rounded-lg p-4 border border-gray-300/30 dark:border-gray-600/30">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 回复提示 */}
          {replyingTo && (
            <div className="flex items-center gap-2 text-sm text-font-color-secondary bg-theme-color/5 px-3 py-2 rounded">
              <span>回复给 <span className="text-theme-color font-medium">@{replyingTo.author}</span></span>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="ml-auto text-font-color-secondary hover:text-font-color"
              >
                ✕
              </button>
            </div>
          )}

          {/* 输入框 */}
          <div className="relative">
            <textarea
              placeholder="写下你的评论..."
              required
              rows={3}
              value={newComment.content}
              onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2 bg-background-color-page rounded border border-gray-300/30 dark:border-gray-600/30 text-font-color text-sm placeholder:text-font-color-secondary/50 focus:outline-none focus:border-theme-color transition-colors resize-none"
            />

            {/* 表情按钮 */}
            <div className="absolute right-2 bottom-2">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-lg hover:scale-110 transition-transform"
              >
                😀
              </button>
            </div>

            {/* 表情选择器 */}
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 bottom-full mb-2 bg-background-color-card border border-gray-300/30 dark:border-gray-600/30 rounded-lg p-2 shadow-lg z-10 w-64 max-h-40 overflow-y-auto"
                >
                  <div className="grid grid-cols-8 gap-1">
                    {emojis.map((emoji, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => insertEmoji(emoji)}
                        className="text-xl hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded p-1 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 信息输入 */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="昵称 *"
              required
              value={newComment.author}
              onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
              className="flex-1 px-3 py-1.5 bg-background-color-page rounded border border-gray-300/30 dark:border-gray-600/30 text-font-color text-sm placeholder:text-font-color-secondary/50 focus:outline-none focus:border-theme-color transition-colors"
            />
            <input
              type="email"
              placeholder="邮箱 *"
              required
              value={newComment.email}
              onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
              className="flex-1 px-3 py-1.5 bg-background-color-page rounded border border-gray-300/30 dark:border-gray-600/30 text-font-color text-sm placeholder:text-font-color-secondary/50 focus:outline-none focus:border-theme-color transition-colors"
            />
            <input
              type="url"
              placeholder="网址（可选）"
              value={newComment.website}
              onChange={(e) => setNewComment(prev => ({ ...prev, website: e.target.value }))}
              className="flex-1 px-3 py-1.5 bg-background-color-page rounded border border-gray-300/30 dark:border-gray-600/30 text-font-color text-sm placeholder:text-font-color-secondary/50 focus:outline-none focus:border-theme-color transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-theme-color text-white text-sm rounded hover:bg-theme-color/90 transition-colors"
            >
              发送
            </button>
          </div>

          {/* 提示信息 */}
          <div className="flex items-center justify-between text-xs text-font-color-secondary/60">
            <span>支持 Markdown 语法</span>
            <label className="flex items-center gap-1 cursor-pointer hover:text-font-color-secondary">
              <input type="checkbox" className="w-3 h-3" />
              <span>有回复时邮件通知我</span>
            </label>
          </div>
        </form>
      </div>

      {/* 评论列表 */}
      <div className="mt-6 space-y-4">
        <div className="text-sm font-medium text-font-color-secondary">
          {comments.length} 条评论
        </div>

        <AnimatePresence>
          {organizedComments.map((comment, index) => {
            const replies = getReplies(comment.id);

            return (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-background-color-card rounded-lg p-4 border border-gray-300/30 dark:border-gray-600/30"
              >
                {/* 评论主体 */}
                <div className="flex gap-3">
                  {/* 头像 */}
                  <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-theme-color to-theme-color/60 flex items-center justify-center text-white text-sm font-semibold">
                    {comment.author[0].toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* 用户信息栏 */}
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-semibold text-font-color text-sm">
                        {comment.website ? (
                          <a href={comment.website} target="_blank" rel="noopener noreferrer" className="hover:text-theme-color transition-colors">
                            {comment.author}
                          </a>
                        ) : comment.author}
                      </span>
                      {comment.replyTo && (
                        <>
                          <span className="text-font-color-secondary text-xs">回复</span>
                          <span className="text-theme-color text-xs font-medium">@{comment.replyTo}</span>
                        </>
                      )}
                      <span className="text-xs text-font-color-secondary/60">{comment.date}</span>
                      {comment.location && (
                        <span className="text-xs text-font-color-secondary/50">· {comment.location}</span>
                      )}
                    </div>

                    {/* 评论内容 */}
                    <div className="text-sm text-font-color leading-relaxed mb-2">
                      {comment.content}
                    </div>

                    {/* 操作按钮 */}
                    <button
                      onClick={() => setReplyingTo({ id: comment.id, author: comment.author })}
                      className="text-xs text-font-color-secondary/70 hover:text-theme-color transition-colors"
                    >
                      回复
                    </button>
                  </div>
                </div>

                {/* 二级回复 */}
                {replies.length > 0 && (
                  <div className="mt-3 ml-12 space-y-3">
                    {replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-theme-color/80 to-theme-color/40 flex items-center justify-center text-white text-xs font-semibold">
                          {reply.author[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold text-font-color text-sm">
                              {reply.website ? (
                                <a href={reply.website} target="_blank" rel="noopener noreferrer" className="hover:text-theme-color transition-colors">
                                  {reply.author}
                                </a>
                              ) : reply.author}
                            </span>
                            {reply.replyTo && (
                              <>
                                <span className="text-font-color-secondary text-xs">回复</span>
                                <span className="text-theme-color text-xs font-medium">@{reply.replyTo}</span>
                              </>
                            )}
                            <span className="text-xs text-font-color-secondary/60">{reply.date}</span>
                            {reply.location && (
                              <span className="text-xs text-font-color-secondary/50">· {reply.location}</span>
                            )}
                          </div>
                          <div className="text-sm text-font-color leading-relaxed mb-1.5">
                            {reply.content}
                          </div>
                          <button
                            onClick={() => setReplyingTo({ id: comment.id, author: reply.author })}
                            className="text-xs text-font-color-secondary/70 hover:text-theme-color transition-colors"
                          >
                            回复
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {comments.length === 0 && (
          <div className="text-center py-8 text-font-color-secondary text-sm">
            暂无评论，快来抢沙发吧~
          </div>
        )}
      </div>
    </div>
  );
}