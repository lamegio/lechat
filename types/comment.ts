export enum CommentType {
  ARTICLE = 0, // 文章评论
  ABOUT = 1, // about 页面
  CONTACT = 2, // contact 页面
  GUESTBOOK = 3, // 留言板
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

// 评论项
export interface CommentItem {
  id: string;
  content: string;
  device?: string;
  avatar: string;
  isLiked?: boolean;
  isAdmin?: boolean;
  createdAt: string;
  likeCount: number;
  displayName: string;
  replyToName?: string; // @谁
  loginProvider?: string;
  location?: string;
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

// 提交评论 API 请求体
export interface CreateCommentRequest {
  content: string;
  type: CommentType;
  articleId?: string;
  parentId?: string;
  displayName: string;
  email: string;
  url?: string;
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
