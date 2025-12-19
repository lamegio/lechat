export interface ArticleAuthor {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
}

export interface ArticleDetailAuthor extends ArticleAuthor {
  bio: string | null;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ArticleTag {
  id: string;
  name: string;
  slug: string;
}

export interface ArticleListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: string;
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  coverImage: string | null;
  readTime: number | null;
  createdAt: string;
  publishedAt: string | null;
  author: ArticleAuthor;
  categories: ArticleCategory[];
  tags: ArticleTag[];
}

export interface ArticleDetail {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: string;
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  allowComment: boolean;
  coverImage: string | null;
  readTime: number;
  meta: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author: ArticleDetailAuthor;
  categories: ArticleCategory[];
  tags: ArticleTag[];
}

export interface ArticleListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  categoryId?: string;
  tagId?: string;
  isFeatured?: boolean;
}

export interface ArticleDetailParams {
  slug: string;
  password?: string;
}
