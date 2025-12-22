import BaseContainer from "@/components/container/BaseContainer";
import PageContentContainer from "@/components/container/PageContentContainer";
import { fetcher } from "@/lib/fetcher";
import { API_KEYS } from "@/lib/api-keys";
import type { PaginatedData } from "@/lib/fetcher";
import type { MomentItem } from "@/types/moment";
import MomentHeader from "@/components/features/moment/MomentHeader";
import MomentPageClient from "@/components/features/moment/MomentPageClient";

const moments: PaginatedData<MomentItem> = {
  list: [
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      authorId: "author-001",
      authorName: "知晓",
      authorAvatar: "/avatar.png",
      content:
        "今天完成了博客的动态页面设计，感觉还不错！使用了 Next.js 14 的最新特性，SSR 和 Client Components 的配合非常流畅。",
      images: ["/bg-light.png", "/bg-dark.webp", "/bg-light.png"],
      location: "中国 北京 朝阳区",
      device: "MacBook Pro",
      likeCount: 42,
      isPinned: true,
      status: "public",
      createdAt: "2024-12-22T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      authorId: "author-001",
      authorName: "知晓",
      authorAvatar: "/avatar.png",
      content: "分享一些最近拍的照片📸\n\n天气很好，心情也很好！",
      images: ["/bg-light.png", "/bg-light.png"],
      location: "中国 上海 浦东新区",
      device: "iPhone 15 Pro Max",
      likeCount: 128,
      isPinned: false,
      status: "public",
      createdAt: "2024-12-21T15:20:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      authorId: "author-001",
      authorName: "知晓",
      authorAvatar: "/avatar.png",
      content: "这是一条私密动态，只有自己可以看到。记录一些私人的想法和感受。",
      location: "中国 广东 深圳市",
      device: "iPad Pro",
      likeCount: 0,
      isPinned: false,
      status: "private",
      createdAt: "2024-12-20T09:15:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      authorId: "author-001",
      authorName: "知晓",
      authorAvatar: "/avatar.png",
      content:
        "学习 Next.js 的一些心得：\n\n• App Router 比 Pages Router 更符合直觉\n• Server Components 很强大\n• 性能优化要关注首屏加载\n• TypeScript 类型安全真的很重要",
      location: "中国 浙江 杭州市",
      device: "Windows 11",
      likeCount: 87,
      isPinned: false,
      status: "public",
      createdAt: "2024-12-19T20:45:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440005",
      authorId: "author-001",
      authorName: "知晓",
      authorAvatar: "/avatar.png",
      content: "Hello World! 🎉 第一条动态，开启记录生活的新篇章。",
      images: ["/bg-light.png"],
      location: "中国 四川 成都市",
      device: "iPhone 15",
      likeCount: 256,
      isPinned: false,
      status: "public",
      createdAt: "2024-12-18T14:00:00Z",
    },
  ],
  meta: {
    total: 5,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  },
};

export default async function MomentPage() {
  const page = 1;
  const pageSize = 20;

  // const moments = await fetcher<PaginatedData<MomentItem>>(
  //   API_KEYS.moments.list({ page, pageSize }),
  // );

  return (
    <BaseContainer pageTitle="动态" pageDescription="记录生活的点点滴滴">
      <PageContentContainer>
        {/*<MomentHeader />*/}
        <MomentPageClient initialData={moments} />
      </PageContentContainer>
    </BaseContainer>
  );
}
