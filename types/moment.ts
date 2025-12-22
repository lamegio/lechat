export interface MomentItem {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  images?: string[];
  location?: string;
  device?: string;
  likeCount: number;
  isPinned: boolean;
  status: "public" | "private";
  createdAt: string;
}

export interface MomentListParams {
  page?: number;
  pageSize?: number;
}
