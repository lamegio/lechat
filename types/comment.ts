export enum CommentType {
  ARTICLE = 0, // 文章评论
  ABOUT = 1, // about 页面
  CONTACT = 2, // contact 页面
  GUESTBOOK = 3, // 留言板
  // ... 可以继续扩展其他页面
}

// 评论状态
export enum CommentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

// 登录提供商
export enum LoginProvider {
  GITHUB = "github",
  GOOGLE = "google",
}

// 用户角色
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

// 作者信息
export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  loginProvider?: LoginProvider;
}

// 评论项
export interface CommentItem {
  id: string;
  content: string;
  status: CommentStatus;
  type: CommentType;
  createdAt: string;
  likeCount: number;
  isLiked?: boolean;

  // 作者信息（登录用户）
  author?: Author;
  authorId?: string;

  // 访客信息（匿名用户）
  guestName?: string;
  guestEmail?: string;

  // 关联信息
  articleId?: string;
  parentId?: string;
  replyToName?: string; // @谁

  // 扩展信息
  device?: string;
  location?: string;

  // 回复列表
  replies?: CommentItem[];
}

// 评论列表参数
export interface CommentListParams {
  type: CommentType;
  articleId?: string; // type=0 时必填
  page?: number;
  pageSize?: number;
  status?: CommentStatus;
}

// 提交评论表单数据（匿名用户）
export interface GuestCommentFormData {
  content: string;
  guestName: string;
  guestEmail: string;
  guestWebsite?: string;
}

// 提交评论表单数据（登录用户）
export interface AuthCommentFormData {
  content: string;
}

// 提交评论 API 请求体
export interface CreateCommentRequest {
  content: string;
  type: CommentType;
  articleId?: string;
  parentId?: string;
  guestName?: string;
  guestEmail?: string;
  userAgent?: string;
}

// 评论列表响应
export interface CommentListResponse {
  items: CommentItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// 点赞响应
export interface LikeCommentResponse {
  likeCount: number;
  isLiked: boolean;
}
